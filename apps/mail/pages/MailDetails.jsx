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
                <div className="side-bar">
                    <span><Link to='/mail'>Inbox</Link></span>
                    <span><Link to='/starred'>Starred</Link></span>
                    <span><Link to='/snoozed'>Snoozed</Link></span>
                    <span><Link to='/sent'>Sent</Link></span>
                    <span><Link to='/drafts'>Drafts</Link></span>
                </div>
            </aside>

            <section className="mail-main-content">

                <header className="mail-header">
                    
                    <button onClick={onBack} className="fa-solid fa-arrow-left"></button>
                        <button><Link className="fa-solid fa-backward"
                            to={`/mail/${mail.prevMailId}`}></Link></button>

                        <button><Link className="fa-solid fa-forward"
                            to={`/mail/${mail.nextMailId}`}></Link></button>

                </header>

                <h1>{mail.subject}</h1>
                <p><strong>From:</strong> {mail.from}</p>

                <p>{mail.body}</p>

            </section>
        </section >
    )
}
