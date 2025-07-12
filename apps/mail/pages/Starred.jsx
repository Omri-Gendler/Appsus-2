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
            console.log('Starred mails loaded:', starredMails)
            console.log('Starred mails loaded:', starredMails)
            .catch(err => {
                console.log('Error loading starred mails:', err)
            })
    }

    if (!starredMails) return <div className="container">Loading...</div>

    return (
        <div className="starred-starredMails">
            <h2>Starred Mails</h2>
            <div className="side-bar">
                <span><NavLink to='/mail'>Inbox</NavLink></span>
                <span><NavLink to='starred'>Starred</NavLink></span>
                <span><NavLink to='/mail/snoozed'>Snoozed</NavLink></span>
                <span><NavLink to='/mail/sent'>Sent</NavLink></span>
                <span><NavLink to='/mail/drafts'>Drafts</NavLink></span>
            </div>

            <ul>
                {starredMails.map(mail => (
                    <li key={mail.id}>
                        <h3>{mail.subject}</h3>
                        <p>{mail.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}