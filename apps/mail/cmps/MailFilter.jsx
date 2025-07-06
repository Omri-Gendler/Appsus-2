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
            <div className="mail-filter-container">
                <input
                    type="text"
                    name="txt"
                    value={txt}
                    placeholder="Search mail"
                    onChange={handleChange}
                />
            </div>

            <section className="filter-section">
                <input
                    list="isRead"
                    name="isRead"
                    onChange={handleChange}
                />
                <datalist id="isRead">
                    <option value="all"></option>
                    <option value="read"></option>
                    <option value="unread"></option>
                </datalist>
            </section>

        </section>
    )
}