import styled from 'styled-components';

export const Container = styled.header`
  margin: 8px;
  margin-top: 4px;
  margin-right: 0;
  margin-left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[201]};
  width: 100%;
`;

export const LogoContainer = styled.header`
  img {
    width: 150px;
    @media(max-width: 600px) {
      width: 140px;
    }

    @media(max-width: 400px) {
      width: 140px;
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  /* margin-right: 16px; */
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary.main};
  padding-left: 124px;
`;
