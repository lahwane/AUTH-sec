const { useState } = React
const { useNavigate } = ReactRouterDOM

import { authService } from '../services/auth.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function LoginSignup({ setLoggedinUser }) {
    const [isSignup, setIsSignup] = useState(false)
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        fullname: ''
    })

    const navigate = useNavigate()

    function handleChange({ target }) {
        const { name, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [name]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        const action = isSignup ? authService.signup : authService.login

        action(credentials)
            .then(user => {
                setLoggedinUser(user)
                showSuccessMsg(`Welcome ${user.fullname}`)
                navigate('/bug')
            })
            .catch(err => {
                console.log('Auth error:', err)
                showErrorMsg(`Couldn't ${isSignup ? 'signup' : 'login'}`)
            })
    }

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                {isSignup && (
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Full name"
                        value={credentials.fullname}
                        onChange={handleChange}
                        required
                    />
                )}
                <button>{isSignup ? 'Signup' : 'Login'}</button>
            </form>

            <div className="btns">
                <a href="#" onClick={(ev) => {
                    ev.preventDefault()
                    setIsSignup(!isSignup)
                }}>
                    {isSignup ? 'Already a member? Login' : 'New user? Signup here'}
                </a>
            </div>
        </div>
    )
}
