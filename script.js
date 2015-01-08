$(function () {

  $('#taxCalc').on('submit', function (e) {
    e.preventDefault();

    var income = this.elements.income.value;
    if (income < 0) {
      $('#message').html('<p>Please enter a positive number.</p>');
      $('#taxCalc input[name="foo-tax"]').val('');
      $('#taxCalc input[name="bar-tax"]').val('');
      return true;
    }
    income = Math.round(income);
    var taxes = calculateTaxes(income);

    var fooTax = Math.round(taxes.foo);
    var fooTaxCurrency = formatCurrency(fooTax);
    var barTax = Math.round(taxes.bar);
    var barTaxCurrency = formatCurrency(barTax);

    fooTaxCurrency = isNumber(fooTaxCurrency);
    barTaxCurrency = isNumber(barTaxCurrency);

    $('#taxCalc input[name="foo-tax"]').val(fooTaxCurrency);
    $('#taxCalc input[name="bar-tax"]').val(barTaxCurrency);

    highlightLowerTax([fooTax, barTax], ['foo-tax', 'bar-tax'], '#taxCalc', 'lowerTax');

    var message = taxMessage([fooTax, barTax], ['"Foo"', '"Bar"']);
    $('#message').html('');
    $('#message').append('<p>' + message + '</p>');
  });
});

var calculateTaxes = function (income) {

  var taxes = {};

  if (income <= 100000) {
    taxes.foo = income*0.1;
    taxes.bar = income*0.13;
  }
  if (income > 100000 && income <= 200000) {
    taxes.foo = income*0.15;
    taxes.bar = income*0.15;
  }
  if (income > 200000) {
    taxes.foo = income*0.2;
    taxes.bar = income*0.16;
  }

  return taxes;
};

// highlights background color of lowest taxes (kept it general for easy re-use/update)
var highlightLowerTax = function (taxesArray, namesArray, form, highlightClass) {
  // remove any previous highlight(s)
  for (var i = 0; i < namesArray.length; i++) {
    $(form + ' input[name="' + namesArray[i] + '"]').removeClass(highlightClass);
  }

  var lowestTaxes = calculateLowerTax(taxesArray, namesArray);

  // add new highlight(s)
  for (i = 0; i < lowestTaxes.length; i++) {
    $(form + ' input[name="' + lowestTaxes[i] + '"]').addClass(highlightClass);
  }
};

var taxMessage = function (taxesArray, namesArray) {

  var message = 'Based on your income, the tax plan which offers the least burden would be ';

  var lowestTaxes = calculateLowerTax(taxesArray, namesArray);

  if (lowestTaxes[0] === undefined) return 'Please enter numerical input only.';

  if (lowestTaxes.length > 1) {
    return message + 'either the ' + lowestTaxes[0] + ' tax plan or the ' + lowestTaxes[1] + ' tax plan equally.';
  } else {
    return message + 'the ' + lowestTaxes[0] + ' tax plan.';
  }
};

// returns name of lowest of 2 numbers or both if equal
var calculateLowerTax = function (taxesArray, namesArray) {

  var sortedTaxes = taxesArray.map(function (value, index) {return value;});
  sortedTaxes.sort(function (a, b) {return a - b;});

  if (sortedTaxes[0] === sortedTaxes[1]) {
    return namesArray;
  } else {
    var lowerTaxIndex = taxesArray.indexOf(sortedTaxes[0]);
    return [namesArray[lowerTaxIndex]];
  }
};

// formats a number into a currency-styled string
var formatCurrency = function (currency) {

  var currencyTwoDecimals = Math.round(currency*100)/100;
  var dollarsAndCents = currencyTwoDecimals.toString().split('.');
  var dollars = dollarsAndCents[0];
  var cents = dollarsAndCents[1];

  if (cents) {
    if (cents.length === 1) cents += '0';
  } else {
    cents = '00';
  }

  var count = 0;
  for (var i = dollars.length - 1; i >= 0; i--) {
    count += 1;
    if (count === 3) {
      dollars = dollars.slice(0, i) + ',' + dollars.slice(i);
      count = 0;
    }
  }
  if (dollars.charAt(0) === ',') dollars = dollars.slice(1);

  return '$ ' + dollars + '.' + cents;
};

// to catch any non-numerical user-input
var isNumber = function (numberString) {

  if (numberString.indexOf('NaN') > -1) return 'Please enter a number';
  return numberString;
};
