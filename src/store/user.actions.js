import { userService } from "../services/user.service.js";
import { showErrorMsg } from '../services/event-bus.service.js'
import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from "../services/socket.service.js";

export function loadUsers() {
    return async dispatch => {
        try {
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        }
    }
}

export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}

export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            console.log('Cannot login', err)
        }
    }
}

export function onGoogleLogin(tokenId) {
    return async (dispatch) => {
        try {
            const user = await userService.googleLogin(tokenId)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            console.log('Cannot login', err)
        }
    }
}

export function onSignup(credentials) {
    return (dispatch) => {
        userService.signup(credentials)
            .then(user => {
                dispatch({
                    type: 'SET_USER',
                    user
                })
            })
            .catch(err => {
                console.log('Cannot signup', err)
            })

    }
}

export function onLogout() {
    return (dispatch) => {
        userService.logout()
            .then(() => dispatch({
                type: 'SET_USER',
                user: null
            }))
            .catch(err => {
                console.log('Cannot logout', err)
            })
    }
}

export function loadAndWatchUser(userId) {
    return async (dispatch) => {
        try {
            const user = await userService.getById(userId);
            dispatch({ type: 'SET_WATCHED_USER', user })
            socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
            socketService.off(SOCKET_EVENT_USER_UPDATED)
            socketService.on(SOCKET_EVENT_USER_UPDATED, user => {
                dispatch({ type: 'SET_WATCHED_USER', user })
            })
        } catch (err) {
            showErrorMsg('Cannot load user')
            console.log('Cannot load user', err)
        }
    }
}

export function onReceiveMention(mention) {
    return async (dispatch) => {
        userService.addMentionToStorage(mention)
        dispatch({
            type: 'ADD_MENTION',
            mention
        })
    }
}

export function onUpdateUser(user) {
    return async (dispatch) => {
        try {
            const updatedUser = await userService.update(user)
            dispatch({
                type: 'SET_USER',
                user: updatedUser
            })
        } catch (err) {
            console.log('cannot update user', err)
        }
    }
}