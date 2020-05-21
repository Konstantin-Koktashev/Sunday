import { combineReducers } from 'redux';
import ReviewReducer from './ReviewReducer'
import UserReducer from './UserReducer'
import SystemReducer from './SystemReducer';
import BoardReducer from './BoardReducer'

const rootReducer = combineReducers({
  system: SystemReducer,
  review: ReviewReducer,
  user: UserReducer,
  userBoards: BoardReducer
})

export default rootReducer;