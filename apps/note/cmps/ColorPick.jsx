// const {useEffect,useState} = React 

// export function ColorPick({ onPickColor }) {
//   console.log("ColorPick rendered!")
//   return (
//     <div className="color-modal-container" style={{ background: 'white', padding: '1em', border: '1px solid black' }}>
//       <div className="circle purple" onClick={() => onPickColor("#d3bfdb")} style={{ background: "#d3bfdb", width: 24, height: 24, borderRadius: "50%", cursor: "pointer" }}></div>
//       <div className="circle pink" onClick={() => onPickColor("#faafa8")} style={{ background: "#faafa8", width: 24, height: 24, borderRadius: "50%", cursor: "pointer" }}></div>
//       <div className="circle peach" onClick={() => onPickColor("#f39f76")} style={{ background: "#f39f76", width: 24, height: 24, borderRadius: "50%", cursor: "pointer" }}></div>
//     </div>
//   )
// }

const { useRef, useEffect } = React

export function ColorPick({ onPickColor, onClose }) {
  const modalRef = useRef()

  useEffect(() => {
    function handleClickOutside(ev) {
      if (modalRef.current && !modalRef.current.contains(ev.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const colors = ['#fff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb']

  return (
    <div className="color-modal" ref={modalRef}>
      {colors.map(color => (
        <button
          key={color}
          className="color-btn circle"
          style={{ backgroundColor: color }}
          onClick={() => onPickColor(color)}
        />
      ))}
    </div>
  )
}

