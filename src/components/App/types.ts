export type DataFromCsvMappedType = {
	name: string;
	streetName: string;
  district: string;
  city: string;
  uf: string;
  number: string;
  cep: string;
};

export type DataFromCsvType = {
  NOME: string;
  LOGRADOURO: string;
  BAIRRO: string;
  CIDADE: string;
  UF: string;
  NUMERO: string;
  CEP: string;
}

export type DataAfterCoordsProcessed = {
  name: string;
  lat: string;
  lng: string;
}
