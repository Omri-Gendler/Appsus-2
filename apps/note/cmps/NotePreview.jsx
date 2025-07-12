import { NoteActions } from "./NoteActions.jsx";
const {useState, useEffect , useRef} = React
import { DynamicCmp } from "./DynamicCmp.jsx"


export function NotePreview({ note, onRemoveNote, onUpdateNote ,onSelectNote}) {

    const colorPickerRef = useRef()

    function handlePickColor(pickedColor) {
    const updatedNote = {
      ...note,
      style: {
        ...note.style,
        backgroundColor: pickedColor,
      },
    };
    onUpdateNote(updatedNote)
  }


    function onPinned(newPinnedVal) {
    const updatedNote = {
      ...note,
      isPinned: newPinnedVal,
    }
    onUpdateNote(updatedNote)
  }

  function handleClick(ev) {
    ev.stopPropagation()
    
    console.log('click')
    onSelectNote(note) 
  }

  return (
    <div 
    className={`note`} 
    onClick={handleClick}
    style={{ backgroundColor: note.style.backgroundColor || "#fff" }}
    ref={colorPickerRef}
    >
    <DynamicCmp
    info={note.info}
    type={note.type}/>
      

 <NoteActions
        onPinned={onPinned}
        isPinned={note.isPinned}
        onDelete={() => onRemoveNote(note.id)}
        onColor={handlePickColor}
        isInForm={false}
      />

    </div>
  )
}

