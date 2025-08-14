import './button.css';

export const Button = ({ children, onClick, hVariant, disabled = false }) => {
  const buttonClass = `btn ${hVariant}`;
  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}