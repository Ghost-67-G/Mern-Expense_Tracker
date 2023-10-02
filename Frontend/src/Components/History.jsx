import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const History = () => {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.user._id);
  const getHistory = async () => {
    try {
      const url = `/api/transactions?userId=${userId}`;
      const searchUrl = `/api/transactions?userId=${userId}&title=${search}`;
      if (search) {
        let resp = await axios.get(searchUrl);
        setHistory(resp.data.transactions);
      } else {
        let resp = await axios.get(url);
        setHistory(resp.data.transactions);
      }
    } catch (error) {
      toast.error("Faild to fetch! Please resolve");
    }
  };
  function formatDateAndTime(inputDate) {
    const options = { year: "numeric", month: "short", day: "numeric" }; // Use 'short' for abbreviated month
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString("en-US", options);
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate} at ${time}`;
  }

  const handleDelete = async (id) => {
    try {
      let resp = await axios.delete("/api/transactions/" + id);
      console.log(resp);

      toast.success(resp.data.message);
      localStorage.setItem("user", JSON.stringify(resp.data.user));
      dispatch({
        type: "LOGIN",
        payload: resp.data.user,
      });
      getHistory();
    } catch (error) {
      toast.error("Faild to delete! Please resolve");
    }
  };
  console.log(history);
  useEffect(() => {
    getHistory();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      getHistory();
    }, 1000);
  }, [search]);

  return (
    <div className="h-[514px] overflow-hidden">
      <div className=" flex border  justify-between py-3 px-3">
        <h3 className="md:text-2xl text-xl  font-semibold font-sans">History</h3>
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="border px-4"
          placeholder="Search"
        />
      </div>
      <div className="overflow-y-scroll  h-[448px]">
        <table className="min-w-full">
          <thead className="bg-white border-b">
            <tr>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Title
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Amount
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Description
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Delete
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {history.map((item, index) => {
              return (
                <tr
                  className={
                    item.type === "income"
                      ? "bg-green-100 border-b"
                      : "bg-red-100 border-b"
                  }
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {item.title}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {item.description}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {item.amount}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                      className="focus:outline-none"
                    >
                      ❌
                    </button>
                  </td>
                  <td className="text-sm text-gray-900 font-normal px-6 py-4  whitespace-nowrap">
                    {formatDateAndTime(item.createdAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
