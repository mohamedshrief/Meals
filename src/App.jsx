import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Categories from "./components/Categories/Categories";
import Layout from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MealDetails from "./components/MealDetails/MealDetails";
import NotFound404 from "./components/NotFound/NotFound404";
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Categories /> },
      { path: "categories", element: <Categories /> },
      { path: "mealdetails/:id", element: <MealDetails /> },
      { path: "*", element: <NotFound404 /> },
    ],
  },
]);
const client = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
