import { HomePage } from './pages/home-page.jsx'
import { BoardApp } from './pages/board-app.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [{
        path: '/',
        component: HomePage,
        label: 'Home 🏠',
    },
    {
        path: '/board',
        component: CarApp,
        label: 'Boards'
    },
    {
        path: '/board/:boardId',
        component: BoardApp,
        label: 'Boards'
    }
]

export default routes;