import Spinner from "../Components/Spinner"
import axios from "axios"
import { useState , useEffect } from "react"
import { useParams } from "react-router-dom";
const Show = () => {
  const [book , setBook] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:3200/api/books/${id}`)
     .then((res) => {
        setBook(res.data.data)        
        setLoading(false)
      })
     .catch((err) => console.log(err))
  }, [id])
  return (
    <div className="p-8">
  <h1 className="text-3xl font-bold text-gray-800 mb-6">Show Book</h1>
  {loading ? (
    <Spinner />
  ) : (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Book ID</label>
          <p className="text-lg font-semibold text-gray-800">{book._id}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Title</label>
          <p className="text-2xl font-bold text-gray-900">{book.title}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Author</label>
          <p className="text-lg text-gray-700">{book.author}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Publication Year</label>
          <p className="text-lg text-gray-700">{book.publicationYear}</p>
        </div>
      </div>
    </div>
  )}
</div>
  )
}

export default Show