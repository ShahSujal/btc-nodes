import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Layout from "./layout.tsx"; // Import the Layout component
import TransactionPage from "./components/transaction/index.tsx";
import { Provider } from "react-redux";
import { ThemeProvider } from "./lib/provider/theme-provider.tsx";
import { store } from "./lib/rtk/store/store.ts";
import { Toaster } from "./components/ui/toaster.tsx";
import Wallets from "./components/wallet/index.tsx";
import Transactions from "./components/transaction/transactions.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Wallets />
      </Layout>
    ),
  },
  {
    path: "/transactions",
    element: (
      <Layout>
        <Transactions />
      </Layout>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);