export default function formatCurrency(value: number): string {
	const formattedValue = value.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return formattedValue;
}
