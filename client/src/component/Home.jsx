import React, { useEffect, useState } from "react";
import { baseUrl } from "../../AxiosR";
import { MdDelete, MdEdit } from "react-icons/md";

export default function Home() {

  // =========================
  // STATE
  // =========================
  const [formData, setFormData] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    publishDate: "",
  });

  const [bookList, setBookList] = useState([]);

  const [isUpdate, setIsUpdate] = useState(false);

  const [editId, setEditId] = useState("");

  // =========================
  // GET ALL BOOKS
  // =========================
  const getAllData = async () => {

    try {

      const { data } =
        await baseUrl.get("/bookList");

      if (data?.success) {
        setBookList(data?.bookList || []);
      }

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // HANDLE UPDATE
  // =========================
  const handleUpdate = (item) => {

    setEditId(item._id);

    setFormData({
      BookName: item.BookName,
      BookTitle: item.BookTitle,
      Author: item.Author,
      SellingPrice: item.SellingPrice,
      publishDate: item.publishDate?.split("T")[0],
    });

    setIsUpdate(true);
  };

  // =========================
  // DELETE BOOK
  // =========================
  const handleDelete = async (id) => {

    try {

      const { data } =
        await baseUrl.post(
          "/delete",
          { id }
        );

      if (data?.success) {

        alert(data?.message);

        getAllData();
      }

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // USE EFFECT
  // =========================
  useEffect(() => {
    getAllData();
  }, []);

  // =========================
  // SUBMIT FORM
  // =========================
  const submitForm = async () => {

    try {

      if (
        !formData.BookName ||
        !formData.BookTitle ||
        !formData.Author ||
        !formData.SellingPrice ||
        !formData.publishDate
      ) {
        return alert("All fields required");
      }

      // =========================
      // UPDATE
      // =========================
      if (isUpdate) {

        const { data } =
          await baseUrl.post(
            "/update",
            {
              id: editId,
              ...formData,
            }
          );

        if (data?.success) {

          alert(data?.message);

          getAllData();

          setFormData({
            BookName: "",
            BookTitle: "",
            Author: "",
            SellingPrice: "",
            publishDate: "",
          });

          setIsUpdate(false);

          setEditId("");
        }

      } else {

        // =========================
        // ADD BOOK
        // =========================
        const { data } =
          await baseUrl.post(
            "/addBook",
            formData
          );

        if (data?.success) {

          alert(data?.message);

          getAllData();

          setFormData({
            BookName: "",
            BookTitle: "",
            Author: "",
            SellingPrice: "",
            publishDate: "",
          });
        }
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">

      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl p-8">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Library Management
          </h1>

          <p className="text-gray-500 mt-2">
            Add and manage your books easily
          </p>

        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">

          {/* BOOK NAME */}
          <div className="flex flex-col gap-2">

            <label className="text-sm font-semibold text-gray-700">
              Book Name
            </label>

            <input
              type="text"
              placeholder="Enter book name"
              className="h-12 px-4 rounded-xl border border-gray-300 bg-gray-50"
              name="BookName"
              value={formData.BookName}
              onChange={handleChange}
            />

          </div>

          {/* BOOK TITLE */}
          <div className="flex flex-col gap-2">

            <label className="text-sm font-semibold text-gray-700">
              Book Title
            </label>

            <input
              type="text"
              placeholder="Enter title"
              className="h-12 px-4 rounded-xl border border-gray-300 bg-gray-50"
              name="BookTitle"
              value={formData.BookTitle}
              onChange={handleChange}
            />

          </div>

          {/* AUTHOR */}
          <div className="flex flex-col gap-2">

            <label className="text-sm font-semibold text-gray-700">
              Author
            </label>

            <input
              type="text"
              placeholder="Enter author"
              className="h-12 px-4 rounded-xl border border-gray-300 bg-gray-50"
              name="Author"
              value={formData.Author}
              onChange={handleChange}
            />

          </div>

          {/* PRICE */}
          <div className="flex flex-col gap-2">

            <label className="text-sm font-semibold text-gray-700">
              Selling Price
            </label>

            <input
              type="number"
              placeholder="₹ Enter price"
              className="h-12 px-4 rounded-xl border border-gray-300 bg-gray-50"
              name="SellingPrice"
              value={formData.SellingPrice}
              onChange={handleChange}
            />

          </div>

          {/* DATE */}
          <div className="flex flex-col gap-2">

            <label className="text-sm font-semibold text-gray-700">
              Publish Date
            </label>

            <input
              type="date"
              className="h-12 px-4 rounded-xl border border-gray-300 bg-gray-50"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* BUTTON */}
        <div className="mt-8 flex justify-end">

          <button
            className={`px-8 py-3 rounded-xl font-semibold text-white ${
              isUpdate
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-black hover:bg-gray-800"
            }`}
            onClick={submitForm}
          >
            {isUpdate ? "Update Book" : "Submit"}
          </button>

        </div>

        {/* TABLE */}
        <div className="mt-10 overflow-x-auto">

          <table className="w-full border border-gray-300">

            <thead className="bg-black text-white">

              <tr>
                <th className="p-3 border">Book Name</th>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Author</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Publish Date</th>
                <th className="p-3 border">Action</th>
              </tr>

            </thead>

            <tbody>

              {bookList?.map((item, index) => (

                <tr
                  key={index}
                  className="text-center hover:bg-gray-100"
                >

                  <td className="p-3 border">
                    {item?.BookName}
                  </td>

                  <td className="p-3 border">
                    {item?.BookTitle}
                  </td>

                  <td className="p-3 border">
                    {item?.Author}
                  </td>

                  <td className="p-3 border">
                    ₹ {item?.SellingPrice}
                  </td>

                  <td className="p-3 border">
                    {new Date(item?.publishDate).toLocaleDateString()}
                  </td>

                  <td className="p-3 border">

                    <div className="flex items-center justify-center gap-4">

                      {/* UPDATE */}
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                        onClick={() => handleUpdate(item)}
                      >
                        <MdEdit size={20} />
                      </button>

                      {/* DELETE */}
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                        onClick={() => handleDelete(item._id)}
                      >
                        <MdDelete size={20} />
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}