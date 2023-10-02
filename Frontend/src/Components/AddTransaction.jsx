import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AddTransaction = () => {
  const dispatch = useDispatch();
  const transaction = async (e) => {
    e.preventDefault();
    const [title, description, amount, type] = e.target;
    console.log(title.value, description.value, amount.value, type.value);
    try {
      const resp = await axios.post(`/api/transactions`, {
        title: title.value,
        description: description.value,
        amount: amount.value,
        type: type.value,
      });
      localStorage.setItem("user", JSON.stringify(resp.data.user));
      dispatch({
        type: "LOGIN",
        payload: resp.data.user,
      });
      toast.success("Success!");
    } catch (error) {
      console.log(error);
      toast.error("Failed!");
    }
    e.target.reset();
  };

  return (
    <>
      <div className="border text-center py-3">
        <h3 className="md:text-2xl text-xl font-semibold font-sans">
          Add New Transaction
        </h3>
      </div>
      <form className="px-5 " onSubmit={transaction}>
        <div className="my-3">
          <label className="text-xl"> Title</label>
          <input
            className="border rounded p-2 w-full"
            placeholder="enter your amount"
            type="text"
            name="title"
            required
          />
        </div>

        <div className="my-3">
          <label className="text-xl"> Description</label>

          <input
            className="border rounded p-2 w-full"
            placeholder="enter your amount"
            required
            name="description"
            type="text"
          />
        </div>
        <div className="my-3">
          <label className="text-xl"> Amount</label>

          <input
            className="border rounded p-2 w-full"
            placeholder="Enter your  amount"
            required
            name="amount"
            type="number"
          />
          <div className="my-3">
            <label className="text-lg">Transaction types</label>
            <select
              name="type"
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option selected value="income">
                Income
              </option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>
        <button className="border mb-3 bg-blue-500 rounded-lg text-white p-2 hover:bg-blue-600  transition duration-150 ease-in-out focus:bg-blue-600 active:bg-blue-500 ">
          Add Transaction
        </button>
      </form>
    </>
  );
};

export default AddTransaction;
