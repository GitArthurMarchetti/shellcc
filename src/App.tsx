// IMPORTAÇÕES
import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/home"

// ROTAS
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },

])

export { router }