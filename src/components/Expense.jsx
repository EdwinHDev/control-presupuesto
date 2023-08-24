import PropTypes from "prop-types";
import { formatDate } from "../helpers/formatDate";
import { currency } from "../helpers/currency";
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

export const Expense = ({ expense, setEditExpense, deleteExpense }) => {

  const { id, date, name, quantity, category } = expense;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditExpense(expense)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => deleteExpense(id)}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra" style={{ userSelect: "none" }}>
          <div className="contenido-gasto">
            <img src={`/img/icono_${category}.svg`} alt={category} />
            <div className="descripcion-gasto">
              <p className="categoria">{category}</p>
              <p className="nombre-gasto">{name}</p>
              <p className="fecha-gasto">Agregado el: <span>{formatDate(date)}</span></p>
            </div>
          </div>
          <p className="cantidad-gasto">{currency(Number(quantity))}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

Expense.propTypes = {
  expense: PropTypes.object,
  setEditExpense: PropTypes.func,
  deleteExpense: PropTypes.func
}