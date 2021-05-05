// let ary = [1, [2, [3, [4, 5]]], 6]
// let str = JSON.stringify(ary)

// ES6  flat函数
// let flatAry = ary.flat(Infinity)

// let flatAry = str.replace(/(\[|\])/g,'').split(',')
// console.log(flatAry);

// 普通递归
// function X(ary) {
//   let result = []
//   function flat(ary) {
//     for (item of ary) {
//       console.log(item);
//       if (Array.isArray(item)) {
//         flat(item)
//       } else {
//         result.push(item)
//       }
//     }
//   }
//   flat(ary)
//   return result
// }
// let result = X(ary)

// reduce
// function flatten(ary) {
//   return ary.reduce((pre, next) => {
//     return pre.concat(Array.isArray(next) ? flatten(next) : next)
//   }, [])
// }
// let result = flatten(ary)
// console.log(result);


//  *****还没理解
// while(ary.some(item=>Array.isArray(item))){
//   ary = [].concat(...ary)
// }
// console.log(ary);

let ary = [2,3,0,1,6,20,39]
ary.sort((a,b)=>a-b)
// a-b 升序  b-a降序
console.log(ary);
