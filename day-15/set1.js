// 👉 What are the possible ways to create objects in JavaScript ? 

const obj1 = new Object()
const obj2 = Object.create({})
const obj3 = { age : 90  }

// 👉 Find unique elements in an array

const arr1 = [1, 7, 8, 1, 90, 7] // 1, 7, 8, 90
console.log(new Set(arr1))

// 👉 What is the purpose of the array slice method ?
// 👉 What is the difference between slice and splice ?
const arr2 = [1, 3, 4, 6, 7, 90]
// console.log(arr2.slice(1))
console.log(arr2.slice(0,3))
console.log(arr2)
console.log(arr2.splice(0, 3))
console.log(arr2)


