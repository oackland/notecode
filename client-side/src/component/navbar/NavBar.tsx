import React, {useState} from 'react';
import '/public/css/NavBar.css';

const NavBar: React.FC = () => {
    const [firstDropdown, setFirstDropdown] = useState(false);
    const [secondDropdown, setSecondDropdown] = useState(false);
    const [firstFilter, setFirstFilter] = useState('');
    const [secondFilter, setSecondFilter] = useState('');

    const firstOptions = ['Option 1.1', 'Option 1.2', 'Option 1.3'];
    const secondOptions = ['Option 2.1', 'Option 2.2', 'Option 2.3'];

    const filterOptions = (options: string[], filter: string) =>
        options.filter(option => option.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="nav-bar">
            <button onClick={() => setFirstDropdown(!firstDropdown)}>Dropdown 1</button>
            {firstDropdown && (
                <div className="dropdown-menu">
                    <input value={firstFilter} onChange={e => setFirstFilter(e.target.value)} placeholder="Filter..."/>
                    <ul>
                        {filterOptions(firstOptions, firstFilter).map(option => (
                            <li key={option}>{option}</li>
                        ))}
                    </ul>
                </div>
            )}

            <button onClick={() => setSecondDropdown(!secondDropdown)}>Dropdown 2</button>
            {secondDropdown && (
                <div className="dropdown-menu">
                    <input value={secondFilter} onChange={e => setSecondFilter(e.target.value)}
                           placeholder="Filter..."/>
                    <ul>
                        {filterOptions(secondOptions, secondFilter).map(option => (
                            <li key={option}>{option}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default NavBar;
