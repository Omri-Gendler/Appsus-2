const { Link, NavLink, useLocation } = ReactRouterDOM

const mailLogo = './img/logo.png'
const keepLogo = './img/keep-logo.webp'
const defaultLogo = './img/app-logo.webp'

export function AppHeader() {
    const location = useLocation()
    // const isMailSection = location.pathname.startsWith('/mail')

    function getLogoImg() {
        let resImg = ''
        if (location.pathname.startsWith('/mail')) {
            resImg = mailLogo
        } else if (location.pathname.startsWith('/note')) {
            resImg = keepLogo
        } else {
            resImg = defaultLogo
        }
        return resImg
        // location.pathname.startsWith('/mail')
    }
    const currentLogo = getLogoImg()
    // const currentLogo = isMailSection ? mailLogo : defaultLogo



    return (
        <header className="app-header">
            <Link to="/">
                <img src={currentLogo} alt="App Logo" className="header-logo" />
            </Link>


            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
            </nav>
        </header>
    )
}
