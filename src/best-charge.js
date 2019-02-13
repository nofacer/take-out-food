function bestCharge(selectedItems) {
  let items = loadAllItems();
  let itemDict = buildDict(items);
  let decodedItems = decode(selectedItems);

  return decodedItems
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
  for (let i in decodedItems) {
    let curItem = decodedItems[i][0];
    let curAmount = decodedItems[i][1];
    let curCost = itemDict[curItem][0];
    sum += curAmount * curCost;
  }
  return sum;
}


