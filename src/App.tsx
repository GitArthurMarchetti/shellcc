// IMPORTAÇÕES
import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/home"
import { Login } from "./pages/login"
import { Signin } from "./pages/signin"
import Salas from "./pages/salas"

// ROTAS
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/salas',
    element: <Salas />,
  },

])

export { router }