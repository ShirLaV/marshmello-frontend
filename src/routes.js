import { HomePage } from './pages/home-page.jsx'
import { BoardSelect } from './pages/boards-select.jsx'
import { BoardDetails } from './pages/board-details.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [{
        path: '/board/:boardId',
        component: BoardDetails,
        label: 'Board'
    },
    {
        path: '/board',
        component: BoardSelect,
        label: 'Boards'
    },
    {
        path: '/',
        component: HomePage,
        label: 'Home',
    }

]

export default routes;