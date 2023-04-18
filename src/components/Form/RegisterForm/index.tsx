import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';

const RegisterForm = () => (
  <StyledForm>
    <Input id='name' />
    <Input id='email' />
    <Input id='passwors' />
    <Input id='confirmPassword' />
    <StyledButton $buttonSize='default' $buttonStyle='gray'>
      Cadastrar
    </StyledButton>
  </StyledForm>
);

export default RegisterForm;
