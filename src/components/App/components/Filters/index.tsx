/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Select from 'react-select';
import { Container } from './styles';
import useThemeContext from '../../../../contexts/theme';
import { CustomStyle } from '../../../CustomSelectStyle';
import { CustomStyle as CustomStyleDarkTheme } from '../../../CustomSelectStyleDarkTheme';
import { WorkplaceType } from '../../types';
import OpacityAnimation from '../../../OpacityAnimation';

interface FiltersInterface {
  workplacesOptions: WorkplaceType[];
  selectedWorkplace: WorkplaceType;
  selectedEmployee: { value: string, label: string };
  employeesOptions: { value: string, label: string }[];
  handleSelectedWorkplaceChange: (workplace: WorkplaceType) => void;
  handleSelectedEmployeeChange: (employee: { value: string, label: string }) => void;
  isSomeWorkplaceSelected: boolean;
}

export default function Filters({
	workplacesOptions,
	selectedWorkplace,
	selectedEmployee,
	employeesOptions,
	handleSelectedWorkplaceChange,
	handleSelectedEmployeeChange,
	isSomeWorkplaceSelected,
}: FiltersInterface) {
	const { selectedTheme } = useThemeContext();

	return (
		<Container>
			<OpacityAnimation delay={0.1}>
				<Select
					value={selectedWorkplace}
					options={workplacesOptions}
					onChange={(workplace) => {
						handleSelectedWorkplaceChange(workplace!);
					}}
					placeholder="Selecione um local de trabalho"
					styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
					menuPortalTarget={document.body}
					classNamePrefix="react-select"
					className="react-select-container-as-filter"
				/>
			</OpacityAnimation>

			{isSomeWorkplaceSelected && (
				<OpacityAnimation delay={0.1}>
					<Select
						value={selectedEmployee}
						options={employeesOptions}
						onChange={(employee) => {
							handleSelectedEmployeeChange(employee!);
						}}
						placeholder="Selecione um funcionário"
						styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
						menuPortalTarget={document.body}
						classNamePrefix="react-select"
						className="react-select-container-as-filter"
					/>
				</OpacityAnimation>
			)}
		</Container>
	);
}
