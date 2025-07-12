import { loadFromStorage, makeId, makeLorem, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const MAIL_KEY = 'mailDB'

_createMails()

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getInboxNumber,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }
            if (filterBy.isRead && filterBy.isRead !== 'all') {
                mails = mails.filter(mail => {
                    if (filterBy.isRead === 'read') return mail.isRead
                    if (filterBy.isRead === 'unread') return !mail.isRead
                })
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(_setNextPrevMailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(subject = '') {
    return { subject }
}

function getDefaultFilter() {
    return { txt: '' }
}

function _createMails() {
    let mails = loadFromStorage(MAIL_KEY)
    const subject = makeLorem(50)
    if (!mails || !mails.length) {

        const mails = [

            {
                id: 'e102',
                createdAt: formatDateToMonthDay(1651133930500),
                subject: 'Project Update',
                body: 'The project is on track for completion next week.',
                isRead: false,
                sentAt: 1651133930594,
                removedAt: null,
                from: 'alice@work.com',
                to: 'user@appsus.com',
                fromImgUrl: './img/unnamed.png',
                isStarred: true
            },
            {
                id: 'e103',
                createdAt: formatDateToMonthDay(1651133930500),
                subject: 'Invitation',
                body: 'You are invited to our annual meetup.',
                isRead: true,
                sentAt: 1621133930594,
                removedAt: null,
                from: 'events@community.org',
                fromImgUrl: './img/unnamed.png',
                isStarred: true,
                to: 'user@appsus.com'
            },
            {
                id: 'e104',
                createdAt: formatDateToMonthDay(1631133930500),
                subject: 'Invoice Attached',
                body: 'Please find the invoice attached for your reference.',
                isRead: false,
                sentAt: 1631133930594,
                removedAt: null,
                from: 'billing@services.com',
                fromImgUrl: './img/unnamed.png',
                isStarred: true,
                to: 'user@appsus.com'
            },
            {
                id: 'e105',
                createdAt: formatDateToMonthDay(1641133930500),
                subject: 'Happy Birthday!',
                body: 'Wishing you a wonderful birthday!',
                isRead: true,
                sentAt: 1641133930594,
                removedAt: null,
                from: 'friends@social.com',
                fromImgUrl: './img/unnamed.png',
                to: 'user@appsus.com',
                isStarred: true
            },
            {
                id: 'e106',
                createdAt: formatDateToMonthDay(1661133930500),
                subject: 'Newsletter June',
                body: 'Check out our latest updates in the June newsletter.',
                isRead: false,
                sentAt: 1661133930594,
                removedAt: null,
                from: 'newsletter@updates.com',
                fromImgUrl: './img/unnamed.png',
                to: 'user@appsus.com',
                isStarred: true
            },
            {
                id: 'e107',
                createdAt: formatDateToMonthDay(1671133930500),
                subject: 'Appointment Confirmation',
                body: 'Your appointment is confirmed for July 15th.',
                isRead: true,
                sentAt: 1671133930594,
                removedAt: null,
                from: 'appointments@clinic.com',
                fromImgUrl: './img/unnamed.png',
                to: 'user@appsus.com',
                isStarred: true
            },
            {
                id: 'e108',
                createdAt: formatDateToMonthDay(1681133930500),
                subject: 'Password Reset',
                body: 'Click the link below to reset your password.',
                isRead: false,
                sentAt: 1681133930594,
                removedAt: null,
                from: 'security@webapp.com',
                fromImgUrl: './img/unnamed.png',
                to: 'user@appsus.com',
                isStarred: true
            },
            {
                id: 'e109',
                createdAt: formatDateToMonthDay(1691133930500),
                subject: 'Welcome!',
                body: 'Welcome to our platform. We are glad to have you.',
                isRead: true,
                sentAt: 1691133930594,
                removedAt: null,
                from: 'support@platform.com',
                fromImgUrl: './img/unnamed.png',
                to: 'user@appsus.com',
                isStarred: true
            },
            {
                id: 'e110',
                createdAt: formatDateToMonthDay(1701133930500),
                subject: 'Order Shipped',
                body: 'Your order has been shipped and is on its way.',
                isRead: false,
                sentAt: 1701133930594,
                removedAt: null,
                from: 'orders@shop.com',
                fromImgUrl: './img/unnamed.png',
                to: 'user@appsus.com',
                isStarred: true
            },
            {
                id: 'e111',
                createdAt: formatDateToMonthDay(1711133930500),
                subject: 'Feedback Request',
                body: 'Please share your feedback about our service.',
                isRead: true,
                sentAt: 1711133930594,
                removedAt: null,
                from: 'feedback@service.com',
                fromImgUrl: './img/unnamed.png',
                to: 'user@appsus.com',
                isStarred: true
            },
            {
                id: 'e112',
                createdAt: formatDateToMonthDay(1721133930500),
                subject: 'Travel Itinerary',
                body: 'Your travel itinerary is attached.',
                isRead: false,
                sentAt: 1721133930594,
                removedAt: null,
                from: 'travel@agency.com',
                fromImgUrl: './img/unnamed.png',
                to: 'user@appsus.com',
                isStarred: true
            },
            {
                id: 'e113',
                createdAt: formatDateToMonthDay(1731133930500),
                subject: 'Payment Received',
                body: 'We have received your payment. Thank you!',
                isRead: true,
                sentAt: 1731133930594,
                removedAt: null,
                from: 'payments@finance.com',
                fromImgUrl: './img/unnamed.png',
                to: 'user@appsus.com',
                isStarred: true
            },
            {
                id: 'e114',
                createdAt: formatDateToMonthDay(1741133930500),
                subject: 'System Alert',
                body: 'There was a login attempt from a new device.',
                isRead: false,
                sentAt: 1741133930594,
                removedAt: null,
                from: 'alerts@system.com',
                fromImgUrl: './img/unnamed.png',
                to: 'user@appsus.com',
                isStarred: true
            },
            {
                id: 'e115',
                createdAt: formatDateToMonthDay(1751133930500),
                subject: 'Weekly Report',
                body: 'Here is your weekly performance report.',
                isRead: true,
                sentAt: 1751133930594,
                removedAt: null,
                from: 'reports@company.com',
                fromImgUrl: './img/unnamed.png',
                to: 'user@appsus.com',
                isStarred: true
            },
            {
                id: 'e116',
                createdAt: formatDateToMonthDay(1761133930500),
                subject: 'Event Reminder',
                body: 'Don\'t forget the event tomorrow at 6 PM.',
                isRead: false,
                sentAt: 1761133930594,
                removedAt: null,
                from: 'reminders@events.com',
                fromImgUrl: './img/unnamed.png',
                to: 'user@appsus.com',
                isStarred: true
            },
            {
                id: 'e117',
                createdAt: formatDateToMonthDay(1771133930500),
                subject: 'Subscription Expiring',
                body: 'Your subscription will expire soon. Renew now!',
                isRead: true,
                sentAt: 1771133930594,
                removedAt: null,
                from: 'subscriptions@service.com',
                fromImgUrl: './img/unnamed.png',
                to: 'user@appsus.com',
                isStarred: true
            },
            {
                id: 'e118',
                createdAt: formatDateToMonthDay(1781133930500),
                subject: 'New Message',
                body: 'You have received a new message in your inbox.',
                isRead: false,
                sentAt: 1781133930594,
                removedAt: null,
                from: 'messenger@chat.com',
                fromImgUrl: './img/unnamed.png',
                to: 'user@appsus.com',
                isStarred: true
            },
            {
                id: 'e119',
                createdAt: formatDateToMonthDay(1791133930500),
                subject: 'Account Verification',
                body: 'Please verify your account by clicking the link.',
                isRead: true,
                sentAt: 1791133930594,
                removedAt: null,
                from: 'verify@accounts.com',
                fromImgUrl: './img/unnamed.png',
                to: 'user@appsus.com',
                isStarred: true
            },
            {
                id: 'e120',
                createdAt: formatDateToMonthDay(1801133930500),
                subject: 'Discount Offer',
                body: 'Enjoy a 20% discount on your next purchase.',
                isRead: false,
                sentAt: 1801133930594,
                removedAt: null,
                from: 'offers@shop.com',
                fromImgUrl: './img/unnamed.png',
                to: 'user@appsus.com',
                isStarred: true
            },
            {
                id: 'e121',
                createdAt: formatDateToMonthDay(1811133930500),
                subject: 'Service Update',
                body: 'Our service will be down for maintenance tonight.',
                isRead: true,
                sentAt: 1811133930594,
                removedAt: null,
                from: 'updates@service.com',
                fromImgUrl: './img/unnamed.png',
                to: 'user@appsus.com',
                isStarred: true
            }]
        saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject) {
    const mail = getEmptyMail(subject)
    mail.id = makeId()
    return mail
}

function _setNextPrevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}

function _longSubject(subject, maxWords = 40) {
    if (!subject) return ''
    const words = subject.split(' ')
    if (words.length > maxWords) {
        const truncatedWords = words.slice(0, maxWords)
        return truncatedWords.join(' ') + '...'
    }
    return subject
}

function formatDateToMonthDay(dateObject) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric'
    })
    return formatter.format(dateObject);
}

function getInboxNumber(mails) {
    console.log('mails:', mails)
    return mails.length
}