import PropTypes from 'prop-types';
import { Expense } from './Expense';

export const ExpensesList = ({ expenses, setEditExpense, deleteExpense, filter, filterExpenses }) => {
  return (
    <div className="listado-gastos contenedor">
      {
        filter ? (
          <>
            <h2>{filterExpenses.length ? "Gastos" : "No hay gastos aún"}</h2>
            {
              filterExpenses.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
                  <p style={{ color: "gray" }}>Desliza a izquierda o derecha para editar o eliminar</p>
                  <img src="/img/custon_cursor.svg" alt="imagen deslizar" style={{ width: "32px", opacity: "0.6" }} />
                </div>
              )
            }
            {
              filterExpenses.length > 0 && filterExpenses.map(expense => (
                <Expense
                  key={expense.id}
                  expense={expense}
                  setEditExpense={setEditExpense}
                  deleteExpense={deleteExpense}
                />
              ))
            }
          </>

        ) : (
          <>
            <h2>{expenses.length ? "Gastos" : "No hay gastos aún"}</h2>
            {
              expenses.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
                  <p style={{ color: "gray" }}>Desliza a izquierda o derecha para editar o eliminar</p>
                  <img src="/img/custon_cursor.svg" alt="imagen deslizar" style={{ width: "32px", opacity: "0.6" }} />
                </div>
              )
            }
            {
              expenses.length > 0 && expenses.map(expense => (
                <Expense
                  key={expense.id}
                  expense={expense}
                  setEditExpense={setEditExpense}
                  deleteExpense={deleteExpense}
                />
              ))
            }
          </>

        )
      }
    </div>
  )
}

ExpensesList.propTypes = {
  expenses: PropTypes.array,
  setEditExpense: PropTypes.func,
  deleteExpense: PropTypes.func,
  filter: PropTypes.string,
  filterExpenses: PropTypes.array
}