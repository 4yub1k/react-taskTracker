import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title , onAdd, addNewTask}) => {

    const location = useLocation()
  return (
    <header className='header'>
        <h1 >{title}</h1>
        {location.pathname==='/' &&
            (<Button bgcolor={addNewTask ? 'red':'green'}
                text={addNewTask ? 'Close':'Add'} onClickbtn={onAdd}/>
            )
        }
    </header>
  )
}


Header.defaultProps = {
    title:'Task tracker (default)',
}

Header.propTypes = {
    title:PropTypes.string,
}

export default Header
