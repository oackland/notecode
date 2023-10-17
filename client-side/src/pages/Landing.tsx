import React, {useState} from 'react'
import SideMenu from "../component/SideMenu";
import {Link} from "react-router-dom";
import TwoSectionLayout from "../component/TwoSection.tsx";

const Landing = () => {
            const [isOpen, setIsOpen] = useState(false);
    const title = <h1>Oackland Toro</h1>;
    const content = (
        <p>
            In my capstone project, I navigated the intricate realms of full-stack development, orchestrating a seamless
            alliance between a dynamic React frontend and a robust Flask backend. This journey, marked by relentless
            problem-solving, culminated in an application that's not just a feat of coding, but a multifaceted solution
            echoing user-centric design, agile data handling, and comprehensive API documentation.
            It stands as a testament to my growth as a developer, showcasing a harmonious blend of technology with practical,
            user-driven functionality.
            <span className={'white flex'}><p>Go to site:</p><a className={'white'} id={'LinkToDocs'} href="http://127.0.0.1:5000/">
                                    API Documentation
                                </a></span>
        </p>
    );
    const imageUrl = '/public/img/mainBg.png';
    return (
                <div style={{display: 'MainContent', overflow: 'hidden', height: '100vh'}}>
                    <SideMenu isOpen={isOpen} setIsOpen={setIsOpen}>
                        <br/>
                        <div className={'margin25'}>
                            <p><Link className={'p li ul'} to="/Login">Sign In</Link></p>
                            <p><Link className={'p li ul'} to="Signup">Sign Up</Link></p>
                            <p>
                                <a href="http://127.0.0.1:5000/">
                                    API DOCS
                                </a>
                            </p>
                        </div>
                    </SideMenu>
                    <div className={`MainContent ${isOpen ? 'shifted' : ''}`}>
                        <div className="vh10">
                            <button className={'menu-button'} onClick={() => setIsOpen(!isOpen)}>
                                <svg width="23" height="18" viewBox="0 0 23 18">
                                    <path fill="transparent" strokeWidth="3" stroke="var(--background)"
                                          strokeLinecap="round"
                                          d="M 2 2.5 L 20 2.5" className="top"></path>
                                    <path fill="transparent" strokeWidth="3" stroke="var(--background)"
                                          strokeLinecap="round"
                                          d="M 2 9.423 L 20 9.423" opacity="1" className="middle"></path>
                                    <path fill="transparent" strokeWidth="3" stroke="var(--background)"
                                          strokeLinecap="round"
                                          d="M 2 16.346 L 20 16.346" className="bottom"></path>
                                </svg>
                            </button>
                            <div className={'flex-center flex100'}>
                                <i>ENJOY THE JOURNEY</i>
                            </div>

                        </div>
                        <TwoSectionLayout title={title} content={content} imageUrl={imageUrl}/>
                    </div>

                </div>
    )
}
export default Landing
