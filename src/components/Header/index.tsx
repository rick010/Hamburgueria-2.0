import { MdShoppingCart, MdLogout } from 'react-icons/md';

import SearchForm from './SearchForm';
import { StyledHeader } from './style';
import LogoKenzieBurguer from '../../assets/LogoKenzieBurguer.svg';

import { StyledContainer } from '../../styles/grid';
import { UserContext, UserProvider } from '../../providers/UserContext';
import { useContext } from 'react';
import { CartContext } from '../../providers/CartContext';

export const Header = () => {
  const { userLogout } = useContext(UserContext);
  const { loading, setLoading } = useContext(CartContext);
return(

  <StyledHeader>
    <StyledContainer containerWidth={1300}>
      <div className='flexGrid'>
        <img
          src={LogoKenzieBurguer}
          alt='Kenzie Burguer Logo'
          className='logo'
        />
        <nav className='nav' role='navigation'>
          <SearchForm />
          <div className='buttons'>
            <button
              type='button'
              onClick={() => setLoading(true)}>
              <MdShoppingCart size={28} />
            </button>
            <button type='button' onClick={userLogout}>
              <MdLogout size={28} />
            </button>
          </div>
        </nav>
      </div>
    </StyledContainer>
  </StyledHeader>
)};


