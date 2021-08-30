function eval() {
    // Do not use eval!!!
    return;
}

function isNumber(s) {
  return /\d/.test(s);
}

function editStack(arrOutput, arrStack, value=undefined) {
  const operationsConfig = {
    '(': 0,
    ')': 1,
    '+': 2,
    '-': 2,
    '*': 3,
    '/': 3
  };

  if (value === undefined) {
    for (let i = arrStack.length-1; i >= 0; i--) {
      if (operationsConfig[arrStack[i]] > 1) {
        arrOutput.push(arrStack[i]);
      }
    }
    return;
  }

  const rangOperation = operationsConfig[value];

  if (arrStack.length > 0) {
    if (rangOperation > operationsConfig[arrStack[arrStack.length-1]] || rangOperation === 0) {
      arrStack.push(value);
    } else {
      let i = arrStack.length-1;
      while (operationsConfig[arrStack[i]] >= rangOperation && i >= 0) {
        if (operationsConfig[arrStack[i]] > 1) {
          arrOutput.push(arrStack[i]);
        }
        arrStack.pop();
        i--;
      }
      if (rangOperation === 1) {
        arrStack.pop();
      } else {
        arrStack.push(value);
      }
    }
  } else {
    arrStack.push(value);
  }

  return;
}



function expressionCalculator(expr) {
  // write your solution here
  
  expr = expr.trim();

  const obj = expr.split('').reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});
  if (obj["("] !== obj[")"]) throw new Error('ExpressionError: Brackets must be paired');

  let numb = '';
  let arrOutput = [];
  let arrStack = [];
  let i = -1;
  while (i < expr.length-1) {
    i++;
    simbol = expr[i];
    if (simbol === ' ') continue;
    if (isNumber(simbol)) {
      numb = numb + simbol;
      if (i === expr.length-1) arrOutput.push(Number(numb));
    } else {
      if (isNumber(numb)) {
        arrOutput.push(Number(numb));
      }
      editStack(arrOutput, arrStack, simbol);
      numb = '';
    }
  }
  editStack(arrOutput, arrStack);

  const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y
  };

  let stack = [];
  arrOutput.forEach((token) => {
    if (token in operators) {
      if (token === '/' && stack[stack.length-1] === 0) throw new Error('TypeError: Division by zero.');
      let [y, x] = [stack.pop(), stack.pop()];
      stack.push(operators[token](x, y));
    } else {
      stack.push(parseFloat(token));
    }
  });

  return stack.pop();
}


module.exports = {
    expressionCalculator
}