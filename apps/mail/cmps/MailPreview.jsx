import { LongTxt } from "./LongTxt.jsx"
const { useNavigate } = ReactRouterDOM


export function MailPreview({ mail, onRemoveMail }) {

    const navigate = useNavigate()
    const readClass = mail.isRead ? 'read' : 'unread'

    const handleNavigate = () => {
        navigate(`/mail/${mail.id}`)
    }

    function onMailClicked(mail) {
        console.log(mail)
    }

    return (
        <div className={`mail ${readClass}`} onClick={handleNavigate}>
            {/* <LongTxt txt={mail.subject} /> */}
            <div className="mail-status">
                {!mail.isRead && <span className="unread-dot">●</span>}
            </div>

            <p className="mail-from">
                {mail.from}
            </p>

            <p className="mail-subject">
                {mail.subject}
            </p>

            <p className="mail-created">
                {mail.createdAt}
            </p>
            <div>
                <button
                    className="delete-btn"
                    onClick={(e) => {
                        e.stopPropagation()
                        onRemoveMail(mail.id)
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    )
} 