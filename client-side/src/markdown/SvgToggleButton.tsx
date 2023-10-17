import React from 'react';

interface SvgToggleButtonProps {
    onClick: () => void;
}

const SvgToggleButton: React.FC<SvgToggleButtonProps> = ({onClick}) => {
    const svgButtonStyles = {
        cursor: 'pointer',
    };

    return (
        <div style={svgButtonStyles} onClick={onClick}>
            <svg width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor">
                <path d="M7.5 15l-7-7h14l-7 7zm0 0l7-7H.5l7 7z"/>
            </svg>
        </div>
    );
};

export default SvgToggleButton;
