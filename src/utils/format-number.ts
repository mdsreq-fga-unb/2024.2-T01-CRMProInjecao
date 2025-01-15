type InputValue = string | number | null;

function getLocaleCode() {
  return {
    code: 'pt-BR',
    currency: 'BRL',
  };
}

// ----------------------------------------------------------------------

export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf === '') return false;

  if (cpf.length !== 11) return false;

  // Elimina CPFs inválidos conhecidos
  if (["00000000000", "11111111111", "22222222222", "33333333333", "44444444444", "55555555555", "66666666666", "77777777777", "88888888888", "99999999999"].includes(cpf)) {
    return false;
  }

  // Valida 1o dígito
  let soma = 0;
  for (let i = 0; i < 9; i += 1) {
    soma += parseInt(cpf.charAt(i), 10) * (10 - i);
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(cpf.charAt(9), 10)) return false;

  // Valida 2o dígito
  soma = 0;
  for (let i = 0; i < 10; i += 1) {
    soma += parseInt(cpf.charAt(i), 10) * (11 - i);
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(cpf.charAt(10), 10)) return false;

  return true;
}



export function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj === '') return false;
  if (cnpj.length !== 14) return false;

  // Elimina CNPJs inválidos conhecidos
  if (["00000000000000", "11111111111111", "22222222222222", "33333333333333", "44444444444444", "55555555555555", "66666666666666", "77777777777777", "88888888888888", "99999999999999"].includes(cnpj)) {
    return false;
  }

  // Valida dígitos verificadores
  let tamanho = cnpj.length - 2;
  let numeros: any = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; (i -= 1)) {
    soma += numeros.charAt(tamanho - i) * pos;
    pos = pos === 2 ? 9 : pos - 1;  // Resetando a posição corretamente após atingir 2
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(0), 10)) {
    return false;
  }

  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; (i -= 1)) {
    soma += numeros.charAt(tamanho - i) * pos;
    pos = pos === 2 ? 9 : pos - 1;  // Resetando a posição corretamente após atingir 2
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(1), 10)) {
    return false;
  }

  return true;
}

export function isValidCpfOrCnpj(cpfOrCnpj: string) {
  const valueInString = cpfOrCnpj.toString();
  if (valueInString.length === 11) {
    return isValidCPF(valueInString);
  }
  if (valueInString.length === 14) {
    return isValidCNPJ(valueInString);
  }
  return false;
}


export function fNumber(inputValue: InputValue) {
  const { code } = getLocaleCode();

  if (!inputValue) return '0';

  const number = Number(inputValue);

  const fm = new Intl.NumberFormat(code, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fCurrency(inputValue: InputValue) {
  const { code, currency } = getLocaleCode();

  if (!inputValue) return '';

  const number = Number(inputValue);

  const fm = new Intl.NumberFormat(code, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fPercent(inputValue: InputValue) {
  const { code } = getLocaleCode();

  if (inputValue == null) return '';

  const number = Number(inputValue) / 100;

  const fm = new Intl.NumberFormat(code, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fShortenNumber(inputValue: InputValue) {
  const { code } = getLocaleCode();

  if (!inputValue) return '0';

  const number = Number(inputValue);

  const fm = new Intl.NumberFormat(code, {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(number);

  return fm.replace(/[A-Z]/g, (match) => match.toLowerCase());
}

// ----------------------------------------------------------------------

export function fData(inputValue: InputValue) {
  if (!inputValue) return '';

  if (inputValue === 0) return '0 Bytes';

  const units = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];

  const decimal = 2;

  const baseValue = 1024;

  const number = Number(inputValue);

  const index = Math.floor(Math.log(number) / Math.log(baseValue));

  const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`;

  return fm;
}

