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

        const mails = [{

            id: 'e101',
            createdAt: new Intl.DateTimeFormat('he-IL').format(1672531200000),
            subject: _longSubject(subject),
            body: makeLorem(400),
            isRead: false,
            sentAt: 1672531205000,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png',
            starred: false
        },
        {
            id: 'e102',
            createdAt: new Intl.DateTimeFormat('he-IL').format(1675209600000),
            subject: _longSubject(subject),
            body: makeLorem(400),
            isRead: true,
            sentAt: 1675209605000,
            removedAt: null,
            from: 'sara@work.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png',
            starred: false
        },
        {
            id: 'e103',
            createdAt: new Intl.DateTimeFormat('he-IL').format(1677628800000),
            subject: _longSubject(subject),
            body: makeLorem(400),
            isRead: false,
            sentAt: 1677628805000,
            removedAt: null,
            from: 'david@friends.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png',
            starred: false
        },
        {
            id: 'e104',
            createdAt: new Intl.DateTimeFormat('he-IL').format(1680307200000),
            subject: _longSubject(subject),
            body: makeLorem(400),
            isRead: false,
            sentAt: 1680307205000,
            removedAt: null,
            from: 'store@shop.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png',
            starred: false
        },
        {
            id: 'e105',
            createdAt: new Intl.DateTimeFormat('he-IL').format(1682899200000),
            subject: _longSubject(subject),
            body: makeLorem(400),
            isRead: true,
            sentAt: 1682899205000,
            removedAt: null,
            from: 'boss@company.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png',
            starred: false
        },
        {
            id: 'e106',
            createdAt: new Intl.DateTimeFormat('he-IL').format(1685577600000),
            subject: _longSubject(subject),
            body: makeLorem(400),
            isRead: false,
            sentAt: 1685577605000,
            removedAt: null,
            from: 'newsletter@news.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png',
            starred: false
        },
        {
            id: 'e107',
            createdAt: new Intl.DateTimeFormat('he-IL').format(1688169600000),
            subject: _longSubject(subject),
            body: makeLorem(400),
            isRead: true,
            sentAt: 1688169605000,
            removedAt: null,
            from: 'airline@flights.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png',
            starred: false
        },
        {
            id: 'e108',
            createdAt: new Intl.DateTimeFormat('he-IL').format(1690848000000),
            subject: _longSubject(subject),
            body: makeLorem(400),
            isRead: false,
            sentAt: 1690848005000,
            removedAt: null,
            from: 'support@service.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png',
            starred: true
        },
        {
            id: 'e109',
            createdAt: new Intl.DateTimeFormat('he-IL').format(1693526400000),
            subject: _longSubject(subject),
            body: makeLorem(400),
            isRead: false,
            sentAt: 1693526405000,
            removedAt: null,
            from: 'hr@company.com',
            to: 'user@appsus.com',
            fromImgUrl: '../img/unnamed.png',
            starred: false
        },
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

function _longSubject(subject, maxWords = 20) {
    if (!subject) return ''
    const words = subject.split(' ')
    if (words.length > maxWords) {
        const truncatedWords = words.slice(0, maxWords)
        return truncatedWords.join(' ') + '...'
    }
    return subject
}