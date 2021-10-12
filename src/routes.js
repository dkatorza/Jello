import {HomePage} from '../src/pages/HomePage.jsx';
import { BoardList } from './pages/BoardList.jsx';
import { Board } from './pages/Board.jsx';
import { LoginSignup } from './pages/LoginSignUp.jsx';
const routes = [
    {
        path:'/',
        component: HomePage,
        label: 'Home | ',
    },
    {
        path:'/boardlist',
        component: BoardList,
        label: 'Boards | ',
    },
    {
        path:'/board/:boardId',
        component: Board,
        label: 'Board',
    },
    {
        path:'/signup',
        component: LoginSignup,
        label: 'Singup',
    },
    {
        path:'/login',
        component: LoginSignup,
        label: 'Login',
    },
]

export default routes;