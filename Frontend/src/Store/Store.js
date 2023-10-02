import { createStore, combineReducers, applyMiddleware } from 'redux';

function user(old = {}, newData) {
  if (newData.type === 'LOGIN') {
    localStorage.setItem('user', JSON.stringify(newData.payload));
    return { ...newData.payload };
  } else if (newData.type === 'LOG_OUT') {
    return {};
  } else {
    return { ...old };
  }
}

const logger = store => next => action => {
  console.debug('dispatching', action);
  let result = next(action);
  console.debug('next state', store.getState());
  return result;
};

let allSections = combineReducers({ user });
let store = createStore(allSections, applyMiddleware(logger));

export default store;

