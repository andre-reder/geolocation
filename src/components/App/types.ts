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
