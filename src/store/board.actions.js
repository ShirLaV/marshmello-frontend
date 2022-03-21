import { boardService } from "../services/board.service.js";
import { socketService } from "../services/socket.service.js";

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

export function onRemoveCard(card, board) {
    const boardToSave = {...board }
    boardToSave.archivedCards = boardToSave.archivedCards.filter(archivedCard => archivedCard.id !== card.id)
    return onUpdateBoard({}, boardToSave)
}

export function onArchiveCard(archivedCard, groupId, board, activity = null) {
    archivedCard.isArchive = true;
    const group = {...board.groups.find(group => group.id === groupId) }
    const cardIdx = group.cards.findIndex(card => card.id === archivedCard.id)
    const boardToSave = {...board }
    archivedCard.groupId = groupId;
    archivedCard.prevIndex = cardIdx;
    group.cards.splice(cardIdx, 1)
    boardToSave.archivedCards = boardToSave.archivedCards ? boardToSave.archivedCards : []
    boardToSave.archivedCards.unshift(archivedCard)
    const groupAction = { type: 'UPDATE_GROUP', group }
    return onUpdateBoard(groupAction, boardToSave, activity)
}

export function onUnArchiveCard(cardToSave, board, activity = null) {
    const group = {...board.groups.find(group => group.id === cardToSave.groupId) }
    if (group) {
        const cardIdx = cardToSave.prevIndex
        delete cardToSave.groupId
        delete cardToSave.prevIndex
        delete cardToSave.isArchive
        group.cards.splice(cardIdx, 0, cardToSave)
    }
    const boardToSave = {...board }
    boardToSave.archivedCards = boardToSave.archivedCards.filter(archivedCard => archivedCard.id !== cardToSave.id)
    const groupAction = { type: 'UPDATE_GROUP', group }
    return onUpdateBoard(groupAction, boardToSave, activity)
}

export function loadArchivedCards(boardId) {
    return async(dispatch) => {
        try {
            const archivedCards = await boardService.getArchivedCards(boardId)
            return archivedCards;
        } catch (err) {
            console.log('Cannot load archived cards', err)
        }
    }
}


export function onUpdateCard(cardToSave, groupId, board, activity = null) {
    const group = board.groups.find(group => group.id === groupId)
    const cardIdx = group.cards.findIndex(card => card.id === cardToSave.id)
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
            boardToSave.members = [...boardToSave.members, action.member]
            break;
        case 'REMOVE_BOARD_MEMBER':
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
        default:
            break
    }
    return boardToSave;
}