import Spinner from "../Components/Spinner";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publicationYear: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const fetchBook = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3200/api/books/${id}`);
      setFormData(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.publicationYear) {
      setErrors("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`http://localhost:3200/api/books/${id}`, formData);
      setSuccess("Book updated successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit a New Book
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6"
      >
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
            disabled={loading}
            aria-label="Book Title"
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
            disabled={loading}
            aria-label="Author Name"
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
            disabled={loading}
            aria-label="Publication Year"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
          >
            Cancel
          </button>
          {loading ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
              Edit Book
            </button>
          )}
        </div>
      {errors && (
        <div
          class="flex w-[400px] items-center p-4 mt-6 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400"
          role="alert"
        >
          <svg
            class="shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">Danger alert!</span> {errors}
          </div>
        </div>
      )}
      </form>
    </div>
  );
};

export default Edit;
