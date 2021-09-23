import { boardService } from "../services/board.service.js";
// import { userService } from "../services/user.service.js";
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';
export function loadBoards(filterBy) {
    return async(dispatch) => {
        try {
            const boards = await boardService.query(filterBy)
            dispatch({
                type: 'SET_BOARDS',
                boards
            })
        } catch (err) {
            // showErrorMsg('Cannot load boards')
            console.log('Cannot load boards', err)
        }
    }
}

export function loadBoard(boardId) {
    return async(dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            dispatch({
                type: 'SET_CURR_BOARD',
                board
            })
        } catch (err) {
            // showErrorMsg('Cannot load boards')
            console.log('Cannot load board', err)
        }
    }
}

export function onRemoveBoard(boardId) {
    return async (dispatch) => {
        try {
            await boardService.remove(boardId)
            console.log('Deleted Succesfully!');
            dispatch({
                type: 'REMOVE_BOARD',
                boardId
            })
            // showSuccessMsg('Board removed')
        } catch (err) {
            // showErrorMsg('Cannot remove board')
            console.log('Cannot remove board', err)
        }
    }
}
export function onAddBoard(board) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(board)
            console.log('Added Board', savedBoard);
            dispatch({
                type: 'ADD_BOARD',
                board: savedBoard
            })
            // showSuccessMsg('Board added')
        } catch (err) {
            // showErrorMsg('Cannot add board')
            console.log('Cannot add board', err)
        }
    }
}
export function onUpdateBoard(action, board) {
    return async(dispatch) => {

        const boardToSave = _getUpdatedBoard(action, board)
        dispatch({
            type: 'UPDATE_BOARD',
            board: boardToSave
        })

        console.log('Updated Board:', boardToSave);
        try {
            await boardService.save(boardToSave)
                // showSuccessMsg('Board updated')
        } catch (err) {
            // showErrorMsg('Cannot update board')
            console.log('Cannot save board', err)
        }
    }
}

function _getUpdatedBoard(action, board) {
    const boardToSave = {...board }
    switch (action.type) {
        case 'ADD_GROUP':
            boardToSave.groups = [...boardToSave.groups, action.group]
            break
    }
    return boardToSave;
}
// export function onEditBoard(boardToSave) {

//     return async(dispatch) => {

//         try {
//             const savedBoard = await boardService.save(boardToSave)
//             console.log('Updated Board:', savedBoard);
//             dispatch({
//                     type: 'UPDATE_BOARD',
//                     board: savedBoard
//                 })
//                 // showSuccessMsg('Board updated')
//         } catch (err) {
//             // showErrorMsg('Cannot update board')
//             console.log('Cannot save board', err)
//         }
//     }
// }
//
// export function onUpdateFilter(filterBy) {
//     return (dispatch) => {
//         const action = { type: 'UPDATE_FILTER', filterBy }
//         dispatch(action)
//     }
// }
