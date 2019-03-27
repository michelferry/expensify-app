import {createStore} from "redux";

const incrementCount = ({incrementBy = 1} = {}) => {
  return {
    type: "INCREMENT",
    incrementBy
  }
}

const setCount = ({count}) => {
  return {
    type: "SET",
    count
  }
}

const countReducer = (state = {count: 0}, action) => {
  switch(action.type){
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy
      };
    case "SET":
      return {
        count: action.count
      };
    default:
      return state;
  }
};

const store = createStore(countReducer);

const unsuscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount({incrementBy: 10}));

store.dispatch(setCount({count: 50}));

store.dispatch(incrementCount());