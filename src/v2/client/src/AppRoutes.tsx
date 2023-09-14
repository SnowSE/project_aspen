import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/home/Home"
import { NavBar } from "./components/NavBar"

export const AppRoutes = () => {

  return (
    <>
      <div className="justify-content-center">
        <Toaster />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  )
}
