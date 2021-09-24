import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'
// const listeners = []

export const boardService = {
    query,
    getById,
    save,
    remove,
}
window.cs = boardService;


function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

function remove(boardId) {
    // return new Promise((resolve, reject) => {
    //     setTimeout(reject, 2000)
    // })
    // return Promise.reject('Not now!');
    return storageService.remove(STORAGE_KEY, boardId)
}

function save(board) {
    if (board._id) {
        return storageService.put(STORAGE_KEY, board)
    } else {
        return storageService.post(STORAGE_KEY, board)
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