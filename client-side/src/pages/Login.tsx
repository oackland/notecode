import React, {useState} from 'react';
import axios, {AxiosError} from 'axios';
import '/public/css/style.css'
import {useUser} from "../context/userContext.tsx";
import {Link, useNavigate} from "react-router-dom";

interface LoginResponse {
    access_token: string;
}

const Login: React.FC = () => {
    const [credential, setCredential] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const {login} = useUser();
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post<LoginResponse>('/server/api/login', {
                username: credential,
                password
            });
            if (response.data && 'access_token' in response.data) {
                login(response.data.access_token, credential);
                navigate('/Home');
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response && error.response.data && error.response.data.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('Error logging in.');
                }
            }
        }
    };

    return (
        <section className={'login-form'}>
        <div className={'morphic-glass'}>
            <div className="morphic-glass-content">
            <h2 className={'form-title'}>Login</h2>
                <br/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="credential">Username:</label>
                    <input className={'formInput'} type="text" id="credential" value={credential}
                           onChange={e => setCredential(e.target.value)}/>
                </div><br/>
                <div>
                    <label  htmlFor="password">Password:</label>
                    <input className={'formInput'} type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Login</button>
                <p className={'finePrint'}>Still no have an account? <span><Link to={'/Signup'}>Signup</Link></span></p>
                    <br/>
                <div className="separator">
                    <hr className="line"/>
                    <span><Link to={'/'}>GO HOME</Link></span>
                    <hr className="line"/>
                </div>
            </form>
            {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
            </div>
        </div>
        </section>
    );
};

export default Login;
