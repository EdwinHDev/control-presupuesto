import PropTypes from 'prop-types';

export const Filter = ({ filter, setFilter }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label htmlFor="expenses">Filtrar gastos</label>
          <select
            id="expenses"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">-- Todas las categorías --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  )
}

Filter.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func
}