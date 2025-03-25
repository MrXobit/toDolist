import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  id: null,
  email: "",
  role: null,
  error: null,
  isLoading: false,
  isAuth: false,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password
      });
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/registration', {
        email,
        password
      });
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);



export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = (localStorage.getItem('token'))
      const response = await axios.get('http://localhost:5000/api/user/auth', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);




const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      return initialState; 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.role = action.payload.role;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isAuth = true;
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.role = action.payload.role;
      })

      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true
      })

      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isAuth = true;
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.isLoading = false
      })

      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false
      })
      


  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
