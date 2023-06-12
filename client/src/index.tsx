import ReactDOM from 'react-dom/client';
import createSagaMiddlware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from "react-router-dom";
import { routerMiddleware } from 'connected-react-router';
import { SnackbarProvider } from 'notistack';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App';
import root, { history } from './store/reducers';
import sagaWatcher from './store/sagas/watcher';

const saga = createSagaMiddlware();
const router = routerMiddleware(history);
export const store = createStore(
  root,
  composeWithDevTools(applyMiddleware(
    saga,
    router,
  )),
);
saga.run(sagaWatcher);

const rootEl = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
rootEl.render(
  <SnackbarProvider maxSnack={3}>
    <BrowserRouter>
      <Provider store={store}>
        {/* <ConnectedRouter history={history}> */}
          <App />
        {/* </ConnectedRouter> */}
      </Provider>
    </BrowserRouter>
  </SnackbarProvider>
);
