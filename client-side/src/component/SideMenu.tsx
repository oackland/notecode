import React from 'react';
import '/public/css/style.css';

interface SideMenuProps {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
    children?: React.ReactNode;
}

const SideMenu: React.FC<SideMenuProps> = ({isOpen, setIsOpen, children}) => {
    return (
        <div className={`menu ${isOpen ? 'open' : ''}`}>
            <button className={'menu-button side-menu'} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
                <svg width="23" height="18" viewBox="0 0 23 18">
                    <path fill="transparent" strokeWidth="5" stroke="var(--background)" strokeLinecap="round"
                          d="M 3 16.5 L 17 2.5" className="top"></path>
                    <path fill="transparent" strokeWidth="5" stroke="var(--background)" strokeLinecap="round"
                          d="M 2 9.423 L 20 9.423" opacity="0" className="middle"></path>
                    <path fill="transparent" strokeWidth="5" stroke="var(--background)" strokeLinecap="round"
                          d="M 3 2.5 L 17 16.346" className="bottom"></path>
                </svg>
            </button>
            {children}
        </div>
    );
}

export default SideMenu;
