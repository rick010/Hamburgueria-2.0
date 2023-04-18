import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

const LoginForm = () => (
  <StyledForm>
    <Input id='login' />
    <Input id='senha' />
    <StyledButton $buttonSize='default' $buttonStyle='green'>
      Entrar
    </StyledButton>
  </StyledForm>
);

export default LoginForm;
