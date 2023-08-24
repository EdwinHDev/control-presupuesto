import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import newExpense from "../public/img/nuevo-gasto.svg";
import { Modal } from "./components/Modal";
import generateId from "./helpers/generateId";
import { ExpensesList } from "./components/ExpensesList";
import { Filter } from "./components/Filter";

const INITIAL_BUDGET = Number(localStorage.getItem("budget")) ?? 0;
const INITIAL_EXPENSES = JSON.parse(localStorage.getItem("expenses")) ?? [];

function App() {

  const [budget, setBudget] = useState(INITIAL_BUDGET);
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [editExpense, setEditExpense] = useState({});
  const [filter, setFilter] = useState("");
  const [filterExpenses, setFilterExpenses] = useState([]);

  useEffect(() => {
    if(Object.keys(editExpense).length > 0) {
      setModal(true);

      setTimeout(() => {
        setModalAnimation(true);
      }, 200);
    }
  }, [editExpense]);

  useEffect(() => {
    localStorage.setItem("budget", budget ?? 0);
  }, [budget]);

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem("budget")) ?? 0;
    if(budgetLS > 0) {
      setIsValidBudget(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses) ?? []);
  }, [expenses]);

  useEffect(() => {
    if(filter) {
      const expensesFilter = expenses.filter(expense => expense.category === filter);
      setFilterExpenses(expensesFilter);
    }
  }, [filter]);

  const handleNewBudget = () => {
    setModal(true);
    setEditExpense({});

    setTimeout(() => {
      setModalAnimation(true);
    }, 200);
  }

  const saveExpense = expense => {

    if(expense.id) {
      const expensesUpdate = expenses.map(expenseState => expenseState.id === expense.id ? expense : expenseState);
      setExpenses(expensesUpdate);
      setEditExpense({});
    } else {
      expense.id = generateId();
      expense.date = Date.now();
      setExpenses([...expenses, expense]);
    }
  }

  const deleteExpense = id => {
    const deleteExpense = expenses.filter(expense => expense.id !== id);
    setExpenses(deleteExpense);
  }

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        expenses={expenses}
        setExpenses={setExpenses}
      />

      {
        isValidBudget && (
          <>
            <main>
              <Filter
                filter={filter}
                setFilter={setFilter}
              />
              <ExpensesList
                expenses={expenses}
                setEditExpense={setEditExpense}
                deleteExpense={deleteExpense}
                filter={filter}
                filterExpenses={filterExpenses}
              />
            </main>
            <div className="nuevo-gasto">
              <img
                src={newExpense}
                alt="nuevo gasto"
                onClick={handleNewBudget}
              />
            </div>
          </>
        )
      }

      {
        modal && (
          <Modal
            setModal={setModal}
            modalAnimation={modalAnimation}
            setModalAnimation={setModalAnimation}
            saveExpense={saveExpense}
            editExpense={editExpense}
            setEditExpense={setEditExpense}
          />
        )
      }

    </div>
  )
}

export default App
