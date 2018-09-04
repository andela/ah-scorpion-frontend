import resetReducer from '../reducers/resetPassword'

describe('The test reducer', () => {
    const initialState = {
        sent: false, sending: false, errors: []
    };

    it('should have default state', () => {
        expect(resetReducer(undefined, 'NONE_EXISTENT_ACTION')).toEqual(initialState);
    })
    it('should change sending to true when action type is RESET_REQUEST_START', () => {
        expect(resetReducer(undefined, { type: 'RESET_REQUEST_START' })).toEqual({ ...initialState, sending: true });
    })
    it('should change sent to true when action type is RESET_REQUEST', () => {
        expect(resetReducer(undefined, { type: 'RESET_REQUEST' })).toEqual({ ...initialState, sent: true });
    })
    it('should change sent to false when action type is RESET_FAILED', () => {
        expect(resetReducer(undefined, { type: 'RESET_FAILED', errors: 'Failed To Reset' })).toEqual({ ...initialState, errors: 'Failed To Reset', sent: false });
    })
})