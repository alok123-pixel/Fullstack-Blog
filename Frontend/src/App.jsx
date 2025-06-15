import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Blog from './Pages/Blog'
import Layout from './Pages/Admin/Layout'
import Dashboard from './Pages/Admin/Dashboard'
import Addblog from './Pages/Admin/Addblog'
import Listblog from './Pages/Admin/Listblog'
import Comment from './Pages/Admin/Comment'
import Login from './Components/admin/Login'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
function App() {
  const [count, setCount] = useState(0)
  const {token} = useAppContext()
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/admin' element={ token ?<Layout/> : <Login/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='addBlog' element={<Addblog/>}/>
          <Route path='listBlog' element={<Listblog/>}/>
          <Route path='comments' element={<Comment/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
