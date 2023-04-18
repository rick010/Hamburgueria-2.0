import { MdClose } from 'react-icons/md';
import CartProductList from './CartProductList';

import { StyledCartModalBox } from './style';
import { StyledParagraph, StyledTitle } from '../../styles/typography';

const CartModal = () => (
  <StyledCartModalBox>
    <dialog>
      <header>
        <StyledTitle tag='h2' $fontSize='three'>
          Carrinho de compras
        </StyledTitle>
        <button
          type='button'
          aria-label='Fechar'
          onClick={() => {
            console.log('Lógica aqui');
          }}
        >
          <MdClose size={21} />
        </button>
      </header>
      <div className='cartBox'>
        <CartProductList />

        <div className='emptyBox'>
          <StyledTitle tag='h3' $fontSize='three' textAlign='center'>
            Sua sacola está vazia
          </StyledTitle>
          <StyledParagraph textAlign='center'>Adicione itens</StyledParagraph>
        </div>
      </div>
    </dialog>
  </StyledCartModalBox>
);

export default CartModal;
