import React, { MouseEvent } from 'react';

interface CommonBtnProps {
  buttonText: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const CommonBtn: React.FC<CommonBtnProps> = ({ buttonText, onClick }) => {
  return (
    <button className="your-button-styles" onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default CommonBtn;