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
    dashboardQuery,
    getArchivedCards
}
window.cs = boardService;


async function query(filterByUser) {
    // return storageService.query(STORAGE_KEY)
    try {
        const boards = await httpService.get('board', filterByUser)
        return boards
    } catch (err) {
        console.log('Front: Error loading boards', err)
    }
}

async function getById(boardId, filterBy) {
    // return storageService.get(STORAGE_KEY, boardId)
    try {
        if (typeof filterBy === 'object') {
            filterBy = (new URLSearchParams(filterBy)).toString()
        }
        const board = await httpService.get(`board/${boardId}`, filterBy)
        return board
    } catch (err) {
        console.log(`Front: Error loading board with ID: ${boardId}`, err)
    }
}

async function dashboardQuery(boardId) {
    // const chartsData = await storageService.dashboardQuery(STORAGE_KEY, boardId)
    // return chartsData
    try {
        const chartsData = await httpService.get(`board/dashboard/${boardId}`)
        return chartsData
    } catch (err) {
        console.log('Front: Error loading chartsData', err)
    }
}

async function getArchivedCards(boardId) {
    try {
        const archivedCards = await httpService.get(`board/${boardId}/closed`)
        console.log('archivedChards:', archivedCards)
        return archivedCards
    } catch (err) {
        console.log('Front: Error loading archivedCards', err)
    }
}


async function remove(boardId) {
    // return storageService.remove(STORAGE_KEY, boardId)
        try {
            return httpService.delete(`board/${boardId}`)
        } catch (err) {
            console.log(`Front: Error deleting board with ID: ${boardId}`);
        }
}

async function save(board, activity = null) {
    if (board._id) {
        if (activity) {
            const newActivity = {
                    txt: activity.txt,
                    id: utilService.makeId(),
                    byMember: userService.getMiniUser(),
                    card: (activity.card) ? { id: activity.card.id, title: activity.card.title } : {},
                    groupId: (activity.groupId) ? activity.groupId : null
                }
                // console.log('Activity from service: ', newActivity)
                // board.activities.unshift(newActivity)
                // console.log('Board activities from service: ', board.activities)
            return httpService.put(`board/${board._id}`, { board: board, activity: newActivity })
        } else {
            // return storageService.put(STORAGE_KEY, board)
            return httpService.put(`board/${board._id}`, { board: board, activity: null })
        }
    } else {
        const boardToSave = {
                title: board.title,
                style: board.style,
                createdBy: userService.getMiniUser(),
                members: [userService.getMiniUser()],
            }
            // return storageService.post(STORAGE_KEY, boardToSave)
        const addedBoard = await httpService.post(`board`, boardToSave)
        return addedBoard
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