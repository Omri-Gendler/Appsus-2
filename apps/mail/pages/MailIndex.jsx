import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { mailService } from "../services/mail.service.js"
import { MailDetails } from "./MailDetails.jsx"
import { Starred } from "./Starred.jsx"

const { Link, Route, Routes, NavLink, useNavigate } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
const { useState, useEffect } = React


export function MailIndex({ logo }) {

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter(''))
    const navigate = useNavigate()

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

    function onStarredBtn(mailToUpdate) {
        console.log('mailToUpdate:', mailToUpdate.id)
        const updatedMail = { ...mailToUpdate, isStarred: !mailToUpdate.isStarred }
        const updatedMails = mails.map(mail =>
            mail.id === updatedMail.id ? updatedMail : mail
        )
        // console.log('updatedMail:', updatedMail)
        // setMails(updatedMails)

        mailService.save(updatedMail)
            .then(() => {
                setMails(updatedMails)
                console.log('Mail starred status updated:', updatedMail.isStarred)
            })
            .catch(err => {
                console.log('Error updating star status:', err)
            })
    }

    function onUnreadBtn(mailToUpdate) {
        const updatedMail = { ...mailToUpdate, isRead: !mailToUpdate.isRead }
        const updatedMails = mails.map(mail =>
            mail.id === updatedMail.id ? updatedMail : mail
        )
        mailService.save(updatedMail)
            .then()
        setMails(updatedMails)
    }

    function countUnreadMails() {
        return mails.filter(mail => !mail.isRead).length
    }

    function onInbox() {
        navigate('/mail')
    }

    function onStarred() {
        navigate('/mail/starred')
    }

    function onSnoozed() {
        navigate('/mail/snoozed')
    }

    function onSent() {
        navigate('/mail/sent')
    }

    if (!mails) return <div className="container">Loading...</div>
    const countUnreadMail = countUnreadMails()
    console.log('countUnreadMails:', countUnreadMail)
    return (
        <div className="mail-inbox">

            <aside className="side-bar">

                {logo && (
                    <div className="mail-logo-container">
                        <img src={logo} alt="Section Logo" />
                    </div>
                )}
                <div className="side-bar">
                    <div className="inbox-link">
                        <span onClick={onInbox}><NavLink to='inbox'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#black"><path d="M312-312h480v-144H677q-19 32-52 52t-73.47 20Q512-384 479-404t-52-52H312v144Zm239.58-144Q582-456 603-477.15T624-528h168v-264H312v264h168q0 30 21.03 51 21.02 21 50.55 21ZM312-240q-29.7 0-50.85-21.15Q240-282.3 240-312v-480q0-29.7 21.15-50.85Q282.3-864 312-864h480q29.7 0 50.85 21.15Q864-821.7 864-792v480q0 29.7-21.15 50.85Q821.7-240 792-240H312ZM168-96q-29.7 0-50.85-21.15Q96-138.3 96-168v-552h72v552h552v72H168Zm144-216h480-480Z" /></svg> Inbox {countUnreadMail}</NavLink></span>
                    </div>
                    <div className="starred-link">
                        <span onClick={onStarred}><NavLink to='starred'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#black"><path d="m352-293 128-76 129 76-34-144 111-95-147-13-59-137-59 137-147 13 112 95-34 144ZM243-144l63-266L96-589l276-24 108-251 108 252 276 23-210 179 63 266-237-141-237 141Zm237-333Z" /></svg> Starred</NavLink></span>
                    </div>
                    <div className="important-link">
                        <span><NavLink to='snoozed'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#black"><path d="M480-96q-160 0-272-112T96-480h72q0 130 91 221t221 91q130 0 221-91t91-221q0-130-91-221t-221-91q-80 0-150 38T217-648h119v72H108q33-128 136.5-208T480-864q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm100-248L444-480v-192h72v162l115 115-51 51Z" /></svg> Snoozed</NavLink></span>
                    </div>
                    <div className="sent-link">
                        <span><NavLink to='sent'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#black"><path d="M144-192v-576l720 288-720 288Zm72-107 454-181-454-181v109l216 72-216 72v109Zm0 0v-362 362Z" /></svg> Sent</NavLink></span>
                    </div>
                    <div className="drafts-link">
                        <span><NavLink to='drafts'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#black"><path d="M263.72-96Q234-96 213-117.15T192-168v-624q0-29.7 21.15-50.85Q234.3-864 264-864h312l192 192v504q0 29.7-21.16 50.85Q725.68-96 695.96-96H263.72ZM528-624v-168H264v624h432v-456H528ZM264-792v189-189 624-624Z" /></svg> Drafts</NavLink></span>
                    </div>
                </div>
            </aside>
            <main className="mail-main-content">
                {<MailFilter mails={mails} onSetFilterBy={onSetFilterBy} filterBy={filterBy} />}
                <Routes>
                    <Route path="" element={<MailList mails={mails} logo={logo} onStarredBtn={onStarredBtn} onRemoveMail={onRemoveMail} onUnreadBtn={onUnreadBtn} />} />
                    <Route path="starred" element={<Starred />} />
                    <Route path=":mailId" element={<MailDetails />} />
                </Routes>
            </main>


        </div>
    )
}
