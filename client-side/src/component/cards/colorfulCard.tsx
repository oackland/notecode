
import React from 'react';
import '/public/css/Card.css';

interface CardProps {
    title: string;
    quote: string;
    author?: string ;
}


const Card: React.FC<CardProps> = ({title, quote, author}) => {
    return (
        <>
            <div className="morphic-border-wrapper">
                <div className="morphic-card">
            <h2>{title}</h2>
            <p>{quote}</p>
            {author && <p>- {author}</p>}
        </div>
            </div>
        </>
    );
}

export default Card;
