import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    updateUser,
}

async function login(credentials) {
    try {
        const user = await httpService.post('auth/login', credentials)
        // socketService.emit('set-user-socket', user._id);
        if (user) return _saveLocalUser(user)
    } catch (err) {
        throw err
    }
}


async function logout(user) {
    try {
        sessionStorage.clear()
        // socketService.emit('unset-user-socket');
        return await httpService.post('auth/logout', user)
    } catch (err) {
        throw err
    }
}

async function signup(userInfo) {
    try {
        const user = await httpService.post('auth/signup', userInfo)
        return _saveLocalUser(user)
    } catch (err) {
        throw err
    }
}

function getLoggedinUser() {
    let user = JSON.parse(sessionStorage.getItem('loggedinUser' || null));
    return user
}


async function getUsers() {
    try {
        return await httpService.get(`user`)
    } catch (err) {
        throw err
    }
}


async function getById(userId) {
    try {
        return httpService.get(`user/${userId}`)
    } catch (err) {
        throw err
    }
}

async function updateUser(user) {
    try {
        await httpService.put(`user/${user.id}`, user)
    } catch (err) {
        throw err
    }
}

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}


