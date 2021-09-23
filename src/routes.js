import { HomePage } from './pages/home-page.jsx'
import { BoardSelect } from './pages/boards-select.jsx'
import { BoardDetails } from './pages/board-details.jsx'
// import { OverlayScreen } from './cmps/overlay-screen.jsx'
// import { CardEdit } from './cmps/card-edit.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [{
        path: '/',
        component: HomePage,
        label: 'Home',
    },
    {
        path: '/board',
        component: BoardSelect,
        label: 'Boards'
    },
    {
        path: '/board/:boardId',
        component: BoardDetails,
        label: 'Board'
    }
]

export default routes;