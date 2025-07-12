export function NoteImg({ info }) {
  return (
    <div className="note-img">
      {info.title && <h1>{info.title}</h1>}
      {info.url && <img src={info.url} alt={info.title || 'Note image'} />}
      {info.txt && <p>{info.txt}</p>}
    </div>
  )
}
