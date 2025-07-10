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
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="black"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" /></svg>                </button>

                <button
                    className="unread-btn"
                    onClick={(e) => {
                        e.stopPropagation()
                        onUnreadBtn(mail)
                    }}
                >
                    {mail.isRead ? (
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="black"><path d="M674-96 539-232l50-51 85 85 187-186 51 50L674-96ZM480-517l312-179H168l312 179Zm0 85L168-611v347h237l72 72H168q-29.7 0-50.85-21.16Q96-234.32 96-264.04v-432.24q0-29.72 21-51.22t51-20.5h624q30 1 51 21.86 21 20.85 21 50.14v208l-72 71v-194L480-432Zm0 0Zm0-85Zm0 84Z" /></svg>) : (
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="black"><path d="M168-288q-30-2-51-22.56Q96-331.13 96-360v-314q0-21 11.5-38.5T138-739l270-125 270 125q14 6 24 17.5t14 25.5H600l-192-89-240 111v386Zm144 144q-29 0-50.5-21.5T240-216v-336q0-29.7 21.5-50.85Q283-624 312-624h480q29 0 50.5 21.15T864-552v336q0 29-21.5 50.5T792-144H312Zm240-192L312-469v253h480v-253L552-336Zm0-83 240-133H312l240 133Zm240-133H312h480Z" /></svg>)}
                </button>
            </div>
        </div>
    )
} 