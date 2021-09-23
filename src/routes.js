import { HomePage } from './pages/home-page.jsx'
import { BoardApp } from './pages/board-app.jsx'
import { BoardDetails } from './pages/board-details.jsx'
// import { OverlayScreen } from './cmps/overlay-screen.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [{
        path: '/',
        component: HomePage,
        label: 'Home 🏠',
    },
    {
        path: '/board',
        component: BoardApp,
        label: 'Boards'
    },
    {
        path: '/board/:boardId',
        component: BoardDetails,
        label: 'Board'
    }
]

export default routes;