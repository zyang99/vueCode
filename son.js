// 输出一个数组的子集

var subsets = function (nums) {
  let res = [[]];  // 每个数组都有一个空集作为字集
  for (let i = 0; i < nums.length; i++) {
    res.forEach(e => {
      // console.log('res中', e)
      // console.log('nums中',i,' ', nums[i])
      // console.log('这是', e.concat(nums[i]));
      res.push(e.concat(nums[i]))
    })
  }
  return res;
};

// 遍历res这个只有空集的数组。
// 每次把nums[i]与遍历时的e（就是res的每个元素）进行拼接起来作为新元素放进res
// 这样就得到了nums的所有子集


console.log(subsets([1, 2, 3]));