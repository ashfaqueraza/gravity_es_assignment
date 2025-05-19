function targetIndices(nums, target) {
  if (!Array.isArray(nums)) {
    throw new TypeError("The first argument must be an array.");
  }
  if (typeof target !== "number") {
    throw new TypeError("The target must be a number.");
  }

  const mapIndex = new Map();

  for (let i = 0; i < nums.length; i++) {
    const temp = target - nums[i];

    if (mapIndex.has(temp)) {
      return [mapIndex.get(temp), i];
    }

    mapIndex.set(nums[i], i);
  }
  return [];
}

console.log(targetIndices([2, 7, 11, 15], 9));
