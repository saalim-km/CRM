import { Route, Routes } from "react-router-dom"
import { NoAuthRoute } from "./protected/ProtectedRoutes"
import { AuthPage } from "./components/Auth"
import { Toaster, toast } from 'sonner';

function App() {

  return (
    <>
      <Toaster richColors = {true} position={"top-right"}/>
      <Routes>
        <Route path="/login" element = {<NoAuthRoute element={<AuthPage/>}/>}/>
      </Routes>
    </>
  )
}

export default App
