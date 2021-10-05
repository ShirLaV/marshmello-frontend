import { activityTxtMap } from "../services/activity.service.js";
import { boardService } from "../services/board.service.js";
import { socketService } from "../services/socket.service.js";
// import { userService } from "../services/user.service.js";
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';

//BOARD
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

export function loadBoard(boardId, filterBy) {
    return async(dispatch) => {
        try {
            const board = await boardService.getById(boardId, filterBy)
            document.body.style.background = board.style.bgColor ? board.style.bgColor : `url("${board.style.imgUrl}")`
            document.body.style.backgroundSize = 'cover'


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
    return async(dispatch) => {
        try {
            await boardService.remove(boardId)
            console.log('Deleted Succesfully!');
            dispatch({
                type: 'REMOVE_BOARD',
                boardId
            })
        } catch (err) {
            console.log('Cannot remove board', err)
        }
    }
}

export function onUpdateBoard(action, board, activity = null) {
    return async(dispatch) => {
        const boardToSave = _getUpdatedBoard(action, board)
        dispatch({
            type: 'UPDATE_BOARD',
            board: boardToSave
        })

        try {
            if (!action.type) action.board = board
            socketService.emit('board-update', { action, activity })
            await boardService.save(boardToSave, activity)
        } catch (err) {
            console.log('Cannot save board', err)
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
            socketService.emit('update', true)
            return savedBoard
        } catch (err) {
            console.log('Cannot add board', err)
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

//CARD
export function onAddCard(newCard, groupId, board, activity) {
    const group = board.groups.find(group => group.id === groupId)
    newCard = {...newCard, createdAt: Date.now(), isComplete: false };

    group.cards = (group.cards) ? [...group.cards, newCard] : [newCard]
    const groupAction = { type: 'UPDATE_GROUP', group }
    return onUpdateBoard(groupAction, board, activity)
}

export function onRemoveCard(cardId, groupId, board) {
    const group = board.groups.find(group => group.id === groupId)
    group.cards = [...group.cards.filter(card => card.id !== cardId)]
    const groupAction = { type: 'UPDATE_GROUP', group }
    return onUpdateBoard(groupAction, board)
}

export function onArchiveCard(cardToSave, groupId, board, activity = null) {
    return async(dispatch) => {
        const deepCopy = (item) => item
        const group = deepCopy(board.groups.find(group => group.id === groupId))
        const cardIdx = group.cards.findIndex(card => card.id === cardToSave.id)
        const groupToStore = deepCopy({...group, cards: [...group.cards.filter(card => cardToSave.id !== card.id)] })
        cardToSave.groupId = groupId;
        cardToSave.prevIndex = cardIdx;
        // console.log('in action cardToSave', cardToSave)
        group.cards.splice(cardIdx, 1, cardToSave)
            // console.log('group', group)
            // groupToStore.cards.splice(cardIdx, 1)
        const boardToSave = {...board }
        const boardToStore = {...board }
        boardToSave.groups = boardToSave.groups.map(currGroup => currGroup.id === group.id ? group : currGroup)
        boardToStore.groups = boardToStore.groups.map(currGroup => currGroup.id === groupToStore.id ? groupToStore : currGroup)
            // console.log('boardtosave', boardToSave)
        try {
            // socketService.emit('board-update', { action, activity })
            await boardService.save(boardToSave, activity)
            dispatch({
                type: 'UPDATE_BOARD',
                board: boardToStore
            })
        } catch (err) {
            console.log('Cannot save board', err)
        }
    }
}

// export function onUnArchiveCard(cardId, board){

// }

export function loadArchivedCards(boardId) {
    return async(dispatch) => {
        try {
            const archivedCards = await boardService.getArchivedCards(boardId)
            console.log('in actions', archivedCards)
            return archivedCards;
        } catch (err) {
            console.log('Cannot load archived cards', err)
        }
    }
}


export function onUpdateCard(cardToSave, groupId, board, activity = null) {
    console.log('cardToSave', cardToSave);
    const group = board.groups.find(group => group.id === groupId)
    const cardIdx = group.cards.findIndex(card => card.id === cardToSave.id)
    console.log('cardIdx: ', -1)
    group.cards.splice(cardIdx, 1, cardToSave)
    const groupAction = { type: 'UPDATE_GROUP', group }
    return onUpdateBoard(groupAction, board, activity)
}

export function onSetCardId(cardId) {
    return async(dispatch) => {
        try {
            dispatch({
                type: 'SET_CARD_ID',
                cardId
            })
        } catch (err) {
            // showErrorMsg('Cannot load boards')
            console.log('Cannot set card', err)
        }
    }
}

export function onUpdateFilter(filterBy) {
    return (dispatch) => {
        const action = { type: 'UPDATE_FILTER', filterBy }
        dispatch(action)
    }
}

export function outputUpdateBoard(action, board, activity) {
    return async(dispatch) => {
        const boardToSave = _getUpdatedBoard(action, board)
        dispatch({
            type: 'UPDATE_BOARD',
            board: boardToSave
        })

    }
}

/* 
server side filtering
const board =getBoardById()
const archived = []
board.lists.forEach((list)=>{
    list.tasks.forEach(task => {
        if (task.isClosed) {
            task.listId = list.id
            task.prevIdx
        } 
    })
})
*/


function _getUpdatedBoard(action, board) {
    const boardToSave = {...board }
    switch (action.type) {
        case 'TOGGLE_STARRED':
            boardToSave.isStarred = action.isStarred
            break;
        case 'CHANGE_BOARD_STYLE':
            boardToSave.style = action.style
            document.body.style.background = boardToSave.style.bgColor ? boardToSave.style.bgColor : `no-repeat url("${boardToSave.style.imgUrl}")`
            document.body.style.backgroundSize = 'cover'
            break;
        case 'CHANGE_TITLE':
            boardToSave.title = action.title
            break;
        case 'ADD_BOARD_MEMBER':
            console.log('members from action: ', boardToSave.members)
            boardToSave.members = [...boardToSave.members, action.member]
            break;
        case 'REMOVE_BOARD_MEMBER':
            console.log('members from action: ', boardToSave.members)
            boardToSave.members = [...boardToSave.members.filter(member => member._id !== action.memberId)]
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