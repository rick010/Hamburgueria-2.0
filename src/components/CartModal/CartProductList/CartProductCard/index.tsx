import { MdDelete } from 'react-icons/md';

import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';

const CartProductCard = () => (
  <StyledCartProductCard>
    <div className='imageBox'>
      <img src='https://i.imgur.com/Vng6VzV.png' alt='Hamburguer' />
    </div>
    <div className='contentBox'>
      <StyledTitle tag='h3' $fontSize='three'>
        Hamburguer
      </StyledTitle>
      <button type='button' aria-label='Remover'>
        <MdDelete size={24} />
      </button>
    </div>
  </StyledCartProductCard>
);

export default CartProductCard;
