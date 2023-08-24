import { useState } from 'react';
import PropTypes from 'prop-types';
import { Message } from './Message';

export const NewBudget = ({ budget, setBudget, setIsValidBudget }) => {

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if(e.target.value >= 0) {
      setBudget(Number(e.target.value));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(budget <= 0) {
      setMessage("No es un presupuesto válido");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    setIsValidBudget(true);
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form
        className="formulario"
        onSubmit={handleSubmit}
      >
        <div className="campo">
          <label htmlFor="budget">Definir presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu presupuesto"
            value={budget}
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Añadir" />
        { message && <Message type="error">{message}</Message> }
      </form>
    </div>
  )
}

NewBudget.propTypes = {
  budget: PropTypes.number,
  setBudget: PropTypes.func,
  setIsValidBudget: PropTypes.func,
}