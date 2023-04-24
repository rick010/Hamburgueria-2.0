import styled from "styled-components";

export const StyledHeader = styled.header`
  background: ${({ theme }) => theme.colors.gray0};
  .flexGrid {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 20px;

    .logo {
      max-width: 160px;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 20px;

      .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;

        .buttonAmount {
          position: relative;

          .amount {
            position: absolute;
            right: -0.1rem;
            top: -11px;
            width: 1rem;
            height: 1.4rem;
            background-color: ${({ theme }) => theme.colors.primary};
            border-radius: 7px;
            font-weight: 900;
            font-size: 14px;
            line-height: 0px;
            color: ${({ theme }) => theme.colors.gray0};
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        button {
          background: transparent;
          color: ${({ theme }) => theme.colors.gray150};
          transition: 0.3s;

          :hover {
            color: ${({ theme }) => theme.colors.gray300};
          }
        }
      }
    }

    @media (max-width: 600px) {
      flex-direction: column;
    }

    @media (max-width: 450px) {
      .nav {
        flex-direction: column;
      }
    }
  }
`;
