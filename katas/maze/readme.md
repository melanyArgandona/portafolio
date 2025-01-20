# Kata del laberinto

En esta kata se te da un laberinto en forma de matriz, con una entrada y una salida, y te pide que encuentres una ruta que conecte la entrada con la salida. La ruta solo puede avanzar en las direcciones arriba, abajo, izquierda y derecha, y no puede pasar a través de las paredes del laberinto, una pared esta representada por "unos" y los caminos libres por "ceros". . Aquí está el código inicial:

```js
function solveMaze(maze) {
  // Tu código aquí
}
```

Un ejemplo de como deberia funsionar seria:

```js
const maze = [
  [0, 0, 1],
  [1, 0, 1],
  [1, 0, 0]
]

const solucion = solveMaze(maze)
/* Se espera que solucion sea:
[
  [0, 0],
  [0, 1],
  [1, 1],
  [2, 1],
  [2, 2]
]
Donde cada elemento es un movimiento conformado por [fila, columna]
*/
```

Tu tareas es completar el cuerpo de la funcion, recuerda que si un laberinto no tiene solucion debe retornar "null", lo mismo si el laberinto no es valido (no es valido si no tiene entrada o salida, la entrada y la salida son las esquinas superior izquierda he inferior derecha).
