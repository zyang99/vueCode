// 三数之和

var threeSum = function (nums) {
  let res = [];
  let len = nums.length;
  if (nums.length < 3) {
    return res;
  }
  nums.sort((a, b) => a - b);
  for (let i = 0; i < len - 2; i++) {
    if (nums[i] >= 0) break;
    if (nums[i] === nums[i - 1]) {
      continue;
    }
    let left = i + 1;
    let right = len - 1;
    while(left < right) {
      // console.log(nums);
      // console.log('1、现在是：',left,' ',right);
      let sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        // console.log('找到了',left,'_',right,'_',res);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum > 0) {
        while (left < right && nums[right] === nums[right - 1]) right--;
        right--;
      } else {
        while (left < right && nums[left] === nums[left + 1]) left++;
        left++;
      }
      // console.log('现在_',left,'_',right);
    }
  }
  return res;
};

let nums = [-4, -1, -1, 0, 1, 2];
let result = threeSum(nums);
console.log(result);
