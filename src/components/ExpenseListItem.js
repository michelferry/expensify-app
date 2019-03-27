import React from "react";
import { Link } from "react-router-dom";

const ExpenseListItem = ({id, number, description, amount, createdAt}) => (
  <div>
    <Link to={`/edit/${id}`}><h4>Expense n° {number+1}</h4></Link>
    <ul>
      <li>Description: {description}</li>
      <li>Amount: {amount}</li>
      <li>Created at: {createdAt}</li>
    </ul>
  </div>
);

export default ExpenseListItem;