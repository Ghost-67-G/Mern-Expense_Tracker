import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const History = () => {
  const [history, setHistory] = useState([]);
  const History = new Array(50).fill(null);
  const getHistory = async () => {
    try {
      let resp = await axios.get("/api/transactions");
      setHistory(resp.data.transactions);
    } catch (error) {
      toast.error("Faild to fetch! Please resolve");
    }
  };
  const handleDelete = async (id) => {
    try {
      let resp = await axios.delete("/api/transactions/" + id);
      toast.success(resp.data);
      getHistory();
    } catch (error) {
      toast.error("Faild to delete! Please resolve");
    }
  };
  console.log(history);
  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="h-[514px] overflow-hidden">
      <div className=" flex border  justify-between py-3 px-3">
        <h3 className="text-2xl font-semibold font-sans">History</h3>
        <input type="text" className="border px-4" placeholder="Search" />
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
