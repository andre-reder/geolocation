import styled from 'styled-components';

interface SecondaryButtonInterface {
  selected: boolean;
}

export const SecondaryButton = styled.button<SecondaryButtonInterface>`
      background: ${({ theme, selected }) => (selected ? '#ccc' : theme.colors.background)};
      text-decoration: none;
      font-weight: bold;
      border: none;
      padding: 0px;
      border-radius: 4px;
      transition: all 0.2s ease-in;
      font-size: 14px;
      margin: 0px;

      &:hover {
        background: ${({ theme, selected }) => (!selected && theme.colors.lighterBackground)};
      }

      img {
        padding: 2px;
        width: 60%;
      }
`;
