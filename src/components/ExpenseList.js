import React from "react";
import {connect} from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

const ExpenseList = (props) => (
  <div>
    <h3>ExpenseList</h3>
    {props.expenses.map((expense, index) => {
      return <ExpenseListItem {...expense} key={expense.id} number={index}/>
    })}
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);