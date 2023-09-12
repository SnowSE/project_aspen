import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/home/Home"

export const AppRoutes = () => {

  return (
    <>
      <div className="justify-content-center">
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  )
}
