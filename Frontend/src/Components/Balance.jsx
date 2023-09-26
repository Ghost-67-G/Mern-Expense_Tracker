import { useSelector } from "react-redux";
// import { useContext } from "react";
// import { GlobalContext } from "../Store/context";

const Balance = () => {
  let currentBalance = 0;
  let expense = 0;
  let income = 0;
  // let { transactions } = useContext(GlobalContext);
  let transaction = useSelector((store) => store.balanceSection);
  for (let item of transaction) {
    if (item.type=== "minus") {
      if(currentBalance<+item.Amount*-1){
        let index =transaction.indexOf(item)
        transaction.splice(index,1)
        // alert("Your current Balance is 0. So, you can't minus more value")
      }else{
        expense -= +item.Amount;
        currentBalance += +item.Amount;
      } 
    } else {
      currentBalance += +item.Amount;
      income += +item.Amount;
    }
  }
  return (
    <>
      <h2>Expense Tracker By Ayan Naseer </h2>
      <h2>Current Balance</h2>
      <h1>${currentBalance}.00</h1>
      <div className="BalanceShower">
        <div className="income">
          <h3>INCOME</h3>
          <h2 className="blue">{income}.00</h2>
        </div>
        <div className="expense">
          <h3>EXPENSE</h3>
          <h2 className="red">{expense}.00</h2>
        </div>
      </div>
    </>
  );
};

export default Balance;
