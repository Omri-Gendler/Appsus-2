import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onRemoveMail, onUnreadBtn, onStarredBtn }) {

    if (!mails || mails.length === 0) {
        return <div className="no-emails">No emails to show</div>
    }
    return (
        <div className="mail-list-container">
            <ul className="mail-list">
                {mails.map(mail => (
                    < MailPreview
                        key={mail.id}
                        mail={mail}
                        onRemoveMail={onRemoveMail}
                        onUnreadBtn={onUnreadBtn}
                        onStarredBtn={onStarredBtn}
                    />
                ))}
            </ul>
        </div>
    )
}
