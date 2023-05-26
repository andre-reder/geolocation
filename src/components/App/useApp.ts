import { ChangeEvent, useState } from 'react';
import Papa from 'papaparse';
import hasDesiredKeysAndValues, { AnyObject } from '../../utils/hasDesiredKeysAndValues';
import { toast } from 'react-toastify';
import isValidCoordFromCsv from '../../utils/isValidCoordFromCsv';
import { DataFromCsvMappedType, WorkplaceType } from './types';
import hasDuplicates from '../../utils/hasDuplicatedValueAtArray';
import removeDuplicates from '../../utils/removeDuplicates';
import extractNumbers from '../../utils/extractNumbers';

export default function useApp() {
	const [dataFromCsv, setDataFromCsv] = useState<DataFromCsvMappedType[]>([]);
	const [filteredData, setFilteredData] = useState<DataFromCsvMappedType[]>([]);
	const [selectedWorkplace, setSelectedWorkplace] = useState<WorkplaceType>({ value: '', label: 'Selecione um local de trabalho'} as WorkplaceType);
	const [selectedEmployee, setSelectedEmployee] = useState<{ value: string, label: string }>({ value: '', label: 'Selecione um funcionário'} as { value: string, label: string });
	const [workplacesOptions, setWorkplacesOptions] = useState<WorkplaceType[]>([{
		value: '',
		label: 'Selecione um local de trabalho',
		lat: '',
		lng: '',
		cep: '',
		streetName: '',
		number: '',
	}]);
	const [employeesOptions, setEmployeesOptions] = useState([{
		value: '', label: 'Selecione um funcionário'
	}]);

	function handleSelectedWorkplaceChange(workplace: WorkplaceType) {
		setSelectedWorkplace(workplace);
		setSelectedEmployee({ value: '', label: 'Selecione um funcionário' });
		const employeesAtWorkplace = dataFromCsv.filter((employee) =>(
			employee.workplaceCode === workplace.value
		));
		const mappedEmployeesOptions = employeesAtWorkplace.map((employee) => (
			{
				value: employee.cpf,
				label: `${employee.consultCode} - ${employee.name}`,
			}
		));
		setEmployeesOptions(mappedEmployeesOptions);
		setFilteredData(employeesAtWorkplace);
		console.log({ mappedEmployeesOptions, employeesAtWorkplace });
	}

	function handleSelectedEmployeeChange(employee: { value: string, label: string }) {
		setSelectedEmployee(employee);
		console.log({ employee });
	}

	function downloadCsvModel() {
		const link = document.createElement('a');
		link.href = '/files/Modelo importar dados mapa tendencia.csv';
		link.download = 'Modelo importar dados mapa tendencia';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
		const { files } = e.target;
		if (files) {
			Papa.parse(files[0], {
				header: true,
				complete: (results) => {
					const resultArray: AnyObject[] = results.data as AnyObject[];

					const desiredHeaders = ['CEP_FUNC', 'CEP_LOCAL', 'COD_CONSULTA', 'COD_LOCAL', 'CPF', 'DESCR_LOCAL', 'HR_ENT', 'HR_SAI', 'LAT_FUNC', 'LAT_LOCAL', 'LOGRADOURO_FUNC', 'LOGRADOURO_LOCAL', 'LONG_FUNC', 'LONG_LOCAL', 'NOME', 'NUM_FUNC', 'NUM_LOCAL', 'VT_INFORMADO', 'VT_ROT'];
					const hasDesiredHeadersAndValues = hasDesiredKeysAndValues(resultArray, desiredHeaders);
					const allCoords: string[] = [];
					resultArray.forEach(obj => {
						allCoords.push(obj['LAT_FUNC']);
						allCoords.push(obj['LONG_FUNC']);
						allCoords.push(obj['LAT_LOCAL']);
						allCoords.push(obj['LONG_LOCAL']);
					});
					const areAllCoordsValid = allCoords.every((coord) => isValidCoordFromCsv(coord));
					const onlyCpfs = resultArray.map((index) => index.CPF);
					console.log({ onlyCpfs});

					if (!hasDesiredHeadersAndValues) {
						toast.error('Identificamos que o arquivo enviado não está com os mesmos cabeçalhos do modelo a ser seguido, ou algum campo foi preenchdio em branco');
						return;
					}
					if (!areAllCoordsValid) {
						toast.error('Identificamos que existe alguma coordenada em um formato diferente do modelo');
						return;
					}
					if (hasDuplicates(onlyCpfs)) {
						toast.error('Identificamos uma ou mais duplicidades de CPF no arquivo');
						return;
					}

					const filteredArray = resultArray.filter((index) => !!index.CPF);
					const mappedArray = filteredArray.map((index) => ({
						cpf: index.CPF,
						consultCode: index.COD_CONSULTA,
						name: index.NOME,
						employeeStreetName: index.LOGRADOURO_FUNC,
						employeeNumber: index.NUM_FUNC,
						employeeCep: index.CEP_FUNC,
						employeeLat: index.LAT_FUNC.replaceAll('_', '.'),
						employeeLng: index.LONG_FUNC.replaceAll('_', '.'),
						entryTime: index.HR_ENT,
						exitTime: index.HR_SAI,
						oldValue: extractNumbers(index.VT_INFORMADO.replaceAll(',', '.')),
						newValue: extractNumbers(index.VT_ROT.replaceAll(',', '.')),
						workplaceCode: index.COD_LOCAL,
						workplaceCep: index.CEP_LOCAL,
						workplaceStreetName: index.LOGRADOURO_LOCAL,
						workplaceNumber: index.NUM_LOCAL,
						workplaceName: index.DESCR_LOCAL,
						workplaceLat: index.LAT_LOCAL.replaceAll('_', '.'),
						workplaceLng: index.LONG_LOCAL.replaceAll('_', '.'),
					}));
					const mappedWorkplaces = mappedArray.map((index) => (
						{
							value: index.workplaceCode,
							label: index.workplaceName,
							lat: index.workplaceLat,
							lng: index.workplaceLng,
							cep: index.workplaceCep,
							streetName: index.workplaceStreetName,
							number: index.workplaceNumber,
						}
					));
					setWorkplacesOptions(removeDuplicates(mappedWorkplaces));
					setDataFromCsv(mappedArray);
					console.log({ mappedArray});
					toast.success('Arquivo processado com sucesso!');
				},
				error(error, file) {
					toast.error(`Não foi possível processar este arquivo (${error})`);
					console.log(file);
				},
			});
		}
	}

	return {
		dataFromCsv,
		downloadCsvModel,
		handleFileUpload,
		workplacesOptions,
		filteredData,
		selectedWorkplace,
		selectedEmployee,
		employeesOptions,
		handleSelectedWorkplaceChange,
		handleSelectedEmployeeChange,
	};
}
