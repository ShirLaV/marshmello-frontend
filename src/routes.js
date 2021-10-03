import { HomePage } from './pages/home-page.jsx'
import { BoardSelect } from './pages/boards-select.jsx'
import { BoardDetails } from './pages/board-details.jsx'
import { LoginSignup } from './pages/login-signup.jsx';

// Routes accesible from the main navigation (in AppHeader)
const routes = [{
        path: '/board/:boardId',
        component: BoardDetails,
    },
    {
        path: '/board',
        component: BoardSelect,
    },
    {
        path: '/login',
        component: LoginSignup
    },
    {
        path: '/signup',
        component: LoginSignup 
    },
    {
        path: '/',
        component: HomePage,
    }
]

export default routes;