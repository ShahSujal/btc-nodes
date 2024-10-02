import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/transactions",
    element: <TransactionPage />,
  },
]);

import { Provider } from "react-redux";
import { ThemeProvider } from "./lib/provider/theme-provider.tsx";
import {store} from "./lib/rtk/store/store.ts";
import TransactionPage from "./components/transaction/index.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
