import { StyledInputContainer } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';
import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import { FieldError } from "react-hook-form";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement>{
  label?: string;
  error?: FieldError;
}

export const Input = forwardRef(({ id, label, error, ...rest }: IInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  return(
  <div>
    <StyledInputContainer>
      <input id={id} ref={ref} {...rest}  />
      {label? <label htmlFor={id}>{label}</label> : null}
    </StyledInputContainer>
    <StyledParagraph fontColor='red'>{error?.message}</StyledParagraph>
  </div>
  )
});