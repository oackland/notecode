import React, {FC} from 'react';
import styled from '@emotion/styled';

interface CircleButtonProps {
    onClick: () => void;
    children?: React.ReactNode;
    size?: number;
    backgroundColor?: string;
}

const StyledButton = styled.button<{ size: number, backgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 50%;
  border: none;
  cursor: pointer;
  outline: none;

  &:active {
    transform: scale(0.98);
  }
`;

const CircleButton: FC<CircleButtonProps> = ({
                                                 onClick,
                                                 children,
                                                 size = 50,
                                                 backgroundColor = 'cyan',
                                             }) => {
    return (
        <StyledButton size={size} backgroundColor={backgroundColor} onClick={onClick}>
            {children}
        </StyledButton>
    );
};

export default CircleButton;
