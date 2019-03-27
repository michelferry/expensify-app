import {createStore, combineReducers} from "redux";
import uuid from "uuid";

//Expenses Action generators
const addExpense = ({description="", note="", amount=0, createdAt=0} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

const removeExpense = ({id} = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

//Filters Action generators
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});

const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
})

const sortByDate = () => ({
  type: "SORT_BY_DATE"
})

const setStartDate = (date = undefined) => ({
  type: "SET_START_DATE",
  date
})

const setEndDate = (date = undefined) => ({
  type: "SET_END_DATE",
  date
})

//Reducers
const expansesReducerDefaultState = [];
const expensesReducer = (state = expansesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter((exp) => exp.id != action.id);
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if(expense.id == action.id){
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
}

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
}
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch(action.type){
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date"
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.date
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.date
      };
    default:
      return state;
  }
}

//Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((exp) => {
    const startDateMatch = typeof startDate != "number" || (exp.createdAt >= startDate);
    const endDateMatch = typeof endDate != "number" || (exp.createdAt <= endDate);
    const textMatch = typeof text != "string" || text == "" || exp.description.match(new RegExp(text, 'i')) || exp.note.match(new RegExp(text, 'i'));
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if(sortBy == "date"){
      return a.createdAt >= b.createdAt ? -1 : 1;
    } else if (sortBy == "amount"){
      return a.amount >= b.amount ? -1 : 1;
    }
  });
}

//Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
})


const ExpenseOne = store.dispatch(addExpense({description: "Rent", amount: 600, createdAt: -21000}));
const ExpenseTwo = store.dispatch(addExpense({description: "Coffee", amount: 300, createdAt: -1000}));

// store.dispatch(removeExpense({id: ExpenseOne.expense.id}));
// store.dispatch(editExpense(ExpenseTwo.expense.id, {amount: 500}));

// store.dispatch(setTextFilter("rent"));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

const demoState = {
  expenses: [{
    id: "aoihadqd",
    description: "january rent",
    note: "This was the final payment for that address",
    amount: 500,
    createdAt: 0
  }],
  filters: {
    text: "rent",
    sortBy: "amount", //date or amount
    startDate: undefined,
    endDate: undefined
  }
};

