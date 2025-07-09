import { NoteActions } from "./NoteActions.jsx";
const {useState} = React
export function NotePreview({ note, onRemoveNote, onUpdateNote }) {
    
  
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

  return (
    <div className={`note`} style={{ backgroundColor: note.style.backgroundColor || "#fff" }}>
      <h1>{note.info.title}</h1>
      <p>{note.info.txt}</p>

      <NoteActions
        onPin={() => {}}
        onDelete={() => onRemoveNote(note.id)}
        onColor={handlePickColor}
        isInForm={false}
       
      />
    </div>
  );
}
