import React from 'react';

interface SmallButtonProps {
  content: string;
  onClickEvent: () => void;
  isActive: boolean;
  buttonType?: 'button';
  width?: string;
}

const getButtonStyles = (isActive: boolean): React.CSSProperties => {
  if (isActive) {
    return {
      color: '#FFFFFF',
      width: '74px',
      height: '30px',
      flexShrink: 0,
      borderRadius: '10px',
      background: '#FF6869',
    };
  }

  return {
    color: 'black',
    width: '74px',
    height: '30px',
    flexShrink: 0,
    borderRadius: '10px',
    border: '1px solid #FF6869',
    background: '#FFF',
  };
};

const SmallButton = ({
  content,
  onClickEvent,
  isActive,
  buttonType = 'button',
  width = '15%',
}: SmallButtonProps) => {
  const styles = getButtonStyles(isActive);

  return (
    <button type="button" onClick={onClickEvent} style={{ ...styles, width }}>
      {content}
    </button>
  );
};

export default SmallButton;
