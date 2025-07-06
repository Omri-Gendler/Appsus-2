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
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
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
    if (!mails || !mails.length) {

        const mails = [{

            id: 'e101',
            createdAt: 1672531200000, // Jan 1, 2023
            subject: makeLorem(15),
            body: makeLorem(400),
            isRead: false,
            sentAt: 1672531205000,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png'
        },
        {
            id: 'e102',
            createdAt: 1675209600000, // Feb 1, 2023
            subject: makeLorem(15),
            body: makeLorem(400),
            isRead: true,
            sentAt: 1675209605000,
            removedAt: null,
            from: 'sara@work.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png'
        },
        {
            id: 'e103',
            createdAt: 1677628800000, // Mar 1, 2023
            subject: makeLorem(15),
            body: makeLorem(400),
            isRead: false,
            sentAt: 1677628805000,
            removedAt: null,
            from: 'david@friends.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png'
        },
        {
            id: 'e104',
            createdAt: 1680307200000, // Apr 1, 2023
            subject: makeLorem(15),
            body: makeLorem(400),
            isRead: false,
            sentAt: 1680307205000,
            removedAt: null,
            from: 'store@shop.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png'
        },
        {
            id: 'e105',
            createdAt: 1682899200000, // May 1, 2023
            subject: makeLorem(15),
            body: makeLorem(400),
            isRead: true,
            sentAt: 1682899205000,
            removedAt: null,
            from: 'boss@company.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png'
        },
        {
            id: 'e106',
            createdAt: 1685577600000, // Jun 1, 2023
            subject: makeLorem(15),
            body: makeLorem(400),
            isRead: false,
            sentAt: 1685577605000,
            removedAt: null,
            from: 'newsletter@news.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png'
        },
        {
            id: 'e107',
            createdAt: 1688169600000, // Jul 1, 2023
            subject: makeLorem(15),
            body: makeLorem(400),
            isRead: true,
            sentAt: 1688169605000,
            removedAt: null,
            from: 'airline@flights.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png'
        },
        {
            id: 'e108',
            createdAt: 1690848000000, // Aug 1, 2023
            subject: makeLorem(15),
            body: makeLorem(400),
            isRead: false,
            sentAt: 1690848005000,
            removedAt: null,
            from: 'support@service.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png'
        },
        {
            id: 'e109',
            createdAt: 1693526400000, // Sep 1, 2023
            subject: makeLorem(15),
            body: makeLorem(400),
            isRead: false,
            sentAt: 1693526405000,
            removedAt: null,
            from: 'hr@company.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png'
        },
        {
            id: 'e110',
            createdAt: 1696118400000, // Oct 1, 2023
            subject: makeLorem(15),
            body: makeLorem(400),
            isRead: true,
            sentAt: 1696118405000,
            removedAt: null,
            from: 'welcome@service.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png'
        }
        ]
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

