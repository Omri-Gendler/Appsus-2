const { useState } = React

export function AddNoteTodos({
  title,
  setTitle,
  txt,
  setTxt,
  color,
  titleInputRef,
}) {
  const [todos, setTodos] = useState([]) 
  const [newTodo, setNewTodo] = useState('')

  function handleAddTodo() {
    if (!newTodo.trim()) return
    const updatedTodos = [...todos, { txt: newTodo, done: false }]
    setTodos(updatedTodos)
    setTxt(JSON.stringify(updatedTodos))
    setNewTodo('')
  }

  function handleRemoveTodo(idx) {
    const updatedTodos = todos.filter((_, i) => i !== idx)
    setTodos(updatedTodos)
    setTxt(JSON.stringify(updatedTodos))
  }

  return (
    <div className="note-expanded">
      <input
        ref={titleInputRef}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="todos-input">
        <input
          type="text"
          placeholder="New todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ backgroundColor: color }}
        />
        <button type="button" onClick={handleAddTodo}>
          Add
        </button>
      </div>

      <ul className="todo-preview-list">
        {todos.map((todo, idx) => (
          <li key={idx}>
            {todo.txt}
            <button
              type="button"
              onClick={() => handleRemoveTodo(idx)}
              style={{ marginLeft: '8px', color: 'red' }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
