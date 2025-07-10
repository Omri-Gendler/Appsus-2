
const { useState, useRef ,useEffect,} = React
import { makeId } from "../services/util.service.js"
import { NoteActions } from "./NoteActions.jsx"


export function AddNote({onAddNote}){
    const [isExpanded, setIsExpanded] = useState(false)
    const [title, setNoteTitle] = useState('')
    const [txt, setNoteTxt] = useState('')
    const [color, setColor] = useState('#fff') // default note bg color

    
    const containerRef = useRef()
    const titleInputRef = useRef()

    function handlePickColor(color) {
      setColor(color)
      console.log(color)
    }

    function expandNote() {
        setIsExpanded(true)
    }


   function onSubmit(ev){
   ev.stopPropagation()
    if (title || txt){
       const newNote = {
            id: makeId(), 
            createdAt: Date.now(),
            type: 'NoteTxt',
            isPinned: false, 
            style: {
                backgroundColor: color,
            },
            info: {
                title, 
                txt    
            }
          }

        onAddNote(newNote)
    }
    setIsExpanded(false)
    setNoteTitle('')
    setNoteTxt('')
    setColor('#fff')

   }


     useEffect(() => {
    if (isExpanded && titleInputRef.current) {
      titleInputRef.current.focus()
    }
  }, [isExpanded])

  function onEdit() {}
  function onPin() {}
  function onDelete() {}

  return (
    <form
      ref={containerRef}
      className="add-note-container"
      onClick={expandNote}
      onSubmit={onSubmit}
      style={{ backgroundColor: color }}
    >
      {!isExpanded && (
        <input
          type="text"
          placeholder="Take a note..."
          className="note-input collapsed"
          readOnly
          style={{backgroundColor: color}}
        />
      )}

      {isExpanded && (
        <div className="note-expanded"> 
          <input
          ref={titleInputRef}
            type="text"
            placeholder="Title"
            className="note-title"
            value={title}
            onChange={(ev) => setNoteTitle(ev.target.value)}
            style={{ backgroundColor: color }}
          />
          <textarea
            placeholder="Take a note..."
            className="note-txt"
            value={txt}
            onChange={(ev) => setNoteTxt(ev.target.value)}
            style={{ backgroundColor: color }}
          />
         <NoteActions
            onEdit={onEdit}
            onPin={onPin}
            onDelete={onDelete}
            onColor={handlePickColor}
            color={color}
            setColor={setColor}
            isInForm={true}
          />
        </div>
      )}
    </form>
  )

    
}