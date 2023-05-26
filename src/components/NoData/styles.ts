import styled from 'styled-components';

interface NoDataContainerInterface {
  timetable?: boolean;
}

export const NoDataContainer = styled.div<NoDataContainerInterface>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ timetable }) => !timetable && '16px'};
  margin-top: ${({ timetable }) => (timetable ? '8px' : '16px')};
  width: 100%;

  span {
    margin-top: ${({ timetable }) => !timetable && '16px'};
    font-size: ${({ timetable }) => !timetable && '14px'};
    text-align: center;
    max-width: 500px;
    width: 100%;
    color: ${({ theme }) => theme.colors.gray[200]};

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
      font-size: inherit;
    }

    button {
      color: ${({ theme }) => theme.colors.primary.main};
      text-decoration: none;
      font-weight: bold;
      border: 2px solid ${({ theme }) => theme.colors.primary.main};
      padding: 8px 16px;
      border-radius: 4px;
      transition: all 0.2s ease-in;
      background: ${({ theme }) => theme.colors.background};
      display: block;
      width: 100%;
      margin-top: 8px;

      &:hover {
        background: ${({ theme }) => theme.colors.primary.main};
        color: ${({ theme }) => theme.colors.lighterBackground};
      }
    }

    img {
      width: 24px;
    }
  }
`;
