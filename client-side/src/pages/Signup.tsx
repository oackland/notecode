import React, {useState} from 'react';
import axios, {AxiosError} from 'axios';
import {Link, useNavigate} from 'react-router-dom';

interface ResponseData {
    message: string;
}

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post<ResponseData>('/server/api/register', {
                username,
                email,
                password
            });

            setMessage(response.data.message);

            navigate("/login")
        } catch (error) {
            const axiosError = error as AxiosError<ResponseData>;
            if (axiosError.response && axiosError.response.data) {
                setMessage(axiosError.response.data.message || 'An error occurred');
            } else {
                setMessage('An error occurred while signing up');
            }
        }
    }

    return (
        <section className={'login-form'}>
            <div className={'morphic-glass'}>
                <div className="morphic-glass-content">
                    <h2 className={'form-title'}>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input className={'formInput'} placeholder={'Enter your Username'}  type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input className={'formInput'} placeholder={'Enter your Email'} type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div>
                    <label  htmlFor="password">Password:</label>
                    <input  type="password" id="password" value={password} placeholder={'Enter your Password'}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type="submit">Sign Up</button>
                <p className={'finePrint'}>Already have an account <span><Link to={'/Login'}>Login</Link></span></p>
                <br/>
                <div className="separator">
                    <hr className="line"/>
                    <span><Link to={'/'}>GO HOME</Link></span>
                    <hr className="line"/>
                </div>
            </form>
            {message && <div>{message}</div>}
        </div>
            </div>
        </section>
    );
}

export default Signup;
