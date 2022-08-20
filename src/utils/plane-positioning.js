// function produce_points(num) {
//   const points = []
//   let x = 0
//   let y = 0
//   let pace = 1
//   let quad = 0
//   for (let i = 0; i < num; ) {
//     console.log("pace", pace)
//     console.log("quad", quad)
//     switch (quad) {
//       case 1:
//         for (let j = 0; j < pace; j++) {
//           x++
//           y++
//           points.push([x, y])
//           i++
//         }
//         quad++
//         break
//       case 2:
//         for (let j = 0; j < pace; j++) {
//           x--
//           y++
//           points.push([x, y])
//           i++
//         }
//         pace++
//         quad++
//         break
//       case 3:
//         for (let j = 0; j < pace; j++) {
//           x--
//           y--
//           points.push([x, y])
//           i++
//         }
//         quad++
//         break
//       case 4:
//         for (let j = 0; j < pace; j++) {
//           x++
//           y--
//           points.push([x, y])
//           i++
//         }
//         pace++
//         quad = 1
//         break

//       default:
//         points.push([x, y])
//         i++
//         quad++
//         break
//     }
//   }
//   return points
// }

// console.log(produce_points(20))

export const points = [
  [0, 2, 0],
  [1, 1, 1],
  [0, 3, 2],
  [-1, 1, 1],
  [-2, 2, 0],
  [-1, 2, -1],
  [0, 2, -2],
  [1, 3, -1],
  [2, 1, 0],
  [3, 3, 1],
  [2, 1, 2],
  [1, 2, 3],
  [0, 3, 4],
  [-1, 1, 3],
  [-2, 3, 2],
  [-3, 1, 1],
  [-4, 1, 0],
  [-3, 3, -1],
  [-2, 2, -2],
  [-1, 2, -3],
  [0, 1, -4],
]
