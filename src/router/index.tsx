import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ProductDetails from "../pages/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="product/1" replace />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);
