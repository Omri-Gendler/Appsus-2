
const { useState, useRef ,useEffect,} = React
import { makeId } from "../services/util.service.js"
import { NoteActions } from "./NoteActions.jsx"
import { AddNoteImg } from "./AddNoteImg.jsx"
import { AddNoteTxt } from "./AddNoteTxt.jsx"
import { AddNoteTodos} from "./AddNoteTodos.jsx"
import { NoteTodos } from "./NoteTodos.jsx"



export function AddNote({onAddNote}){
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setNoteTitle] = useState('')
  const [txt, setNoteTxt] = useState('')
  const [url, setUrl] = useState('')
  const [color, setColor] = useState('#fff') 
  const [selectedType, setSelectedType] = useState('')
  

    
    const containerRef = useRef()
    const titleInputRef = useRef()

    function handlePickColor(color) {
      setColor(color)
      console.log(color)
    }

    function expandNote() {
        setIsExpanded(true)
        if (!selectedType) setSelectedType('NoteTxt')
    }



  function onSubmit(ev) {
    ev.preventDefault()
    ev.stopPropagation()

  

    let noteInfo = {}

      if (selectedType === 'NoteTxt') {
        noteInfo = {
          title,
          txt,
        }
      }

      if (selectedType === 'NoteImg') {
        noteInfo = {
          title,
          url,
          txt,
        }
      }

    const newNote = {
      id: makeId(),
      createdAt: Date.now(),
      type: selectedType,
      isPinned: false,
      style: { backgroundColor: color },
      info: noteInfo ,
    }

    onAddNote(newNote)

    setIsExpanded(false)
    setNoteTitle('')
    setNoteTxt('')
    setUrl('')
    setColor('#fff')
  }


function renderNoteInputs() {
  if (!selectedType) return null

  const DynamicCmp = noteTypeCmpMap[selectedType]
  if (!DynamicCmp) return null

  const commonProps = {
    title,
    setTitle: setNoteTitle,
    txt,
    setTxt: setNoteTxt,
    color,
    titleInputRef,
  }

  const specificProps = selectedType === 'NoteImg'
  ? {
      url,
      setUrl,
    }
  : {}
console.log('renderNoteInputs title:', title)


  return (
    <DynamicCmp
      {...commonProps}
      {...specificProps}
    />
  )
}


  useEffect(() => {
    if (isExpanded && titleInputRef.current) {
      titleInputRef.current.focus()
    }
  }, [isExpanded])

  const noteTypeCmpMap = {
  NoteTxt: AddNoteTxt,
  NoteImg: AddNoteImg,
  NoteTodos: AddNoteTodos,
}


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
          onClick={() => setSelectedType('NoteTxt')}
          type="text"
          placeholder="Take a note..."
          className="note-input collapsed"
          readOnly
          style={{ backgroundColor: color }}
        />
      )}

      {isExpanded && (
        <div className="note-expanded">
        {renderNoteInputs()}


            <NoteActions
              onColor={handlePickColor}
              color={color}
              setColor={setColor}
              isInForm={true}
              setSelectedType={setSelectedType}
            />

        </div>
      )}
    </form>
  )
}