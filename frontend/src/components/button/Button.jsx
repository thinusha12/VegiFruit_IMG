import './styles.css';

function Button(props) {
  const { onClick, label, disabled } = props;
  return (
    <button onClick={() => onClick()} className='btn-container' disabled={disabled}>
      {label.toUpperCase()}
    </button>
  )
}

export default Button;