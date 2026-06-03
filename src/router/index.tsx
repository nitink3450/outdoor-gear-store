import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductDetails from "../pages/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);
