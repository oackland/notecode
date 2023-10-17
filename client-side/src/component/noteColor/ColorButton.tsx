import React, {FC} from 'react';

interface ColorButtonProps {
    bgColor: string;
    setBgColor: (color: string) => void;
}

const ColorButton: FC<ColorButtonProps> = ({bgColor, setBgColor}) => {
    const colors: string[] = ['red', 'blue', 'green', 'purple', 'black'];

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setBgColor(e.currentTarget.value as string);
    };

    return (
        <div>
            {colors.map((color, index) => (
                <button
                    key={index}
                    onClick={handleClick}
                    value={color}
                    className={`btn btn-${color} ${color === bgColor ? 'btn-active' : ''}`}
                >
                    {color}
                </button>
            ))}
        </div>
    );
};

export default ColorButton;
