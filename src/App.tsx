// src/App.tsx
import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/home"
import { Login } from "./pages/login"
import { Signin } from "./pages/signin"
import Salas from "./pages/salas"
import Dashboard from "./pages/dashboard"
import CriarSala from "./pages/criarSala"
import { PrivateRoute } from "./components/privateRoutes"

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
    element: <PrivateRoute><Salas /></PrivateRoute>,
  },
  {
    path: '/dashboard/:roomId',  // Atualizado para incluir roomId
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
  },
  {
    path: '/criarSala',
    element: <PrivateRoute><CriarSala /></PrivateRoute>,
  },
])

export { router }