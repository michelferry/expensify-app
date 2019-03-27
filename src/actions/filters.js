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

export {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate};