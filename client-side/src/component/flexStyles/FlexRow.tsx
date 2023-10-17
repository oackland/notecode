import React from 'react';
import '/public/css/flex.css';
interface FlexRowProps {
    leftSlot: React.ReactNode;
    rightSlot: React.ReactNode;
}

const FlexRow: React.FC<FlexRowProps> = ({leftSlot, rightSlot}) => {
    return (
        <div id={'flex'} className={'flex-1'} style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{flex: 1}}>
                {leftSlot}
            </div>
            <div style={{flex: 1}}>
                {rightSlot}
            </div>
        </div>
    );
};

export default FlexRow;
