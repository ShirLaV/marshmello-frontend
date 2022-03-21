import { userService } from '../services/user.service.js'


const initialState = {
    user: userService.getLoggedinUser() || userService.getGueastUser(),
    users: [],
    watchedUser: null
}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;
        case 'SET_WATCHED_USER':
            newState = { ...state, watchedUser: action.user }
            break;
        case 'ADD_MENTION':
            const user = { ...state.user, mentions: [action.mention, ...state.user.mentions] }
            newState = { ...state, user }
            break;
        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break;
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break;
        default:
    }
    return newState;

}