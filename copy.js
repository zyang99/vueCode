let arr = [1, 2, 3, 4, 5, 6, 7]
// 直接赋值 是同一个引用
// let newarr = arr
// newarr[0] = 100

// 浅拷贝:只能拷贝一层对象
let newarr = arr.slice()
newarr[0] = 100
console.log("arr", arr[0]); //100
console.log("newarr", newarr[0]); //100