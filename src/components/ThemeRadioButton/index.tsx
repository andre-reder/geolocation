import { ReactNode } from 'react';
import { SecondaryButton } from './styles';

interface ThemeRadioButtonInterface {
  children: ReactNode;
  onClick: () => void;
  selected: boolean;
}

export default function ThemeRadioButton({
	children, onClick, selected,
}: ThemeRadioButtonInterface) {
	return (
		<SecondaryButton
			onClick={onClick}
			selected={selected}
		>
			{children}
		</SecondaryButton>
	);
}
