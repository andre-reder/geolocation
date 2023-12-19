/* eslint-disable @typescript-eslint/no-explicit-any */
import Papa from 'papaparse';
import { ChangeEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import hasDesiredKeysAndValues from '../../utils/hasDesiredKeysAndValues';
import hasDuplicates from '../../utils/hasDuplicatedValueAtArray';
import { DataAfterCoordsProcessed, DataFromCsvMappedType } from './types';

interface CustomParseResult<T> extends Papa.ParseResult<T> {
  data: T[];
}

export default function useApp() {
	const [isLoading, setIsLoading] = useState(false);
	const [dataFromCsv, setDataFromCsv] = useState<DataAfterCoordsProcessed[]>([]);

	const desiredHeaders = ['NOME', 'LOGRADOURO', 'NUMERO', 'BAIRRO', 'CIDADE', 'UF', 'CEP', 'CPF'];

	function downloadCsvModel() {
		const link = document.createElement('a');
		link.href = '/files/Modelo importar geolocalizacao.csv';
		link.download = 'Modelo importar geolocalizacao';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	function parseFile(file: File):Promise<CustomParseResult<any>> {
		return new Promise((resolve, reject) => {
			const parsedData: any[] = [];

			Papa.parse(file, {
				header: true,
				chunkSize: 5000,
				chunk: (results, parser) => {
					const data: Array<any> = results.data;
					const isLastIndexEmptyCpf = !(data[data.length - 1].CPF);
					if (isLastIndexEmptyCpf) {
						data.pop();
					}

					const hasDesiredHeadersAndValues = hasDesiredKeysAndValues(data, desiredHeaders);
					if (!hasDesiredHeadersAndValues) {
						reject(new Error('Identificamos que o arquivo enviado não está com os mesmos cabeçalhos do modelo a ser seguido, ou algum campo foi preenchdio em branco'));
						parser.abort();
						return;
					}

					const mappedArray = data.map((index) => ({
						name: index.NOME,
						streetName: index.LOGRADOURO,
						district: index.BAIRRO,
						city: index.CIDADE,
						uf: index.UF,
						number: index.NUMERO,
						cep: index.CEP,
					}));
					parsedData.push(...mappedArray);
				},
				complete: () => {
					const onlyNames = [];
					for (let i = 0; i < parsedData.length; i++) {
						const index = parsedData[i];
						onlyNames.push(index.name);
					}
					if (hasDuplicates(onlyNames)) {
						reject(new Error('Identificamos uma ou mais duplicidades de nome no arquivo') );
						return;
					}
					const customResult: CustomParseResult<any> = {
						data: parsedData,
						errors: [],
						meta: {
							delimiter: '',
							linebreak: '',
							aborted: false,
							truncated: false,
							cursor: 0,
						},
					};
					resolve(customResult);
				},
				error: reject,
			});
		});
	}

	async function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
		const { files } = e.target;
		if (files) {
			try {
				setIsLoading(true);
				const results = await toast.promise(parseFile(files[0]), {
					pending: 'Aguarde, estamos carregando este arquivo',
					success: 'Seu arquivo está válido. Agora basta aguardar seu processamento!',
					error: 'Ocorreu um erro ao carregar seu arquivo',
				});
				const resultArray: DataFromCsvMappedType[] = results.data;

				const getCoordsByAddress = async () => {
					try {
						const apiResponse = await fetch('https://geolocation.captamobilidade.com.br/processCoords', {
							method: 'POST',
							headers: {
								'content-type': 'application/json',
							},
							body: JSON.stringify(resultArray)
						});

						const response = await apiResponse.json();
						if (response.status !== 201) {
							throw new Error(response.response?.message ?? 'erro');
						}
						setDataFromCsv(response);
					} catch (error) {
						toast.error(`Não foi possível carregar seu arquivo (${error})`);
					}
				};

				await toast.promise(getCoordsByAddress(), {
					pending: 'Aguarde, estamos carregando este arquivo',
					success: 'Seu arquivo foi carregado. Agora basta visualizar seu mapa da forma que desejar, e baixá-lo!',
					error: 'Ocorreu um erro ao carregar seu arquivo',
				});
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				toast.error(`Não foi possível processar este arquivo (${error})`);
				setDataFromCsv([]);
			}
		}
	}

	const downloadDataAsKml = useCallback(() => {
		const kmlAsString = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
<Document>
	<name>KML - Geolocalização (bonecos)</name>
	<Snippet maxLines="0"></Snippet>
	<description><![CDATA[<style type='text/css'>*{font-family:Verdana,Arial,Helvetica,Sans-Serif;}</style><table style="width: 300px;"><tr><td style="vertical-align: top;">Source</td><td style="width: 100%;">06.00 as 14.20.xlsx</td></tr><tr><td>DateTime</td><td>2023-06-29 13:33:01 UTC <br/></td></tr><tr><td colspan="2" style="vertical-align: top;"><br/>Created with <a target='_blank' href='https://www.earthpoint.us/ExcelToKml.aspx'>Earth Point Excel To KML</a><br/>&copy;2023 Earth Point<br/><br/>For illustration only.&nbsp; User to verify all information. </td></tr></table>]]></description>
	<Style>
		<IconStyle>
			<Icon>
			</Icon>
		</IconStyle>
		<BalloonStyle>
			<text>$[description]</text>
			<textColor>ff000000</textColor>
			<displayMode>default</displayMode>
		</BalloonStyle>
	</Style>
	<gx:balloonVisibility>1</gx:balloonVisibility>
	<StyleMap id="0_0">
		<Pair>
			<key>normal</key>
			<styleUrl>#Normal0_0</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#Highlight0_0</styleUrl>
		</Pair>
	</StyleMap>
	<Style id="Highlight0_0">
		<IconStyle>
			<color>ffffff00</color>
			<Icon>
				<href>http://www.earthpoint.us/Dots/GoogleEarth/WhiteShapes/man.png</href>
			</Icon>
		</IconStyle>
		<BalloonStyle>
			<text>$[description]</text>
		</BalloonStyle>
		<LineStyle>
			<width>3</width>
		</LineStyle>
	</Style>
	<Style id="Normal0_0">
		<IconStyle>
			<color>ffffff00</color>
			<scale>0.9</scale>
			<Icon>
				<href>http://www.earthpoint.us/Dots/GoogleEarth/WhiteShapes/man.png</href>
			</Icon>
		</IconStyle>
		<BalloonStyle>
			<text>$[description]</text>
		</BalloonStyle>
		<LineStyle>
			<width>2</width>
		</LineStyle>
	</Style>
  <Folder>
  <name>Plan1</name>
  ${dataFromCsv.map((data) => `
  <Placemark>
  <name>&lt;b/&gt;</name>
  <Snippet maxLines="0"></Snippet>
  <description>${data.name}</description>
  <LookAt>
    <longitude>${data.lng}</longitude>
    <latitude>${data.lat}</latitude>
    <altitude>0</altitude>
    <heading>0</heading>
    <tilt>0</tilt>
    <range>1000</range>
    <altitudeMode>relativeToGround</altitudeMode>
  </LookAt>
  <styleUrl>#0_0</styleUrl>
  <Style>
    <LabelStyle>
      <color>00000000</color>
    </LabelStyle>
  </Style>
  <ExtendedData>
  </ExtendedData>
  <Point>
    <coordinates>${data.lng},${data.lat},0</coordinates>
  </Point>
  </Placemark>
  `).join('')}</Folder></Document></kml>`;

		const blob = new Blob([kmlAsString], { type: 'application/vnd.google-earth.kml+xml' });

		const blobUrl = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.style.display = 'none';
		a.href = blobUrl;
		a.download = 'KML geolocalizacao (bonecos).kml';

		document.body.appendChild(a);
		a.click();

		document.body.removeChild(a);

		URL.revokeObjectURL(blobUrl);
	}, [dataFromCsv]);

	return {
		dataFromCsv,
		downloadCsvModel,
		handleFileUpload,
		isLoading,
		downloadDataAsKml,
	};
}
