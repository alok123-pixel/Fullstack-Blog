import { Children, createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";


// Ensure base URL is set (trim to avoid accidental spaces) and fallback to localhost:3000
const BASE_URL = (import.meta.env.VITE_BASE_URL || '').toString().trim() || 'http://localhost:3000';
axios.defaults.baseURL = BASE_URL;
// Helpful debug log to confirm base URL in browser console during development
console.log('Axios baseURL set to:', BASE_URL);

const AppContext = createContext();

export const AppProvider = ({children}) => {
    const navigate = useNavigate()

    const [token, setToken] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [input, setInput] = useState("")

    const fetchBlogs = async()=>{
        try {
          const {data} =   await axios.get('/api/blog/all');
          data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect (()=>{
        fetchBlogs();
        const token = localStorage.getItem('token')
        if(token){
           setToken(token);
           axios.defaults.headers.common['Authorization'] = `${token}`;
        }
    }, [])

    const value = {
        axios, navigate, token, setToken, blogs , setBlogs, setInput, input
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext =  ()=>{
    return useContext(AppContext)
}