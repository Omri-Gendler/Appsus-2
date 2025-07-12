import { NoteActions } from "../cmps/NoteActions.jsx"
import { AddNoteImg } from "./AddNoteImg.jsx"

const { useState, useEffect } = React

export function NoteEdit({ note, onSave }) {
  const [title, setTitle] = useState('')
  const [txt, setTxt] = useState('')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [isPinned, setIsPinned] = useState(false)
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (note) {
      setTitle(note.info.title || '')
      setTxt(note.info.txt || '')
      setUrl(note.info.url || '')
      setBackgroundColor(note.style.backgroundColor || '#ffffff')
      setIsPinned(note.isPinned || false)
    }
  }, [note])

    function handlePickColor(color) {
    setBackgroundColor(color)
  }

  function handleSave() {
    const updatedNote = {
      ...note,
      isPinned,
      style: {
        ...note.style,
        backgroundColor,
      },
      info: {
        ...note.info,
        title,
        txt,
        url,
      },
    }
    onSave(updatedNote)
  }

  if (!note) return null

  return (
    <div className="note-edit note" 
    style={{ backgroundColor}}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        style={{
          width: '100%',
          fontWeight: 'bold',
          fontSize: '1.2em',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          marginBottom: '10px',
        }}
      />
      {url &&(
        <img src={url} alt="your img" onClick={AddNoteImg}/>
      )}
      <textarea
        value={txt}
        onChange={e => setTxt(e.target.value)}
        placeholder="Take a note..."
        style={{
          width: '100%',
          resize: 'vertical',
          minHeight: '100px',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontSize: '1em',
          lineHeight: '1.4em',
        }}
      />

      <NoteActions
        onColor={handlePickColor}
        isInForm={true}
        edit={true}
        save={handleSave}
      />
    </div>
  )
}
