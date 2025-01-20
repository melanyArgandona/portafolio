import { describe, it, expect } from 'vitest';
import { fizzBuzz } from './fizzbuzz';

describe('fizzbuzz', () => {
  it('deberia botar un error si el valor provisto no es un número', () => {
    expect(() => fizzBuzz()).toThrow();
    expect(() => fizzBuzz(NaN)).toThrow();
    expect(() => fizzBuzz('no es un número')).toThrow();
  });
  it('debería imprimir Fizz para los números divisibles por 3', () => {
    expect(fizzBuzz(3)).toBe('Fizz');
    expect(fizzBuzz(9)).toBe('Fizz');
  });

  it('debería imprimir Buzz para los números divisibles por 5', () => {
    expect(fizzBuzz(5)).toBe('Buzz');
    expect(fizzBuzz(10)).toBe('Buzz');
  });

  it('debería imprimir FizzBuzz para los números divisibles por 3 y 5', () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
    expect(fizzBuzz(30)).toBe('FizzBuzz');
  });

  it('debería imprimir el número para los números no divisibles por 3 ni 5', () => {
    expect(fizzBuzz(2)).toBe('2');
    expect(fizzBuzz(7)).toBe('7');
  });
});
