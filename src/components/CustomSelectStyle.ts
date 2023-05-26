/* eslint-disable @typescript-eslint/no-explicit-any */
export const CustomStyle = {
	//   container: (provided) => ({
	//     ...provided,
	//     background: 'none',
	//   }),
	//   input: (provided) => ({
	//     ...provided,
	//     background: 'none',
	//   }),
	//
	singleValue: (provided: any) => ({
		...provided,
		background: 'none',
		color: 'inherit',
	}),
	//   groupHeading: (provided) => ({
	//     ...provided,
	//     background: 'none',
	//   }),
	//   group: (provided) => ({
	//     ...provided,
	//     background: 'none',
	//   }),
	//   clearIndicator: (provided) => ({
	//     ...provided,
	//     background: 'none',
	//   }),
	//   indicatorsContainer: (provided) => ({
	//     ...provided,
	//     background: 'none',
	//   }),
	menu: (provided: any) => ({
		...provided,
		zIndex: 1039,
	}),
	menuList: (provided: any) => ({
		...provided,
		background: 'rgba(300, 300, 300, 0.8)',
		zIndex: 1039,
	}),
	menuPortal: (provided: any) => ({
		...provided,
		background: 'none',
		zIndex: 1039,
	}),
	option: (provided: any, state: { isSelected: any; }) => ({
		...provided,
		background: 'none',
		color: state.isSelected && '#000',
		zIndex: 1039,
	}),
	valueContainer: (provided: any) => ({
		...provided,
		background: 'transparent',
		zIndex: 1039,
	}),
	control: (provided: any, state: { isDisabled: any; }) => ({
		...provided,
		background: 'transparent',
		opacity: `${state.isDisabled ? '0.5' : '1'}`,
		cursor: `${state.isDisabled ? 'not-allowed' : 'default'}`,
	}),
	multiValue: (provided: any) => ({
		...provided,
		background: 'unset',
	}),
	multiValueLabel: (provided: any) => ({
		...provided,
		color: 'inherit',
	}),
};
