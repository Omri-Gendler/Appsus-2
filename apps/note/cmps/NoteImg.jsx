
export function NoteImg({ info }) {
  return (
    <div>
      <h3>{info.title}</h3>
      <img src={info.url} alt={info.title} />
      <p>{info.txt}</p>
    </div>
  )
}
