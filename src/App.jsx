import { useState } from "react"
import { combineReducers } from "redux"
import { useDispatch, useSelector } from "react-redux"

const selectTodos = ({entities, filter}) => {
  if (filter === 'completed') {
    return entities.filter(ent => ent.completed)
  }

  if (filter === 'incompleted') {
    return entities.filter(ent => !ent.completed)
  }

  return entities
}


const filterReducer = (state = 'all', action) => {
  const options = {
    'filter': () => action.payload
  }

  return options[action.type]
    ? options[action.type]()
    : state
}

const todosReducer = (state = [], action) => {
  const options = {
    'add': () => {
      return [
        ...state,
        action.payload
      ]
    },

    'update': () => {
      const newTodos = state.map(entity => {
        if (entity.id === action.payload.id) {
          return {
            ...entity,
            completed: !entity.completed
          }
        }
 
        return entity
      })
 
      return newTodos
    },
  }

  return options[action.type]
    ? options[action.type]()
    : state
}

export const reducer = combineReducers({
  entities: todosReducer,
  filter: filterReducer
})

function App() {
  const dispatch = useDispatch()
  const todos = useSelector(selectTodos)
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim()) return

    const newTodo = {
      id: Math.random().toString(36),
      text: value,
      completed: false,
    }

    dispatch({type: 'add', payload: newTodo})
    setValue('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={({target}) => setValue(target.value)}
          value={value}
        />
      </form>
      <button onClick={() => dispatch({type: 'filter', payload: 'all'})}>Show all</button>
      <button onClick={() => dispatch({type: 'filter', payload: 'completed'})}>Completed</button>
      <button onClick={() => dispatch({type: 'filter', payload: 'incompleted'})}>Incompleted</button>
      <ul>
        {todos.map(t => 
        (
          <li
            style={{textDecoration: t.completed ? 'line-through' : 'none'}}
            onClick={() => dispatch({type: 'update', payload: t})}
            key={t.id}
          >
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
