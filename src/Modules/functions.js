export const thousands = (number, decimals, decPoint, thousandsSep) => {
  decimals = decimals || 0;
  number = parseFloat(number);

  if (!decPoint || !thousandsSep) {
    decPoint = '.';
    thousandsSep = ',';
  }

  const roundedNumber = `${Math.round(Math.abs(number) * (`1e${decimals}`))}`;
  let numbersString = decimals ? roundedNumber.slice(0, decimals * -1) : roundedNumber;
  const decimalsString = decimals ? roundedNumber.slice(decimals * -1) : '';
  let formattedNumber = '';

  while (numbersString.length > 3) {
    formattedNumber += thousandsSep + numbersString.slice(-3);
    numbersString = numbersString.slice(0, -3);
  }

  return (number < 0 ? '-' : '') + numbersString + formattedNumber + (decimalsString ? (decPoint + decimalsString) : '');
};
