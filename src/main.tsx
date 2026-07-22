import "./index.css";

import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";

import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "./utils/themeProvider";

import { store } from "./context/store";

// QueryClient é o "cérebro" do React Query: guarda o cache de todas as
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider >
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);
