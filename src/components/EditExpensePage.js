import React from "react";
import {connect} from "react-redux";
import ExpenseForm from "./ExpenseForm";
import {editExpense, removeExpense} from "../actions/expenses";

const EditExpensePage = ({expense, dispatch, history}) => {
  return (
    <div>
      <h1>Edit Expense</h1>
      <ExpenseForm 
        expense={expense}
        onSubmit = {(exp) => { 
          dispatch(editExpense(expense.id, exp));
          history.push("/");
        }}
      />
      <button onClick={(e)=> {
        dispatch(removeExpense({id: expense.id}));
        history.push("/");
      }}>Remove</button>
  </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((exp) => exp.id == props.match.params.id)
  }
}

export default connect(mapStateToProps)(EditExpensePage);