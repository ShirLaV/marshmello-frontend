import { boardService } from "../services/board.service.js";
// import { userService } from "../services/user.service.js";
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';
export function loadBoards(filterBy) {
    return async (dispatch) => {
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
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            document.body.style.background = board.style.bgColor ? board.style.bgColor : `url("${board.style.imgUrl}")`

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
export function resetBoard() {
    document.body.style.background = 'unset'
    return (dispatch) => {
        dispatch({
            type: 'SET_CURR_BOARD',
            board: null
        })
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

export function setAddingBoard(isAddingBoard) {
    return (dispatch) => {
        dispatch({
            type: 'SET_ADDING_BOARD',
            isAddingBoard: isAddingBoard
        })
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

export function onAddCard(newCard, groupId, board) {
    const group = board.groups.find(group => group.id === groupId)
    newCard = { ...newCard, createdAt: Date.now(), isComplete: false };

    group.cards = (group.cards) ? [...group.cards, newCard] : [newCard]
    const groupAction = { type: 'UPDATE_GROUP', group }
    return onUpdateBoard(groupAction, board)
}

export function onRemoveCard(cardId, groupId, board) {
    const group = board.groups.find(group => group.id === groupId)
    group.cards = [...group.cards.filter(card => card.id !== cardId)]
    const groupAction = { type: 'UPDATE_GROUP', group }
    return onUpdateBoard(groupAction, board)
}


export function onUpdateCard(cardToSave, groupId, board) {
    // console.log('cardToSave', cardToSave);
    // console.log('groupId', groupId);
    // console.log('board', board);
    const group = board.groups.find(group => group.id === groupId)
    const cardIdx = group.cards.findIndex(card => card.id === cardToSave.id)
    group.cards.splice(cardIdx, 1, cardToSave)
    const groupAction = { type: 'UPDATE_GROUP', group }
    return onUpdateBoard(groupAction, board)
}

export function onUpdateFilter(filterBy) {
    return (dispatch) => {
        const action = { type: 'UPDATE_FILTER', filterBy }
        dispatch(action)
    }
}

export function onUpdateBoard(action, board) {
    return async (dispatch) => {
        const boardToSave = _getUpdatedBoard(action, board)
        dispatch({
            type: 'UPDATE_BOARD',
            board: boardToSave
        })
        // console.log('Updated Board:', boardToSave);
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
    const boardToSave = { ...board }
    switch (action.type) {
        case 'TOGGLE_STARRED':
            boardToSave.isStarred = action.isStarred
            break;
        case 'CHANGE_BOARD_STYLE':
            boardToSave.style = action.style
            document.body.style.background = boardToSave.style.bgColor ? boardToSave.style.bgColor : `url("${boardToSave.style.imgUrl}")`
            break;
        case 'CHANGE_TITLE':
            boardToSave.title = action.title
            break;
        case 'ADD_BOARD_MEMBER':
            console.log('members from action: ', boardToSave.members)
            boardToSave.members = [...boardToSave.members, action.member]
            break;
        case 'ADD_GROUP':
            boardToSave.groups = [...boardToSave.groups, action.group]
            break;
        case 'UPDATE_GROUP':
            boardToSave.groups = [...boardToSave.groups.map(currGroup => currGroup.id === action.group.id ? action.group : currGroup)]
            break
        case 'REMOVE_GROUP':
            boardToSave.groups = [...boardToSave.groups.filter(currGroup => currGroup.id !== action.group.id)]
            break
    }
    return boardToSave;
}
