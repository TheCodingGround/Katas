var { expect } = require('chai');

// Create a simple String calculator with a method int Add(string numbers)

// The method can take 0, 1 or 2 numbers, and will return their sum (for an empty string it will return 0) for example “” or “1” or “1,2”

// Start with the simplest test case of an empty string and move to 1 and two numbers

// Remember to solve things as simply as possible so that you force yourself to write tests you did not think about

// Remember to refactor after each passing test

// Allow the Add method to handle an unknown amount of numbers

// Allow the Add method to handle new lines between numbers (instead of commas).

// the following input is ok:  “1\n2,3”  (will equal 6)

// the following input is NOT ok:  “1,\n” (not need to prove it - just clarifying)

// Support different delimiters

// to change a delimiter, the beginning of the string will contain a separate line that looks like this:   “//[delimiter]\n[numbers…]” for example “//;\n1;2” should return three where the default delimiter is ‘;’ .

// the first line is optional. all existing scenarios should still be supported

// Calling Add with a negative number will throw an exception “negatives not allowed” - and the negative that was passed.if there are multiple negatives, show all of them in the exception message

const add = (input) => {
  var stringToSplit = input;
  var seperator = /[,\n]/g;

  if (input.startsWith("//")){
    var split = input.split("\n");
    seperator = split[0][2];
    stringToSplit = split[1];
  }

  var mappedNumbers = stringToSplit
        .split(seperator)
        .map((val) => val == '' ? 0 : parseInt(val));

  var negativeNumbers = mappedNumbers.filter((val) => val < 0);

  if (negativeNumbers.length > 0) {
    var message = `Negative numbers not allowed: ${negativeNumbers}`;
    throw new Error(message);
  }

  return mappedNumbers.reduce((acc,val) => acc + val, 0);
};

describe('String Calculator Kata', function(){
  it('Empty string should return 0', function(){
    expect(add("")).to.equal(0);
  });

  it('One number should return the same number', function(){
    expect(add("1")).to.equal(1);
    expect(add("2")).to.equal(2);
  });

  it('Two numbers seperated by a comma should return the sum of the two numbers', function(){
    expect(add("1,2")).to.equal(3);
  });

  it('Two numbers seperated by a new line should return the sum of the two numbers', function(){
    expect(add("3\n6")).to.equal(9);
  });

  it('Specify a custom delimiter if string starts with //', function(){
    expect(add("//;\n4;6")).to.equal(10);
  });

  it('Specify a - if string starts with //', function(){
    expect(add("//-\n4-6")).to.equal(10);
  });

  it('Negative numbers not allowed, should throw error', function(){
    expect(() => add("4,-6")).to.throw("Negative numbers not allowed: -6");
  });

  it('Negative numbers not allowed, should throw error', function(){
    expect(() => add("4,-5,-6")).to.throw("Negative numbers not allowed: -5,-6");
  });

});


