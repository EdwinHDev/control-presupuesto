import PropTypes from 'prop-types';
import { currency } from '../helpers/currency';
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const BudgetControl = ({ budget, setBudget, setIsValidBudget, expenses, setExpenses }) => {

  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const totalSpent = expenses.reduce((total, expense) => Number(expense.quantity) + total, 0);
    const totalAvailable = budget - totalSpent;

    const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(2);

    setAvailable(totalAvailable);
    setSpent(totalSpent);
    setTimeout(() => {
      setPercentage(newPercentage);
    }, 1000);
  }, [expenses]);

  const handleResetApp = () => {
    const res = confirm("¿Seguro que deseas resetear la App?");

    if(res) {
      setBudget(0);
      setExpenses([]);
      setIsValidBudget(false);
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: percentage > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textColor: percentage > 100 ? "#DC2626" : "#3B82F6",
          })}
          value={percentage}
          text={`${percentage}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button
          className='reset-app'
          type='button'
          onClick={handleResetApp}
        >
          Resetear App
        </button>
        <p><span>Presupuesto:</span> {currency(budget)}</p>
        <p className={`${available < 0 ? "negativo" : ""}`}><span>Disponible:</span> {currency(available)}</p>
        <p><span>Gastado:</span> {currency(spent)}</p>
      </div>
    </div>
  )
}

BudgetControl.propTypes = {
  budget: PropTypes.number,
  setBudget: PropTypes.func,
  setIsValidBudget: PropTypes.func,
  expenses: PropTypes.array,
  setExpenses: PropTypes.func
}