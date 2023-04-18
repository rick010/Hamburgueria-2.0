import CartProductCard from './CartProductCard';

import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';

const CartProductList = () => (
  <StyledCartProductList>
    <ul>
      <CartProductCard />
    </ul>

    <div className='totalBox'>
      <StyledParagraph>
        <strong>Total</strong>
      </StyledParagraph>
      <StyledParagraph className='total'>R$ 14,00</StyledParagraph>
    </div>
    <StyledButton $buttonSize='default' $buttonStyle='gray'>
      Remover todos
    </StyledButton>
  </StyledCartProductList>
);

export default CartProductList;
