function bestCharge(selectedItems) {
  return `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim();
}

function decode(singleInstruction) {
  const slicedInstruction = singleInstruction.split(" ");
  return [slicedInstruction[0], parseInt(slicedInstruction[2])]
}

function buildDict(items) {
  let blankDict = {};
  for (let i in items) {
    blankDict[items[i].id] = [parseInt(items[i].price), items[i].name];
  }
  return blankDict;
}

