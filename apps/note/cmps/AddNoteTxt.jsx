
export function AddNoteTxt({ 
  title, 
  setTitle, 
  txt, 
  setTxt, 
  color, 
  titleInputRef 
}) {
  return (
    <div className="note-expanded">
      <input
        ref={titleInputRef}
        type="text"
        placeholder="Title"
        className="note-title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        style={{ backgroundColor: color }}
      />
      <textarea
        placeholder="Take a note..."
        className="note-txt"
        value={txt}
        onChange={(ev) => setTxt(ev.target.value)}
        style={{ backgroundColor: color }}
      />
    </div>
  )
}

