import React, {FC} from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownComponentProps {
    markdownText: string;
}

const MarkdownComponent: FC<MarkdownComponentProps> = ({markdownText}) => {
    return (
        <div>
            <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>
    );
};

export default MarkdownComponent;
