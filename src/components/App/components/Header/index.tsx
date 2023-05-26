import React, { ChangeEvent, RefObject, useRef } from 'react';
import { ButtonsContainer, Container, LogoContainer } from './styles';

import logo from '../../../../assets/images/logo.svg';
import { SecondaryButton } from '../../../SecondaryButton';

interface HeaderInterface {
  onImportCsv: (event: ChangeEvent<HTMLInputElement>) => void;
  hasData: boolean;
  downloadCsvModel: () => void;
}

export default function Header({
	onImportCsv,
	hasData,
	downloadCsvModel,
}: HeaderInterface) {
	const hiddenFileInput = useRef<HTMLInputElement>();
	const handleClick = () => {
		hiddenFileInput.current?.click();
	};
	return (
		<Container>
			<LogoContainer>
				<img src={logo} alt="Logo" />
				<div>Mapa de tendência</div>
			</LogoContainer>
			<ButtonsContainer>
				<SecondaryButton onClick={downloadCsvModel}>
          Modelo CSV
				</SecondaryButton>
				<SecondaryButton onClick={handleClick}>
					{hasData ? 'Alterar CSV' : 'Importar CSV'}
				</SecondaryButton>
			</ButtonsContainer>

			<input
				type="file"
				ref={hiddenFileInput as RefObject<HTMLInputElement>}
				onChange={onImportCsv}
				style={{ display: 'none' }}
				accept='.csv'
			/>
		</Container>
	);
}
