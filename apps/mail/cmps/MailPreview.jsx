import { LongTxt } from "./LongTxt.jsx"
const { useNavigate } = ReactRouterDOM


export function MailPreview({ mail, onRemoveMail, onUnreadBtn }) {

    const navigate = useNavigate()
    const readClass = mail.isRead ? 'read' : 'unread'

    const handleNavigate = () => {
        navigate(`/mail/${mail.id}`)
    }

    return (
        <div className={`mail ${readClass}`} onClick={handleNavigate}>
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
            <div className="mail-list-btns">
                <button
                    className="delete-btn"
                    onClick={(e) => {
                        e.stopPropagation()
                        onRemoveMail(mail.id)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                </button>

                <button
                    className="unread-btn"
                    onClick={(e) => {
                        e.stopPropagation()
                        onUnreadBtn(mail)
                    }}
                >
                    {mail.isRead ? (
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-720v480-480Z" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h404q-4 20-4 40t4 40H160l320 200 146-91q14 13 30.5 22.5T691-572L480-440 160-640v400h640v-324q23-5 43-14t37-22v360q0 33-23.5 56.5T800-160H160Zm0-560v480-480Zm600 80q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Z" /></svg>
                    )}
                </button>
            </div>
        </div>
    )
} 