const initialData = {
    style: 'List',
}
const styleReducer = (state = initialData, action) => {
    switch (action.type) {
        case "STYLE":
            const { style } = action.payload;
            console.log(style);
            return {
                style: style
            }

        default:
            return state;
    }
}

export default styleReducer
