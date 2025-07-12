const {useState,useEffect,useRef} = React
import { ColorPick } from "./ColorPick.jsx"

export function NoteActions({ 
  onDuplicate,
  onPinned, 
  onDelete, 
  onColor, 
  isInForm ,
  isPinned, 
  edit, 
  save,      
  setSelectedType,
  triggerChildFileInput 
}) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const pickerRef = useRef()
  

useEffect(() => {
  function handleClickOutside(ev) {
    if (pickerRef.current && !pickerRef.current.contains(ev.target)) {
      setShowColorPicker(false)
    }
  }

  if (showColorPicker) {
    document.addEventListener("mousedown", handleClickOutside)
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [showColorPicker])


function toggleIsPinned(ev) {
  ev.stopPropagation()
  
  onPinned(!isPinned)
  
}
function toggleColorPicker(ev) {
  ev.stopPropagation()
  console.log("Clicked paint button")
  setShowColorPicker(prev => !prev)
}

  function onDeleteClick(ev) {
    ev.stopPropagation()  
    onDelete()
  }


  function onDuplicateClick(ev) {
    ev.stopPropagation()
    onDuplicate()
  }

  function onSaveClick(ev) {
    ev.stopPropagation()
    save()
  }

  function handlePickColor(color) {
    onColor(color)          
  }

  function onImageNoteClick(ev) {
    ev.stopPropagation()
    setSelectedType('NoteImg')
    if (triggerChildFileInput) triggerChildFileInput()
  }

  return (

    
    <div className="note-actions">

      <button type="button" onClick={toggleColorPicker}>
        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#434343"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z"/></svg>
      </button>

    {showColorPicker && (
      <div className="color-picker-wrapper">
        <div className="color-picker-overlay" onClick={() => setShowColorPicker(false)} />
        <div className="color-picker-modal" ref={pickerRef} onClick={(e) => e.stopPropagation()}>
          <ColorPick
            onPickColor={handlePickColor}
            onClose={() => setShowColorPicker(false)}
          />
        </div>
      </div>
    )}



      {!isInForm && <button onClick={onDuplicateClick}>
        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#434343"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
      </button>}

      {!isInForm &&(
      <button onClick={toggleIsPinned} className="pin-btn">
      {!isPinned ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#434343"><path d="m624-480 96 96v72H516v228l-36 36-36-36v-228H240v-72l96-96v-264h-48v-72h384v72h-48v264Zm-282 96h276l-66-66v-294H408v294l-66 66Zm138 0Z"/></svg>
          
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#434343"><path d="m624-480 96 96v72H516v228l-36 36-36-36v-228H240v-72l96-96v-264h-48v-72h384v72h-48v264Z"/></svg> 
          )}
      </button>)}

            {isInForm && (
        <div className="note-type-selector">
          <button type="button" onClick={onImageNoteClick}>
            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#434343"><path d="M480-480ZM216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h312v72H216v528h528v-312h72v312q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm48-144h432L552-480 444-336l-72-96-108 144Zm408-312v-72h-72v-72h72v-72h72v72h72v72h-72v72h-72Z"/></svg>
          </button>
        </div>
      )}
      
      {isInForm && !edit && <button type="submit" className="submit-btn" >Close</button>}
      {edit && <button onClick={onSaveClick}>Save</button>}
      {!isInForm && <button onClick={onDeleteClick}>
        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#434343"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg></button>}
    </div>
  );
}
