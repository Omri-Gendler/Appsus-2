import { MailPreview } from '../cmps/MailPreview.jsx'
import { mailService } from '../services/mail.service.js'

const { useState, useEffect } = React
const { Link, Route, Routes, NavLink } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter



export function Starred() {
    const [starredMails, setStarredMails] = useState(null)

    useEffect(() => {
        loadStarredMails()
    }, [])

    function loadStarredMails() {
        mailService.query({ isStarred: true })
            .then(setStarredMails)
            .catch(err => {
                console.log('Error loading starred mails:', err)
            })
    }

    if (!starredMails) return <div className="container">Loading...</div>

    return (

        <div className="mail-list-container">


            <ul className="mai-list">
                {starredMails.map(mail => (
                    mail.isStarred &&
                    <li key={mail.id}>
                        <h3>{mail.subject}</h3>
                        <p>{mail.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}