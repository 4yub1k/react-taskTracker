import PropTypes from 'prop-types'

const Button = ({ bgcolor, text , onClickbtn}) => {

  return (
    <button 
        onClick={onClickbtn}
        style={{background : bgcolor}}
        className='btn'>{text}
    </button>
  )
}

Button.propTypes = {
    onClickbtn: PropTypes.func// it set type to function only
}

export default Button