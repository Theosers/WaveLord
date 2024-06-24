import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/index';
import { Toaster } from 'react-hot-toast';

const App = lazy(() => import('./App'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
        <Toaster 
          toastOptions={{
            position: 'bottom-right',
            className: 'toast',
            style: {
              background: '#333',
              color: '#fff',
            }
          }}
        />
      </Suspense>
    </Provider>
  </BrowserRouter>
);
