import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import LoginUser from './Reducer/LoginReducer';
import SignupUser from './Reducer/SignupReducer';
import Poll from './Reducer/PollReducer';
import singlePoll from './Reducer/SignlePollReduce';
import Vote from './Reducer/VoteReducer';
import createSagaMiddleware from 'redux-saga';
import {watcherSaga} from './sagas/rootSaga';
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  user: LoginUser,
  signupUser: SignupUser,
  poll: Poll,
  singlePoll: singlePoll,
  vote: Vote,
});

const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(watcherSaga);
export default store;
