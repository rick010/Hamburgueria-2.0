import styled from "styled-components";
import { AnimationFadeIn } from "../../styles/animations";

export const StyledCartModalBox = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;

  background: rgba(51, 51, 51, 0.5);
  z-index: 1001;
.show{
  display: flex;
}
.hidden{
  display: none;
}
  dialog {
    animation: ${AnimationFadeIn} 0.5s;
    width: 100%;
    max-width: 500px;
    background: ${({ theme }) => theme.colors.white};
    margin-top: 5rem;
    
    header {
      display: flex;
      background: ${({ theme }) => theme.colors.primary};
      padding: 12px 20px;

      h2 {
        color: ${({ theme }) => theme.colors.white};
      }

      button {
        background: transparent;
        color: ${({ theme }) => theme.colors.white};
        opacity: 0.5;
        transition: 0.4s;

        :hover {
          opacity: 1;
        }
      }
    }

    .cartBox {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px;
      
      @media (max-width: 450px) {
        padding: 15px;
      }
    }
  }
`;
