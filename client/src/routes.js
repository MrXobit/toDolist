import AddTask from "./components/addTask/AddTask";
import Login from "./components/login/Login";
import MainPage from "./components/mainPage/MainPage";
import Signup from "./components/signup/Signup";
import TasksEdit from "./components/tasksEdit/TasksEdit";

export const authRoutes = [
    {
        path: '/',
        element: <MainPage/>
    },
    {
        path: '*',
        element: <MainPage/>
    },
    {
        path: '/add-task',
        element: <AddTask/>
    },
    {
        path: '/task/:id',
        element: <TasksEdit/>
    }
];

export const publicRoutes = [
    {
        path: '/login',
        element: <Login/>
    },

    {
        path: '/sign-up',
        element: <Signup/>
    },
    {
        path: '*',
        element: <Login/>
    },
];
