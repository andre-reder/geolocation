import React, { ChangeEvent, RefObject, useRef } from 'react';
import { ButtonsContainer, Container, LogoContainer, Title } from './styles';

import logo from '../../../../assets/images/logo.svg';
import { SecondaryButton } from '../../../SecondaryButton';

interface HeaderInterface {
  onImportCsv: (event: ChangeEvent<HTMLInputElement>) => void;
  hasData: boolean;
  downloadCsvModel: () => void;
  downloadKml: () => void;
  isLoading: boolean;
}

export default function Header({
	onImportCsv,
	hasData,
	downloadCsvModel,
	downloadKml,
	isLoading,
}: HeaderInterface) {
	const hiddenFileInput = useRef<HTMLInputElement>();
	const handleClick = () => {
		hiddenFileInput.current?.click();
	};
	return (
		<Container>
			<LogoContainer>
				<img src={logo} alt="Logo" />
			</LogoContainer>
			<Title>Geolocalização</Title>
			<ButtonsContainer>
				<SecondaryButton onClick={downloadCsvModel}>
          Modelo CSV
				</SecondaryButton>
				<SecondaryButton onClick={handleClick} disabled={isLoading}>
					{hasData ? 'Alterar CSV' : 'Importar CSV'}
				</SecondaryButton>
				{hasData && (
					<SecondaryButton onClick={downloadKml} disabled={isLoading}>
						Baixar KML
					</SecondaryButton>
				)}
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
