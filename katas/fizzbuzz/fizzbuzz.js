function fizzBuzz(numero) {
  if (typeof numero !== 'number' || isNaN(numero)) {
    throw new Error('El parametro número debe ser de tipo número');
  }
  const multiplos = [
    [3, 'Fizz'],
    [5, 'Buzz']
  ];
  let word = '';
  multiplos.forEach(([multiplo, valor]) => {
    if (numero % multiplo === 0) {
      word += valor;
    }
  });
  return word === '' ? `${numero}` : word;
}

export { fizzBuzz };
