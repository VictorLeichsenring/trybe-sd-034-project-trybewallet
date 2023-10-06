import { legacy_createStore as createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { userReducer } from './reducers/user';

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(), // Aplicando o middleware do Redux DevTools
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
