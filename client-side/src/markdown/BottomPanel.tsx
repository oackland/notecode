import React, {CSSProperties, useState} from 'react';
import SvgToggleButton from "./SvgToggleButton.tsx";

interface BottomPanelProps {
    children: React.ReactNode;
    panelHeight: number,

}

const BottomPanel: React.FC<BottomPanelProps> = ({children}) => {
    const [currentPanelHeight, setPanelHeight] = useState(-150);

    const handleTogglePanel = () => {
        setPanelHeight(prevHeight => prevHeight === -150 ? 0 : -150);
    };

    const panelMaxHeight = 150;

    const panelStyles: CSSProperties = {
        position: 'relative',
        display:'inline-flex',

        bottom: 0,
        left: 0,
        right: 0,
        height: `${panelMaxHeight}px`,
        transform: `translateY(${currentPanelHeight}px)`,
        transition: 'transform 0.3s ease-in-out',
        backgroundColor: '#f1f1f1',
        padding: '10px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        borderTop: '1px solid #ccc',
    };

    return (
        <div style={panelStyles}>
            <SvgToggleButton onClick={handleTogglePanel}/>
            <h1>X</h1>

            {children}
        </div>
    );
};

export default BottomPanel;
