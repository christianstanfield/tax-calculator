describe('calculateTaxes', function() {

  it('calculates correct taxes for $1', function(){
    var taxes = calculateTaxes(1);
    expect(taxes.foo).toBe(0.1);
    expect(taxes.bar).toBe(0.13);
  });

  it('calculates correct taxes for $10', function(){
    var taxes = calculateTaxes(10);
    expect(taxes.foo).toBe(1);
    expect(taxes.bar).toBe(1.3);
  });

  it('calculates correct taxes for $1,000', function(){
    var taxes = calculateTaxes(1000);
    expect(taxes.foo).toBe(100);
    expect(taxes.bar).toBe(130);
  });

  it('calculates correct taxes for $100,000', function(){
    var taxes = calculateTaxes(100000);
    expect(taxes.foo).toBe(10000);
    expect(taxes.bar).toBe(13000);
  });

  it('calculates correct taxes for $100,001', function(){
    var taxes = calculateTaxes(100001);
    expect(taxes.foo).toBe(15000.15);
    expect(taxes.bar).toBe(15000.15);
  });

  it('calculates correct taxes for $200,000', function(){
    var taxes = calculateTaxes(200000);
    expect(taxes.foo).toBe(30000);
    expect(taxes.bar).toBe(30000);
  });

  it('calculates correct taxes for $200,001', function(){
    var taxes = calculateTaxes(200001);
    expect(taxes.foo).toBe(40000.200000000004);
    expect(taxes.bar).toBe(32000.16);
  });

  it('calculates correct taxes for $1,000,000', function(){
    var taxes = calculateTaxes(1000000);
    expect(taxes.foo).toBe(200000);
    expect(taxes.bar).toBe(160000);
  });
});

describe('calculateLowerTax', function() {

  it('returns name of lowest number when first in array', function () {
    var lowestTaxes = calculateLowerTax([1,2], ['one','two']);
    expect(lowestTaxes).toEqual(['one']);
    expect(lowestTaxes[0]).toBe('one');
    expect(lowestTaxes.length).toBe(1);
  });

  it('returns name of lowest number when second in array', function () {
    var lowestTaxes = calculateLowerTax([2,1], ['two','one']);
    expect(lowestTaxes).toEqual(['one']);
    expect(lowestTaxes[0]).toBe('one');
    expect(lowestTaxes.length).toBe(1);
  });

  it('returns names of both numbers when equal', function () {
    var lowestTaxes = calculateLowerTax([1,1], ['one1','one2']);
    expect(lowestTaxes).toEqual(['one1','one2']);
    expect(lowestTaxes[0]).toBe('one1');
    expect(lowestTaxes[1]).toBe('one2');
    expect(lowestTaxes.length).toBe(2);
  });
});

describe('taxMessage', function() {

  it('returns the correct message for the lowest number', function () {
    var message = taxMessage([2,1], ['two','one']);
    expect(message).toBe('Based on your income, the tax plan which offers the least burden would be the one tax plan.');
  });

  it('returns the correct message for two equal numbers', function () {
    var message = taxMessage([1,1], ['one1','one2']);
    expect(message).toBe('Based on your income, the tax plan which offers the least burden would be either the one1 tax plan or the one2 tax plan equally.');
  });

  it('returns the correct message for non-numerical input', function () {
    var message = taxMessage([NaN,NaN], ['one1','two2']);
    expect(message).toBe('Please enter numerical input only.');
  });
});

describe('formatCurrency', function () {

  it('correctly formats 1', function () {
    var currency = formatCurrency(1);
    expect(currency).toBe('$ 1.00');
  });

  it('correctly formats 0.99', function () {
    var currency = formatCurrency(0.99);
    expect(currency).toBe('$ 0.99');
  });

  it('correctly formats 100.100', function () {
    var currency = formatCurrency(100.100);
    expect(currency).toBe('$ 100.10');
  });

  it('correctly formats 1,000.9', function () {
    var currency = formatCurrency(1000.9);
    expect(currency).toBe('$ 1,000.90');
  });

  it('correctly formats 10,000.9999', function () {
    var currency = formatCurrency(10000.9999);
    expect(currency).toBe('$ 10,001.00');
  });

  it('correctly formats 1,000,000', function () {
    var currency = formatCurrency(1000000);
    expect(currency).toBe('$ 1,000,000.00');
  });
});

describe('isNumber', function () {

  it('returns error message if input contains NaN', function () {
    var returnValue = isNumber('101NaN.00');
    expect(returnValue).toBe('Please enter a number');
  });

  it('returns input if does not contain NaN', function () {
    var returnValue = isNumber('101.00');
    expect(returnValue).toBe('101.00');
  });
});
