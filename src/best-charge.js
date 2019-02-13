function bestCharge(selectedItems) {
  let text = `============= 订餐明细 =============\n`;
  let items = loadAllItems();
  let itemDict = buildDict(items);
  let decodedItems = decode(selectedItems);
  let sum = calSum(decodedItems, itemDict);
  let sumValue = sum[0];
  let sumText = sum[1];
  text += sumText;
  text += `-----------------------------------\n`;
  let reductionSelection = reduction(decodedItems, itemDict);
  if (reductionSelection !== null) {
    let reductionValue = reductionSelection[0];
    let reductionText = reductionSelection[1];
    text += "使用优惠:\n";
    text += reductionText;
    text += `\n-----------------------------------\n`;
    sumValue -= reductionValue;
  }
  text += "总计：" + sumValue + "元";
  text += "\n===================================\n";
  return text
}

function decode(selectedItems) {
  let result = [];
  for (let i in selectedItems) {
    let slicedInstruction = selectedItems[i].split(" ");
    result.push([slicedInstruction[0], parseInt(slicedInstruction[2])]);
  }
  return result

}

function buildDict(items) {
  let blankDict = {};
  for (let i in items) {
    blankDict[items[i].id] = [parseInt(items[i].price), items[i].name];
  }
  return blankDict;
}

function calSum(decodedItems, itemDict) {
  let sum = 0;
  let text = ``;
  for (let i in decodedItems) {
    let curItem = decodedItems[i][0];
    let curAmount = decodedItems[i][1];
    let curCost = itemDict[curItem][0];
    let curName = itemDict[curItem][1];
    let curSum = curAmount * curCost;
    sum += curSum;
    text += curName + ' x ' + curAmount + ' = ' + curSum + '元\n';
  }
  return [sum, text];
}

function reduction(decodedItems, itemDict) {
  let sum = calSum(decodedItems, itemDict)[0];
  let halfCostItem = ['ITEM0001', 'ITEM0022'];
  let reduction_1 = 0;
  let reduction_2 = 0;
  if (sum >= 30) {
    reduction_1 = 6;
  }
  let reductedItemName = [];
  for (let i in decodedItems) {
    let curItem = decodedItems[i][0];
    let curAmount = decodedItems[i][1];
    let curCost = itemDict[curItem][0];
    let curName = itemDict[curItem][1];
    if (halfCostItem.indexOf(curItem) > -1) {
      reductedItemName.push(curName);
      reduction_2 += curCost * curAmount / 2
    }
  }
  if (reduction_1 === 0 && reduction_2 === 0) {
    return null
  } else if (reduction_1 >= reduction_2) {
    return [reduction_1, "满30减6元，省6元"]
  } else {
    let text = '';
    for (let i in reductedItemName) {
      text += reductedItemName[i] + "，";
    }
    text = text.substring(0, text.length - 1);
    return [reduction_2, "指定菜品半价(" + text + ")，省" + reduction_2 + "元"]
  }
}
