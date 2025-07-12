export function NoteTodos({ info }) {
  return (
    <ul>
      {info.todos.map((todo, idx) => (
        <li key={idx}>{todo.txt}</li>
      ))}
    </ul>
  )
}
