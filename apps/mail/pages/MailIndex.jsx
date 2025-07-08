import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { Link, Route } = ReactRouterDOM
const { useState, useEffect } = React

export function MailIndex({ logo }) {

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter(''))

    useEffect(() => {
        loadMails()

    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(setMails)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                showSuccessMsg('Mail Removed Successfully!')
                setMails((prevMails) =>
                    prevMails.filter(mail => mail.id !== mailId)
                )
            })
            .catch(err => {
                console.log(err)
                showErrorMsg('Problem removing Mail')
            })
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    function onUnreadBtn(mailToUpdate) {
        const updatedMail = { ...mailToUpdate, isRead: !mailToUpdate.isRead }
        const updatedMails = mails.map(mail =>
            mail.id === updatedMail.id ? updatedMail : mail
        )
        mailService.save(updatedMail)
        setMails(updatedMails)
    }

    if (!mails) return <div className="container">Loading...</div>
    return (
        <div className="mail-inbox">

            <aside className="side-bar">

                {logo && (
                    <div className="mail-logo-container">
                        <img src={logo} alt="Section Logo" />
                    </div>
                )}
                <div className="side-bar">
                    <span><Link to='/mail'>Inbox</Link></span>
                    <span><Link to='/starred'>Starred</Link></span>
                    <span><Link to='/snoozed'>Snoozed</Link></span>
                    <span><Link to='/sent'>Sent</Link></span>
                    <span><Link to='/drafts'>Drafts</Link></span>
                </div>
            </aside>
            <main className="mail-main-content">
                {<MailFilter mails={mails} onSetFilterBy={onSetFilterBy} filterBy={filterBy} />}
                {<MailList mails={mails} logo={logo} onRemoveMail={onRemoveMail} onUnreadBtn={onUnreadBtn} />}
            </main>
        </div>
    )
}
