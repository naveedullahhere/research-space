export const addUserData = (data, wishlistItems) => { 
    return {
        type: "ADD_USER",
        payload: {
            id: new Date().getTime().toString(),
            data: data,
            wishlistItems: wishlistItems
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

// export const wishlistItems = (data) => {
//     return {
//         type: "WISHLIST",
//         payload: {
//             item_id: new Date().getTime().toString(),
//             items: data
//         }
//     }
// }
// export const updateWishlistItems = (data) => {
//     return {
//         type: "UPDATE_WISHLIST",
//         payload: {
//             item_id: new Date().getTime().toString(),
//             items: data
//         }
//     }
// }