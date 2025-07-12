
export function NoteImg({ info }) {
  return (
    <div>
      <h2>{info.title}</h2>
      <img src={info.url} alt={info.title} />
      <p>{info.txt}</p>
    </div>
  )
}
