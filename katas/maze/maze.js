function solveMaze(maze) {
  // Comprobamos si la entrada y la salida son válidas
  if (
    !isValidEntry(maze, 0, 0) ||
    !isValidExit(maze, maze.length - 1, maze[0].length - 1)
  ) {
    return null;
  }

  // Inicializamos una matriz de visitados para evitar ciclos infinitos
  const visited = new Array(maze.length)
    .fill(false)
    .map(() => new Array(maze[0].length).fill(false));

  // Definimos una función recursiva que busca la salida del laberinto
  function searchExit(row, col) {
    // Comprobamos si hemos llegado a la salida
    if (row === maze.length - 1 && col === maze[0].length - 1) {
      return [[row, col]];
    }

    // Marcamos la celda actual como visitada
    visited[row][col] = true;

    // Buscamos en las cuatro direcciones posibles
    const directions = [
      [row + 1, col], // Abajo como prioridad
      [row, col + 1], // Derecha como prioridad
      [row - 1, col], // Arriba
      [row, col - 1] // Izquierda
    ];

    for (let i = 0; i < directions.length; i++) {
      const [nextRow, nextCol] = directions[i];

      // Comprobamos si la siguiente celda es válida y no está visitada
      if (isValidCell(maze, nextRow, nextCol) && !visited[nextRow][nextCol]) {
        const path = searchExit(nextRow, nextCol);
        // Si encontramos una solución, la añadimos a la ruta y la devolvemos
        if (path) {
          return [[row, col], ...path];
        }
      }
    }

    // Si no encontramos una solución, marcamos la celda como no visitada y retrocedemos
    visited[row][col] = false;
    return null;
  }

  // Buscamos la salida desde la celda de entrada
  const path = searchExit(0, 0);

  // Si encontramos una solución, la devolvemos, recordemos que si no hay solucion, path sera null
  return path;
}

// Comprueba si una celda es válida (no está fuera del laberinto y no es una pared)
function isValidCell(maze, row, col) {
  return (
    row >= 0 &&
    row < maze.length &&
    col >= 0 &&
    col < maze[0].length &&
    maze[row][col] !== 1
  );
}

// Comprueba si la entrada es válida (está en la esquina superior izquierda)
function isValidEntry(maze, row, col) {
  return row === 0 && col === 0 && maze[row][col] === 0;
}

// Comprueba si la salida es válida (está en la esquina inferior derecha)
function isValidExit(maze, row, col) {
  return (
    row === maze.length - 1 &&
    col === maze[0].length - 1 &&
    maze[row][col] === 0
  );
}

export { solveMaze };
