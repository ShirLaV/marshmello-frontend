// import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { 
    socketService, 
} from './socket.service'
import { utilService } from './util.service';
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getMiniUser,
    getUsers,
    getById,
    update,
    getGueastUser,
    googleLogin,
    addUserMention,
    addMentionToStorage
}

window.userService = userService


async function getUsers() {
    // const users = storageService.query('user')
    // return users
    const users = await httpService.get(`user`)
    return users
}

async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
    return user;
}

async function update(user) {
    // await storageService.put('user', user)
    const updatedUser = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(updatedUser)
    return updatedUser;
}

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username.toLocaleLowerCase() === userCred.username.toLocaleLowerCase())
    // return _saveLocalUser(user)

    const user = await httpService.post('auth/login', userCred)
    // socketService.emit('set-user-socket', user._id);
    if (user) return _saveLocalUser(user)
}

async function googleLogin(tokenId) {
    try {
        const user = await httpService.post('auth/googlelogin', { tokenId })
        if (user) return _saveLocalUser(user)
    } catch (err) {
        throw err
    }
}

async function signup(userCred) {
    userCred.imgUrl = ''
    userCred.mentions = []
    userCred.boards = []
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    // socketService.emit('set-user-socket', user._id);
    return _saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.emit('unset-user-socket');
    // return await httpService.post('auth/logout')
}

async function addMentionToStorage(mention) {
    const user = userService.getLoggedinUser()
    user.mentions.unshift(mention)
    _saveLocalUser(user)
}


function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    const loggedinUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
    return loggedinUser
}

function getMiniUser() {
    const fullUser = getLoggedinUser() || { _id: utilService.makeId(), fullname: 'Guest' }
    return { _id: fullUser._id, fullname: fullUser.fullname, imgUrl: fullUser.imgUrl }
}

function getGueastUser() {
    return { _id: utilService.makeId(), fullname: 'Guest' }
}

function addUserMention(userId, mention) {
    httpService.put(`user/${userId}/mention`, mention)
}


// (async () => {
//     await login({ username: 'morty@smith.com' })
// })();

//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})



// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async () => {
//     var user = getLoggedinUser()
//     // Dev Helper: Listens to when localStorage changes in OTHER browser

//     // Here we are listening to changes for the watched user (comming from other browsers)
//     window.addEventListener('storage', async () => {
//         if (!gWatchedUser) return;
//         const freshUsers = await storageService.query('user')
//         const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
//         if (!watchedUser) return;
//         if (gWatchedUser.score !== watchedUser.score) {
//             console.log('Watched user score changed - localStorage updated from another browser')
//             socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
//         }
//         gWatchedUser = watchedUser
//     })
// })();

// This is relevant when backend is connected
(async () => {
    var user = getLoggedinUser()
    if (user) socketService.emit('set-user-socket', user._id)
})();