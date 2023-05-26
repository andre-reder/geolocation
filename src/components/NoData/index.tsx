import { NoDataContainer } from './styles';
import emptyBox from '../../assets/images/icons/emptyBox.svg';
import { ReactNode } from 'react';
import companyInterrogations from '../../assets/images/icons/companyInterrogation.svg';

interface NoDataInterface {
  icon: string;
  label: ReactNode;
}

export default function NoData({ icon, label }: NoDataInterface) {
	return (
		<NoDataContainer>
			{icon === 'emptyBox' && (
				<img src={emptyBox} alt="emptyBox" />
			)}
			{icon === 'workplaceInterrogation' && (
				<img src={companyInterrogations} alt="emptyBox" />
			)}
			<span>{label}</span>
		</NoDataContainer>
	);
}
