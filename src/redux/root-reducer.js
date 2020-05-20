import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';

// combine all our reducers into one gaint object
export default combineReducers({
    user: userReducer
})