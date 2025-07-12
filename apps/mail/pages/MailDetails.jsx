import { mailService } from "../services/mail.service.js"

const Router = ReactRouterDOM.HashRouter
const { useParams, useNavigate, Link, Route, Routes } = ReactRouterDOM
const { useState, useEffect } = React

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        setIsLoading(true)
        mailService.get(params.mailId)
            .then(mail => setMail(mail))
            .catch(err => {
                console.log('err:', err)
                // navigate('/mail')
            })
            .finally(() => setIsLoading(false))
    }


    function onBack() {
        navigate('/mail')
    }

    if (isLoading) return <div className="loader">Loading...</div>
    if (!mail) return <div>Mail not found!</div>
    return (

        <section className="mail-details-container">

            <aside className="side-bar">
                <span><Link to='/mail'>Inbox</Link></span>
                <span><Link to='/starred'>Starred</Link></span>
                <span><Link to='/snoozed'>Snoozed</Link></span>
                <span><Link to='/sent'>Sent</Link></span>
                <span><Link to='/drafts'>Drafts</Link></span>
            </aside>

            <section className="mail-main-content">

                <header className="mail-header">

                    <button onClick={onBack} className="fa-solid fa-arrow-left"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="m480-336 96-96 96 96 48-48-96-96 96-96-48-48-96 96-96-96-48 48 96 96-96 96 48 48ZM372-192q-16.85 0-31.92-7.5Q325-207 314-221L120-480l194-259q11-14 26.08-21.5Q355.15-768 372-768h420q29.7 0 50.85 21.16Q864-725.68 864-695.96v432.24Q864-234 842.85-213T792-192H372ZM210-480l162 216h420v-432H372L210-480Zm372 0Z" /></svg></button>
                    <button><Link className="fa-solid fa-backward"
                        to={`/mail/${mail.prevMailId}`}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="M576-288 384-480l192-192v384Z" /></svg></Link></button>

                    <button><Link className="fa-solid fa-forward"
                        to={`/mail/${mail.nextMailId}`}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="M384-288v-384l192 192-192 192Z" /></svg></Link></button>

                </header>


                <div className="header-mail-details">
                    <img className="avatar" src={mail.fromImgUrl} alt="Sender Avatar" />
                    <p><strong>From:</strong> {mail.from}</p>

                </div>
                <h1>{mail.subject}</h1>
                <p className="mail-body">{mail.body}</p>

            </section>
        </section >
    )
}
