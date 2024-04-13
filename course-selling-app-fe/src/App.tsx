import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Navbar from './Components/Navbar'
import AddCourse from './Components/AddCourse'
import Courses from './Components/Courses'
import Course from './Components/Course'
function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/courses' element={<Courses />}></Route>
          <Route path='/addCourse' element={<AddCourse />}></Route>
          <Route path='/course/:courseId' element={<Course />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
