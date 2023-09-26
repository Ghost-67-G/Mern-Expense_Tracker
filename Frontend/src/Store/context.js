// import React, { createContext, useReducer } from "react";

// let AppReducer = (state, action) => {
//   switch (action.type) {
//     case "DELETE_TRANSACTION":
//       return {
//         ...state,
//         transactions: state.transactions.filter(
//           (transaction) => transaction.id !== action.payload
//         ),
//       };
//     case "ADD_TRANSACTION":
//       return {
//         ...state,
//         transactions: [...state.transactions,action.payload],
//       };
//     case "EDIT_TRANSACTION":
//       // let ta = state.transaction.find((item)=>item.id===action.id)
//       let index = state.transactions.findIndex((item)=>item.id===action.id)
//       state.transactions[index] = action.payload
      
//       return {
//         ...state,
//         transactions:[...state.transactions]
//       };
//     default:
//       return state;
//   }
// };
// // Create the initial state
// const initialState = {
//   transactions: [],
// };

// // Create the Global Context
// export const GlobalContext = createContext(initialState);

// // Create a Provider for the Global Context
// export const GlobalProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AppReducer, initialState);

//   // Actions for Transactions

//   // Delete Existing Transaction Action
//   function delTransaction(id) {
//     dispatch({
//       type: "DELETE_TRANSACTION",
//       payload: id,
//     });
//   }

//   // Add New Transaction Action
//   function addTransaction(transaction) {
//     dispatch({
//       type: "ADD_TRANSACTION",
//       payload: transaction,
//     });
//   }
//   function editTransaction(obj,id) {
//     dispatch({
//       type: "EDIT_TRANSACTION",
//       id:id,
//       payload: obj
//     });
//   }

//   return (
//     <GlobalContext.Provider
//       value={{
//         transactions: state.transactions,
//         delTransaction,
//         addTransaction,
//         editTransaction
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };
