import {handleAuthRequests} from "./handleAuthRequests";

export async function fetchUserById({userId}) {
    const {data} = await handleAuthRequests({
        url: `users/${userId}`,
        method: 'GET'
    })
    return data
}


export async function postUser(user) {
    const {data} = await handleAuthRequests({
        url: 'users',
        method: 'POST',
        data: user
    })
    return data //return a token to user
}

export async function getToken({username, password}) {
    const {data} = await handleAuthRequests({
        url: 'tokens',
        method: 'POST',
        data: {username, password}
    })
    return data
}