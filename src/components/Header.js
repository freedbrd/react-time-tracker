import Button from './Button';
import {useLocation} from 'react-router-dom';

const Header = ({title, onShow, text}) => {
  const location = useLocation();

  return (
      <header className='header'>
        <h1>{title}</h1>
        {
          location.pathname === '/' &&
          <Button onClick={onShow}
                  color='green'
                  text={text}/>
        }
      </header>
  );
};

Header.defaultProps = {
  title: 'Time Tracker',
  text: 'Add',
};

export default Header;