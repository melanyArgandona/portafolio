import { describe, it, expect } from 'vitest';
import { solveMaze } from './maze';

describe('solveMaze', () => {
  it('debería devolver la ruta correcta para un laberinto simple', () => {
    const maze = [
      [0, 0, 1],
      [1, 0, 1],
      [1, 0, 0]
    ];
    const expectedPath = [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 2]
    ];
    expect(solveMaze(maze)).toEqual(expectedPath);
  });

  it('debería devolver null si la entrada no es válida', () => {
    const maze = [
      [1, 0, 1],
      [1, 0, 0],
      [0, 0, 0]
    ];
    expect(solveMaze(maze)).toBeNull();
  });

  it('debería devolver null si la salida no es válida', () => {
    const maze = [
      [0, 0, 1],
      [1, 0, 1],
      [0, 0, 1]
    ];
    expect(solveMaze(maze)).toBeNull();
  });

  it('debería devolver null si el laberinto no tiene solución', () => {
    const maze = [
      [0, 1, 0],
      [1, 1, 0],
      [0, 0, 0]
    ];
    expect(solveMaze(maze)).toBeNull();
  });

  it('debería devolver la ruta correcta para un laberinto con solución múltiple', () => {
    const maze = [
      [0, 0, 0, 0],
      [1, 1, 0, 1],
      [0, 0, 0, 0],
      [1, 0, 1, 0]
    ];
    const expectedPath = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 2],
      [2, 3],
      [3, 3]
    ];
    expect(solveMaze(maze)).toEqual(expectedPath);
  });
});
