import React from 'react'
import ReactDOM from 'react-dom/client'
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import App, {reducer} from './App'

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
