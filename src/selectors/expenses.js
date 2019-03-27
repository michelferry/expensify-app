import moment from "moment";

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((exp) => {
    const createdAtMoment = moment(exp.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day") : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day") : true;
    const textMatch = typeof text != "string" || text == "" || exp.description.match(new RegExp(text, 'i')) || exp.note.match(new RegExp(text, 'i'));
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if(sortBy === "date"){
      return a.createdAt >= b.createdAt ? -1 : 1;
    } else if (sortBy === "amount"){
      return a.amount >= b.amount ? -1 : 1;
    }
  });
};

export default getVisibleExpenses;