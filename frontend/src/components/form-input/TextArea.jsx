import './styles.css';

function TextArea(props) {
  const { label, id, value, onChange } = props;
  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} value={value} cols={40} rows={4} onChange={(e) => onChange(e.target.value)} className='input-control' />
    </div>
  )
}

export default TextArea;