(function () {
  'use strict';
  fun();
  function fun() {
    console.log('welcome to top');
  }
})();
(function () {
  'use strict';
  fn();
  function fn() {
    console.log('welcome to our family');
  }
})();
// welcome to top
// welcome to our family

console.log(+true);   //1
console.log(!"jsama");  //false
console.log(null + 10);  //10
console.log(undefined == null);  //true  === false
console.log("5" < "10");   //false  是字符串->第一位5>1
console.log("5" > 10);   //false
console.log("bat" > "bba");  //false  a<b


// async function async1() {
//   console.log('async1 start');
//   await async2()
//   await fn()
//   console.log('async1 end');
// }
// async function async2() {
//   console.log('async2');
// }
// function fn() {
//   console.log("fn start");
// }
// console.log('script start');
// setTimeout(function () {
//   console.log("settimeout");
// })
// async1()
// new Promise(function (resolve) {
//   console.log('promise1');
//   resolve()
//   console.log('promise2');
// }).then(function () {
//   console.log('promise3');
// })
// // script start
// // async1 start
// // async2
// // promise1
// // promise2
// // fn start
// // promise3
// // async1 end
// // settimeout

const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2
  },
  perimeter: () => 2 * Math.PI * this.radius
}
const shape1 ={
  radius:20
}
console.log(shape.diameter());   //20
console.log(shape.diameter.call(shape1));  //40
console.log(shape.perimeter.call(shape1));  //NaN
