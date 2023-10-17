import React from "react";

const EmbeddedBrowser: React.FC<{ url: string }> = ({url}) => {
    return (
        <iframe
            src={url}
            width="100%"
            height="500px"
            title="Embedded Browser"
            allowFullScreen
        ></iframe>
    );
};

export default EmbeddedBrowser;
