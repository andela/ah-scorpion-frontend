const initialState = {
    sent: false, sending: false, errors: [],
}
export default function (state = initialState, action) {
    switch (action.type) {
        case 'RESET_REQUEST':
            return { ...state, sent: true }
        case 'RESET_FAILED':
            return { ...state, sent: false, errors: action.errors }

        default:
            return state
    }

}