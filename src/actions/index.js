export const addUserData = (data) => { 
    return {
        type: "ADD_USER",
        payload: {
            id: new Date().getTime().toString(),
            data: data
        }

    }
}
export const updateUserData = () => {
    return {
        type: "UPDATE_USER"
    }
}
export const removeUserData = () => {
    return {
        type: "REMOVE_USER"

    }
}
