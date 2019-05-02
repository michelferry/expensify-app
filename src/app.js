import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import {addExpense, editExpense, removeExpense} from "./actions/expenses";
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "./firebase/firebase";

const store = configureStore();
// store.subscribe(() => {
//   const state = store.getState();
//   console.log(getVisibleExpenses(state.expenses, state.filters))
// })

store.dispatch(addExpense({description: "Water bill", amount:100, createdAt:300}));
store.dispatch(addExpense ({description: "Gas bill", amount: 200, createdAt: -50}));
store.dispatch(addExpense({description: "Rent", amount:109500, createdAt:-1500}));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));