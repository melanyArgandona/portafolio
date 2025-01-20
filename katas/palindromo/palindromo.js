function esPalindromo(cadena) {
  if (typeof cadena !== 'string') {
    throw new Error('El parametro cadena debe ser de tipo cadena');
  }
  if (cadena.length === 0) {
    throw new Error('El parametro cadena no debe ser vacio');
  }
  const palindromo = cadena.replace(/\s/g, '');
  let inverted = '';
  for (let p = palindromo.length; p >= 0; p--) {
    inverted += palindromo.substring(p, p - 1);
  }
  return palindromo === inverted;
}

export { esPalindromo };
