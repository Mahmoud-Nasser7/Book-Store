import Spinner from "../Components/Spinner";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publicationYear: "",
  });
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      await axios.post("http://localhost:3200/api/books", formData);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create a New Book
        </h1>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={handleChange}
              id="title"
              className="w-full px-4 py-2 outline-none text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter book title"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Author
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={handleChange}
              id="author"
              className="w-full px-4 py-2 outline-none text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter author name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="publicationYear"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Publication Year
            </label>
            <input
              type="text"
              value={formData.publicationYear}
              onChange={handleChange}
              id="publicationYear"
              className="w-full px-4 py-2 outline-none text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter publication year"
            />
          </div>
          <div className="flex justify-end">
            {loading? <Spinner /> : (
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
              Create Book
            </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
