import Spinner from "../Components/Spinner"
import axios from "axios"
import { Link } from "react-router-dom"
import { useState , useEffect } from "react"
import { IoMdAdd } from "react-icons/io";
import Table from "../Components/Table";

const Home = () => {
  const [books , setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:3200/api/books')
     .then(res => {      
        setBooks(res.data.data)
        setLoading(false)
      })
     .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])
  return (
    <div className="p-4">
      <div className="flex justify-between items-center ">
        <h1 className="text-3xl my-8">Book Store</h1>
        <Link to="/create">
        <IoMdAdd className="text-sky-800 text-4xl"/>
        </Link>
      </div>

      {loading ?
      <Spinner /> : (
        <Table books={books}/>
      )}
    </div>
  )
}

export default Home