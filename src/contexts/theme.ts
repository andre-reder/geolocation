import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

export default function useThemeContext() {
	const theme = useContext(ThemeContext);

	const selectedTheme = theme?.colors?.background === '#121212' ? 'dark' : 'default';

	return { theme, selectedTheme };
}
