import { legacy_createStore as createStore,
  combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { userReducer } from './reducers/user';
import siglaReducer from './reducers/siglaReducer';

const rootReducer = combineReducers({
  user: userReducer,
  currencies: siglaReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)), // Aplicando o middleware do Redux DevTools
);

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

export type RootState = ReturnType<typeof rootReducer>;

export default store;
