import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service'

const STORAGE_KEY = 'board'
// const listeners = []

export const boardService = {
    query,
    getById,
    save,
    remove,
}
window.cs = boardService;


async function query() {
    return storageService.query(STORAGE_KEY)
    // try {
    //     const boards = await httpService.get('board')
    //     return boards
    // } catch (err) {
    //     console.log('Front: Error loading boards', err)
    // }
}

async function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
    // try {
    //     const board = await httpService.get(`board/${boardId}`)
    //     return board
    // } catch (err) {
    //     console.log(`Front: Error loading board with ID: ${boardId}`, err)

    // }
}

async function remove(boardId) {
    return storageService.remove(STORAGE_KEY, boardId)
    // try {
    //     return httpService.delete(`board/${boardId}`)
    // } catch (err) {
    //     console.log(`Front: Error deleting board with ID: ${boardId}`);
    // }
}

async function save(board, activity = null) {
    if (board._id) {
        if (activity) {

            const newActivity = {
                id: utilService.makeId(),
                txt: activity.txt,
                byMember: userService.getMiniUser(),
                createdAt: Date.now(),
                card: (activity.card) ? activity.card : ''
            }
            // console.log('Activity from service: ', newActivity)
            board.activities.push(newActivity)
            // console.log('Board activities from service: ', board.activities)
        }

        return storageService.put(STORAGE_KEY, board)
        // return httpService.put(`board/${board._id}`, board)
    } else {
        const boardToSave = {
            title: board.title,
            createdAt: Date.now(),
            style: (board.style) ? board.style : {},
            isStarred: false,
            createdBy: userService.getMiniUser(),
            groups: [],
            labels: [{
                id: "l101",
                title: "",
                color: "#61bd4f"
            },
            {
                id: "l102",
                title: "",
                color: "#FF9F1A"
            },
            {
                id: "l103",
                title: "",
                color: "#eb5a46"
            },
            {
                id: "l104",
                title: "",
                color: "#C377E0"
            },
            {
                id: "l105",
                title: "",
                color: "#344563"
            },
            {
                id: "l106",
                title: "",
                color: "#FF78CB"
            }
            ],
            members: [userService.getMiniUser()],
            activities: []
        }

        return storageService.post(STORAGE_KEY, boardToSave)
        // const addedBoard = await httpService.post(`board`, boardToSave)
        // return addedBoard
    }
}

// function subscribe(listener) {
//     listeners.push(listener)
// }

// function _notifySubscribersBoardsChanged(boards) {
//     console.log('Notifying Listeners');
//     listeners.forEach(listener => listener(boards))
// }

// window.addEventListener('storage', () => {
//     console.log('Storage Changed from another Browser!');
//     query()
//         .then(boards => {
//             _notifySubscribersCarsChanged(boards)
//         }) 
// })