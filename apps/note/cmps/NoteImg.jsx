
export function NoteImg({ info }) {
  return (
    <div>
      <img src={info.url} alt={info.title} />
      <h2>{info.title}</h2>
      <p>{info.txt}</p>
    </div>
  )
}
