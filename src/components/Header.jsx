import PropTypes from 'prop-types';
import { NewBudget } from "./NewBudget";
import { BudgetControl } from './BudgetControl';
import { useEffect, useState } from 'react';

export const Header = ({ budget, setBudget, isValidBudget, setIsValidBudget, expenses, setExpenses }) => {
  
  const [checkBudget, setCheckBudget] = useState(0);

  useEffect(() => {
    const allExpenses = expenses.reduce((total, expense) => Number(expense.quantity) + total, 0);
    const totalAvailable = budget - allExpenses;
    setCheckBudget(totalAvailable);
  }, [expenses]);

  return (
    <header className={`${checkBudget < 0 ? "alert-header" : "header"}`}>
      <h1>Planificador de gastos</h1>
      {
        isValidBudget ? (
          <BudgetControl
            budget={budget}
            setBudget={setBudget}
            setIsValidBudget={setIsValidBudget}
            expenses={expenses}
            setExpenses={setExpenses}
          />
        ) : (
          <NewBudget
            budget={budget}
            setBudget={setBudget}
            setIsValidBudget={setIsValidBudget}
          />
        )
      }
    </header>
  )
}

Header.propTypes = {
  budget: PropTypes.number,
  setBudget: PropTypes.func,
  isValidBudget: PropTypes.bool,
  setIsValidBudget: PropTypes.func,
  expenses: PropTypes.array,
  setExpenses: PropTypes.func
}