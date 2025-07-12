

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
          onClick={() => {
          console.log("Color picked", color)
          onPickColor(color)
          onClose()
          }}

        />
      ))}
    </div>
  )
}

