import { LoginSignup } from "../pages/LoginSignup.jsx"
import { userService } from "../services/user.service.js"
import { authService } from "../services/auth.service.js"
import { UserMsg } from './UserMsg.jsx'


const { useState } = React
const { NavLink, Link } = ReactRouterDOM
const { useNavigate } = ReactRouter

export function AppHeader({ loggedinUser, setLoggedinUser }) {
    const navigate = useNavigate()

    function onLogout() {
        authService.logout()
            .then(() => {
                setLoggedinUser(null)
                navigate('/bug')
            })
            .catch(err => {
                console.log(err)
                showErrorMsg("Couldn't logout")
            })
    }

    return (

        <header className="app-header main-content single-row">
            <h1>Miss Bug</h1>
            {/* {!loggedinUser && <LoginSignup setLoggedinUser={setLoggedinUser} />} */}
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/bug">Bugs</NavLink>
                <NavLink to="/about">About</NavLink>
                {
                    !loggedinUser ?
                        <NavLink to="/auth">Login</NavLink> :
                        <div className="user">
                            <Link to={`/user/${loggedinUser._id}`}>{loggedinUser.fullname}</Link>
                            <button onClick={onLogout}>Logout</button>
                        </div>
                }
            </nav>
            <UserMsg />
        </header>
    )
}