export function NoteTxt({ info }) {
  console.log('NoteTxt info:', info)
  return (
    <div className="note-txt">
      {info.title && <h2>{info.title}</h2>}
      {info.txt && <p>{info.txt}</p>}
    </div>
  )
}
