import React, {useState} from 'react';
import MarkdownComponent from "./Markdown.tsx";

const Markdown: React.FC = () => {
    const [markdownText] = useState(`
# Markdown Example

This is a simple markdown example.

- List item 1
- List item 2

**Bold text**
`);

    return (
        <div>
            <h1>Markdown Component Demo</h1>

            <MarkdownComponent markdownText={markdownText}/>

        </div>
    );
};

export default Markdown;
