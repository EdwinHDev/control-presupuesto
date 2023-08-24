import PropTypes from 'prop-types';
import cerrarModal from "../img/cerrar.svg";
import { useEffect, useState } from 'react';
import { Message } from './Message';

const INITIAL_VALUES = {
  name: "",
  quantity: 0,
  category: "",
}

export const Modal = ({ setModal, modalAnimation, setModalAnimation, saveExpense, editExpense, setEditExpense }) => {

  const [expense, setExpense] = useState(INITIAL_VALUES);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if(Object.keys(editExpense).length > 0) {
      setExpense(editExpense);
      setId(editExpense.id);
      setDate(editExpense.date);
    }
  }, [editExpense]);

  const closeModal = () => {
    setModalAnimation(false);
    setEditExpense({});
    setTimeout(() => {
      setModal(false);
    }, 200);
  }

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, quantity, category } = expense;

    if([name, quantity, category].includes('')) {
      setMessage("Todos los campos son obligatorios");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    const newExpense = {
      id: id,
      date: date,
      name: expense.name,
      quantity: expense.quantity,
      category: expense.category,
    }

    saveExpense(newExpense);
    closeModal();
  }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={cerrarModal}
          alt="cerrar modal"
          onClick={closeModal}
        />
      </div>
      <form
        className={`formulario ${modalAnimation ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        <legend>{Object.keys(editExpense).length > 0 ? "Editando gasto" : "Nuevo gasto"}</legend>
        { message && <Message type="error">{message}</Message> }
        <div className='campo'>
          <label htmlFor="name">Nombre del gasto</label>
          <input
            id='name'
            name='name'
            type="text"
            placeholder='Nombre del gasto'
            value={expense.name}
            onChange={handleChange}
          />
        </div>
        <div className='campo'>
          <label htmlFor="quantity">Cantidad</label>
          <input
            id='quantity'
            name='quantity'
            type="number"
            placeholder='Ej: 300'
            value={expense.quantity}
            onChange={handleChange}
          />
        </div>
        <div className='campo'>
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            name='category'
            value={expense.category}
            onChange={handleChange}
          >
            <option value="" disabled>-- Elije una opción --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input type="submit" value={Object.keys(editExpense).length > 0 ? "Guardar cambios" : "Añadir gasto"} />
      </form>
    </div>
  )
}

Modal.propTypes = {
  setModal: PropTypes.func,
  modalAnimation: PropTypes.bool,
  setModalAnimation: PropTypes.func,
  saveExpense: PropTypes.func,
  editExpense: PropTypes.object,
  setEditExpense: PropTypes.func
}