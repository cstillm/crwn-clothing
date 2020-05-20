// setting INITIAL_STATE incase undefined null will be passed
const INITIAL_STATE = {
    currentUser: null
}

// EVERY reducer receives every action even if it's not for it
// this is why we setup cases to catch the calls we want and 
// also why we set INITIAL_STATE and set the return state;

// we are using INITIAL_STATE as a default state value incase
// its ever undefined, null will get passed as a value
const userReducer = (state = INITIAL_STATE, action) => {
    
    // action.type will be a string value
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state, // spread the current state back into the new object
                currentUser: action.payload // we modify the state prop we want
            }

        default:
            return state; // return state since all reducers are called on action if not wanted
    }
}

export default userReducer; // bring into our root reducer