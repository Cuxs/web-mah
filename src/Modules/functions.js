import _ from 'lodash';
import moment from 'moment';

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

export const prepareArraySelect = (array, rowValue, rowLabel) => {
  const newArray = [];
    
  _.each(array, (item) => {
    const objectItem = {};
    objectItem.value = item[rowValue];
    objectItem.label = item[rowLabel];
    newArray.push(objectItem);
  });

  return newArray;
};

export const generateYearArray = () => {
  const yearArray = [];
  const actualYear = moment().format('YYYY');
  yearArray.push({ value: actualYear, label: actualYear });
  for (let i = 1; i < 41; i += 1) {
    const passYears = moment().subtract(i, 'years').format('YYYY');
    yearArray.push({ value: passYears, label: passYears });
  }
  return yearArray;
};

export const generateYearPerModel = (array) => {
  const newArray = [];

  _.each(array, (item) => {
    if (item.precio !== 0) {
      const objectItem = {};
      objectItem.value = item.anio;
      objectItem.label = item.anio;
      newArray.push(objectItem);
    }
  });

  return newArray;
}
export const validate = (type) => {
  switch (type) {
    case 'text':
      return {
        required: { errorMessage: 'Este campo es requerido' },
      };
    case 'password':
      return {
        // pattern: { value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/, errorMessage: 'Ingresa una combinación de al menos seis números, letras y mayúscula.' },
        pattern: { value: /^.{6,}$/, errorMessage: 'Ingresa una combinación de al menos seis números, letras y mayúscula.' },
        required: { errorMessage: 'Este campo es requerido' },
      };
    case 'confirmPass':
      return {
        match: { value: 'contraseña' },
        required: { errorMessage: 'Este campo es requerido' },
      };
    case 'date':
      return {
        datetime: true,
        required: { errorMessage: 'Este campo es requerido' },
      };
    case 'number':
      return {
        min: { value: 0, errorMessage: 'El número debe ser mayor a cero'},
        pattern: {
          value: "[0-9]+",
          errorMessage: "Ingrese solo números."
        },
        required: { errorMessage: 'Este campo es requerido' },
      };
    case 'email':
      return {
        email: { value: true, errorMessage: 'El email es inválido' },
        required: { errorMessage: 'Este campo es requerido' },
      };
    case 'string':
      return {
        pattern: {  value: "[a-zA-Z]+", errorMessage:'Ingrese solo letras'},
        required: { errorMessage: 'Este campo es requerido' },
      };
    default:
      return {
        required: true,
      };
  }
};