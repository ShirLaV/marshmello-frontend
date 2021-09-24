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
    return async(dispatch) => {
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
    return async(dispatch) => {
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

// export function onUpdateCard(action, card, groupId, board) {
//     let newCard = null;
//     switch (action.type) {
//         case 'UPDATE_CARD_COLOR':
//             card.style.bgColor = action.color
//             break
//         case 'ADD_CARD':
//             newCard = action.newCard
//             break
//     }

//     const group = board.groups.find(group => group.id === groupId);
//     const groupToUpdate = { ...group, cards: group.cards }
//     if (!newCard) groupToUpdate.cards.map(currCard => currCard.id === card.id ? card : currCard)
//     else groupToUpdate.cards = (groupToUpdate.cards) ? [...groupToUpdate.cards, newCard] : [newCard]
//     const groupAction = { type: 'UPDATE_GROUP', group: groupToUpdate }
//     return onUpdateBoard(groupAction, board)
// }

export function onUpdateCard(action, name, board) {
    const { boardId, groupId, cardId, isChecked } = action
    const group = board.groups.find(group => group.id === groupId)
    const card = group.cards.find(card => card.id === cardId)
    if (typeof isChecked === "boolean") {
        card.checklists.map(checklist => (
            checklist.todos.map(todo => {
                if (todo.id === name) todo.isDone = isChecked
            })
        ))
        console.log(card.checklists);
    }
    else { // for not nested properties
        card[name] = action[name]
    }
    const groupAction = { type: 'UPDATE_GROUP', group }
    return onUpdateBoard(groupAction, board)
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
            break;
        case 'UPDATE_GROUP':
            boardToSave.groups = [...boardToSave.groups.map(currGroup => currGroup.id === action.group.id ? action.group : currGroup)]
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