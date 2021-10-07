const initialState = {
    boards: [],
    currBoard: null,
    filteredBoard: null,
    lastRemovedBoard: null,
    isAddingBoard: false,
    currCardId: null,
    filterBy: {
        txt: '',
        members: [],
        labels: []
    }
}

export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    switch (action.type) {
        case 'SET_BOARDS':
            newState = { ...state, boards: action.boards }
            break
        case 'UPDATE_FILTER':
            newState = {...state, filterBy: action.filterBy }
            break
        case 'SET_CURR_BOARD':
            newState = { ...state, currBoard: action.board }
            break
        case 'SET_FILTERED_BOARD':
            newState = { ...state, filteredBoard: action.board }
            break
        case 'REMOVE_BOARD':
            const lastRemovedBoard = state.boards.find(board => board._id === action.boardId)
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards, lastRemovedBoard }
            break
        case 'SET_ADDING_BOARD':
            newState = { ...state, isAddingBoard: action.isAddingBoard }
            break
        case 'ADD_BOARD':
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case 'UPDATE_BOARD':
            // boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            newState = { ...state, currBoard: action.board }
            break
        case 'SET_CARD_ID':
            newState = { ...state, currCardId: action.cardId }
            break
        case 'UNDO_REMOVE_BOARD':
            if (state.lastRemovedBoard) {
                newState = { ...state, boards: [...state.boards, state.lastRemovedBoard], lastRemovedBoard: null }
            }
            break
        default:
    }
    return newState

}