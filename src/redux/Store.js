import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import Project from './Reducer/ProjectReducer';

const rootReducer = combineReducers({
  ProjectReducer: Project,
});

const store = createStore(rootReducer);
export default store;
