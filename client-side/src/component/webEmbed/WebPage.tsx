import React from 'react';

interface WebPageProps {
    url: string;
}

const WebPage: React.FC<WebPageProps> = ({url}) => {
    return (
        <div style={{height: '100vh', width: '100%'}}>
            <iframe
                src={url}
                title="web-page"
                style={{height: '100vh', width: '100%', border: 'none', overflow: 'hidden'}}
                sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation allow-storage-access-by-user-activation"
            />
        </div>
    );
};

export default WebPage;
