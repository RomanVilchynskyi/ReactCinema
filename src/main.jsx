import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FavoriteProvider } from './context/favorite.context'
import { Provider } from 'react-redux'
import { store } from './redux/store'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <FavoriteProvider>
        <App />
      </FavoriteProvider>
    </Provider>
  </StrictMode>,
)
