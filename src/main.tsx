import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);
import { store } from '@/lib/rtk/store.ts'
import { Provider } from 'react-redux'
import { ThemeProvider } from './lib/provider/theme-provider.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

    <Provider store={store}>
   <RouterProvider router={router}/>
    </Provider>
        </ThemeProvider>
  </StrictMode>,
)
