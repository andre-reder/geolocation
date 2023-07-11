export type DataFromCsvMappedType = {
  cpf: string;
	consultCode: string;
	name: string;
	employeeStreetName: string;
	employeeNumber: string;
	employeeCep: string;
	employeeLat: string;
	employeeLng: string;
	entryTime: string;
	exitTime: string;
	oldValue: string;
	newValue: string;
	workplaceCode: string;
	workplaceCep: string;
	workplaceStreetName: string;
	workplaceNumber: string;
	workplaceName: string;
	workplaceLat: string;
	workplaceLng: string;
};

export type WorkplaceType = {
  value: string,
  label: string,
  lat: string,
  lng: string,
  cep: string,
  streetName: string,
  number: string,
}

export type DataFromCsvType = {
  CPF: string,
  COD_CONSULTA: string,
  NOME: string,
  LOGRADOURO_FUNC: string,
  NUM_FUNC: string,
  CEP_FUNC: string,
  LAT_FUNC: string,
  LONG_FUNC: string,
  HR_ENT: string,
  HR_SAI: string,
  VT_INFORMADO: string,
  VT_ROT: string,
  COD_LOCAL: string,
  CEP_LOCAL: string,
  LOGRADOURO_LOCAL: string,
  NUM_LOCAL: string,
  DESCR_LOCAL: string,
  LAT_LOCAL: string,
  LONG_LOCAL: string
}
