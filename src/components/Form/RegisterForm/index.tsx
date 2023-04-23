import { Input } from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { useContext, useState } from 'react';
import { UserContext } from '../../../providers/UserContext';
import { TRegisterFormValues, registerFormSchema } from './registerFormSchema';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const { userRegister } = useContext(UserContext);
  const {
     register,
     handleSubmit,
     formState: { errors },
  } = useForm<TRegisterFormValues>({
     resolver: zodResolver(registerFormSchema),
  });

  const submit: SubmitHandler<TRegisterFormValues> = (formData) => {
    console.log(formData);
     userRegister(formData, setLoading);
  };
return(
  <StyledForm onSubmit={handleSubmit(submit)}>
    <Input id='name' type='text' placeholder='Digite seu nome' {...register("name")} disabled={loading} error={errors.name}/>
    <Input id='email' type='email' placeholder='Digite seu email' {...register("email")} disabled={loading} error={errors.email}/>
    <Input id='password' type='password' placeholder='Crie um senha' {...register("password")} disabled={loading} error={errors.password}/>
    <Input id='confirm' type='password' placeholder='Confirme sua senha' {...register("confirm")} disabled={loading} error={errors.confirm}/>
    <StyledButton type="submit" disabled={loading} $buttonSize='default' $buttonStyle='gray'>
      {loading? "Cadastrando..." : "Cadastrar"}
    </StyledButton>
  </StyledForm>
)};


