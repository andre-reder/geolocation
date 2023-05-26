import styled from 'styled-components';

export const Container = styled.header`
  margin: 8px;
  margin-top: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[201]};
  width: 100%;
`;

export const LogoContainer = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-left: 16px;

  img {
    width: 140px;
    @media(max-width: 600px) {
      width: 140px;
    }

    @media(max-width: 400px) {
      width: 140px;
    }
  }

  div {
    /* margin-top: 18px; */
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-right: 16px;
`;
