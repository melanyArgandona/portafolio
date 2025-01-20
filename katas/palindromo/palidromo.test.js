import { describe, it, expect } from 'vitest';
import { esPalindromo } from './palindromo';

describe('esPalindromo', () => {
  it('deberia botar un error si el valor provisto no es cadena', () => {
    expect(() => esPalindromo()).toThrow();
    expect(() => esPalindromo(NaN)).toThrow();
    expect(() => esPalindromo({})).toThrow();
  });
  it('deberia botar un error si el valor provisto es vacio', () => {
    expect(() => esPalindromo('')).toThrow();
    expect(() => esPalindromo(String())).toThrow();
  });
  it('debería devolver true para los palíndromos', () => {
    expect(esPalindromo('reconocer')).toBe(true);
    expect(esPalindromo('anita lava la tina')).toBe(true);
  });

  it('debería devolver false para las cadenas que no son palíndromos', () => {
    expect(esPalindromo('hola mundo')).toBe(false);
    expect(esPalindromo('javascript')).toBe(false);
  });
});
