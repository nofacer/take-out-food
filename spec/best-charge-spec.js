describe('Test functions', function () {
  it('of decode which gets the id and amount of certain food', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let result = decode(inputs);
    let expected = [["ITEM0001", 1], ["ITEM0013", 2], ["ITEM0022", 1]];
    expect(result).toEqual(expected)
  });

  it('of buildDict which builds a dict from item list', function () {
    let inputs = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00
    }];
    let result = buildDict(inputs);
    let expected = [];
    expected = {'ITEM0001': [18, '黄焖鸡'], 'ITEM0013': [6, '肉夹馍']};
    expect(result).toEqual(expected);
  });

  it('of calSum which calculates the sum cost of all food without any reduction', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2"];
    let itemDict = buildDict(loadAllItems());
    let decodedItems = decode(inputs);
    let result = calSum(decodedItems, itemDict);
    let expected = 30;
    expect(result).toEqual(expected)
  });

});


describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function () {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim();
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function () {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim();
    expect(summary).toEqual(expected)
  });

});

