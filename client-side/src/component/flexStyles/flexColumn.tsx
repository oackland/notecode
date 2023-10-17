import React from 'react';
import '/public/css/flex.css';

interface FlexRowProps {
    topSlot: React.ReactNode;
    bottomSlot: React.ReactNode;
}

const FlexRow: React.FC<FlexRowProps> = ({topSlot, bottomSlot}) => {
    return (
        <div id={'flex'} className={'flex-1'} style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{flex: 1}}>
                {topSlot}
            </div>
            <div style={{flex: 1}}>
                {bottomSlot}
            </div>
        </div>
    );
};

export default FlexRow;
