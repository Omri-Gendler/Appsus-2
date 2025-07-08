import { utilService } from '../services/util.service.js'

const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilterBy, mails }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt } = filterByToEdit
    return (
        <section>
            <div className="search-bar-container">
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="black"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>

                <input className="search-input"

                    type="text"
                    name="txt"
                    value={txt}
                    placeHolder="Search"
                    onChange={handleChange}
                />
            </div>

            <select className="isread-filter"

                name="isRead"
                onChange={handleChange}
                defaultValue="all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M480-240 240-480l56-56 144 144v-368h80v368l144-144 56 56-240 240Z" /></svg>

                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
        </section>
    )
}