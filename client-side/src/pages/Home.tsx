import  { useState} from 'react';
import {Link} from "react-router-dom";
import '/public/css/style.css';
import SideMenu from '../component/SideMenu';
import {useWeather} from "../context/WeatherContext";
import SignOutButton from "../context/SignOut.tsx";
import CustomRow from "../component/CustomRow.tsx";
import MarkdownEditor from "../markdown/MarkdownEditor.tsx";
import PriceTracker from "../component/priceTracker/PriceTracker.tsx";
import * as React from "react";


    const Home: React.FC = () => {
        const [isOpen, setIsOpen] = useState(false);
        const {weatherData, loading, error} = useWeather();



        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;


        return (
            <div style={{display: 'flex', overflow: 'hidden', height: '100vh'}}>
                <SideMenu isOpen={isOpen} setIsOpen={setIsOpen}>
                    <p><Link className={'p li ul'} to="/">Home</Link></p>
                    <p><Link className={'p li ul'} to="/Landing">Landing</Link></p>
                    <SignOutButton/>

                </SideMenu>

                <div className={`MainContent ${isOpen ? 'shifted' : ''}`}>
                    <div className="vh10 padding-20">
                        <button className={'menu-button'} onClick={() => setIsOpen(!isOpen)}>
                            <svg width="23" height="23" viewBox="0 0 23 18">
                                <path fill="transparent" strokeWidth="5" stroke="var(--background)"
                                      strokeLinecap="round"
                                      d="M 2 2.5 L 20 2.5" className="top"></path>
                                <path fill="transparent" strokeWidth="5" stroke="var(--background)"
                                      strokeLinecap="round"
                                      d="M 2 9.423 L 20 9.423" opacity="3" className="middle"></path>
                                <path fill="transparent" strokeWidth="5" stroke="var(--background)"
                                      strokeLinecap="round"
                                      d="M 2 16.346 L 20 16.346" className="bottom"></path>
                            </svg>
                        </button>
                        <i>CAPSTONE</i>
                        <div className={'flex '}>
                            <img src={`https://openweathermap.org/img/w/${weatherData?.icon}.png`} alt="Weather Icon"/>
                            <i className={'white flex'}>{weatherData?.temperature_celsius.toFixed(2)}°C
                                / {weatherData?.temperature_fahrenheit.toFixed(2)}°F</i>
                        </div>

                    </div>
                    <div>
                        <CustomRow />
                    </div>
                    <section className="flex-row">
                        <div className={'max-width250 padding-21'}>
                            <h1 className={'pink'}>Weather Information</h1>
                            <p className={'weather-info'}>Weather: {weatherData?.weather}</p>
                            <p className={'weather-info white'}>Pressure: {weatherData?.pressure_in_bar} hPa</p>
                            <p className={'weather-info white'}>Wind Speed: {weatherData?.wind} m/s</p>
                            <p className={'weather-info white'}>Sunrise: {new Date((weatherData?.sunrise ?? 0) * 1000).toLocaleTimeString()}</p>
                            <p className={'weather-info white'}>Sunset: {new Date((weatherData?.sunset ?? 0) * 1000).toLocaleTimeString()}</p>
                            <p className={'weather-info white'}>High for the day: {weatherData?.temp_high_for_day}°C</p>
                            <p className={'weather-info white margin-bottom'}>Low for the
                                day: {weatherData?.temp_low_for_day}°C</p>
                        </div>
                        <div><PriceTracker/></div>
                    </section>
                    <div>
                        <hr/>
                        <h1 className={'flex-center'}>Interactive Markdown Editor</h1>
                        <MarkdownEditor/>


                    </div>

                </div>
            </div>
        );
    }
export default Home;
