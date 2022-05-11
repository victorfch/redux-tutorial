import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const reducer = (state = 0, action) => {
  const options = {
   'increment': state + 1,
    'decrement': state - 1,
    'set': action.paylad,
  }

  return options[action.type] || state
}

function App() {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const handleInput = ({target}) => {
    setValue(Number(target.value))
  }

  const handleSet = () => {
    dispatch({type: 'set', paylad: value})
    setValue('')
  }

  return (
    <div>
      Contador: {state}
      <br />
      <button onClick={() => dispatch({type: 'increment'})}>
        Incrementar
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>
        Decrementar
      </button>
      <button onClick={handleSet}>
        Set
      </button>
      <input type="text" value={value} onChange={handleInput} />
    </div>
  )
}

export default App
