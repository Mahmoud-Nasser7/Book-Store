import { Link } from "react-router-dom"
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Table = ({books}) => {
  return (
    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left text-gray-500">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3">
          No
        </th>
        <th scope="col" className="px-6 py-3">
          Title
        </th>
        <th scope="col" className="px-6 py-3">
          Author
        </th>
        <th scope="col" className="px-6 py-3">
          PublishYear
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
        {books.map((book, index) => (
      <tr key={book._id} className="bg-white border-b border-gray-200">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {index+1}
        </th>
        <td className="px-6 py-4">
          {book.title}
        </td>
        <td className="px-6 py-4">
          {book.author}
        </td>
        <td className="px-6 py-4">
          {book.publicationYear || 2022}
        </td>
        <td className="px-6 py-4 flex gap-5 items-center">
          <Link to={`/details/${book._id}`} className="text-xl text-blue-600 "><FaEye/></Link>
          <Link to={`/edit/${book._id}`} className="text-xl text-green-600 "><FaRegEdit/></Link>
          <Link to={`/delete/${book._id}`} className="text-xl text-red-600 "><MdDelete/></Link>
        </td>
      </tr>
       
        ))}


    </tbody>
  </table>
</div>


  )
}

export default Table