import { useForm, SubmitHandler } from 'react-hook-form';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { Input } from '../Input';
import { TLoginFormValues, loginFormSchema } from './loginFormSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from 'react';
import { UserContext } from '../../../providers/UserContext';


export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { userLogin } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors } } = useForm<TLoginFormValues>({
    resolver: zodResolver(loginFormSchema)
});

const submit: SubmitHandler<TLoginFormValues> = (formData) => {
  userLogin(formData, setLoading);
}
return (
  <StyledForm onSubmit={handleSubmit(submit)}>
    <Input id='email' type="text"{...register("email")} disabled={loading} error={errors.email}/>
    <Input id='senha' type="password"{...register("password")} disabled={loading} error={errors.password}/>
    <StyledButton type="submit" disabled={loading} $buttonSize='default' $buttonStyle='green'>
      Entrar
    </StyledButton>
  </StyledForm>

)
};


