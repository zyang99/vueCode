// 使用两数之和的理论来实现

const threeSum = function (nums) {
  let res = []
  let len = nums.length;
  if (len < 3) {
    return res;
  }
  nums.sort((a, b) => a - b);
  for (let i = 0; i < len - 2; i++) {
    if (nums[i] > 0) break;
    if (nums[i] === nums[i - 1]) continue;
    let right = i + 1;
    while (right < len - 1) {
      let diff = 0 - (nums[i] + nums[right]);
      let index = nums.indexOf(diff, right + 1);
      if (index != -1) {
        res.push([nums[i], nums[right], nums[index]]);
        while (nums[right] === nums[right + 1] && right < len - 2) right++;
        right++;
      } else {
        // while (nums[right] === nums[right + 1] && right < len - 1) right++;
        right++;
      }
    }
  }
  return res;
}



let nums = [-1, 0, -1, 1, 2, -4]
let person = [0, 0, 0, 0]
console.log(threeSum(nums));
console.log(threeSum(person));
