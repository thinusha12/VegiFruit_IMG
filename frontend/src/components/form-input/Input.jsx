import './styles.css';

function Input(props) {
  const { label, type, id, value, onChange } = props;
  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={value} onChange={(e) => onChange(e.target.value)} className='input-control' />
    </div>
  )
}

export default Input;