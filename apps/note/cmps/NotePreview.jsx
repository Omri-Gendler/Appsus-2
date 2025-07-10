import { NoteActions } from "./NoteActions.jsx";
const {useState, useEffect} = React


export function NotePreview({ note, onRemoveNote, onUpdateNote }) {
    const [showColorPicker, setShowColorPicker] = useState(false)
  
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


  useEffect(() => {
    function handleClickOutside(ev) {
      if (modalRef.current && !modalRef.current.contains(ev.target)) {
        setShowColorPicker(false);
      }
    }

    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

    function onPinned(newPinnedVal) {
    const updatedNote = {
      ...note,
      isPinned: newPinnedVal,
    }
    onUpdateNote(updatedNote)
  }


  return (
    <div className={`note`} style={{ backgroundColor: note.style.backgroundColor || "#fff" }}>
      <h1>{note.info.title}</h1>
      <p>{note.info.txt}</p>
      

 <NoteActions
        onPinned={onPinned}
        isPinned={note.isPinned}
        onDelete={() => onRemoveNote(note.id)}
        onColor={handlePickColor}
        isInForm={false}
      />

    </div>
  );
}
