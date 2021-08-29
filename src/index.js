function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    

  obj = expr.split('').reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  if (obj['('] !== obj[')']) {
    throw new SyntaxError('TypeError: Division by zero.');
  }


  console.log( obj['('] );
  console.log( obj[')'] );

  operation = [
    {'+': 1},
    {'-': 1},
    {'*': 2},
    {'/': 2}
  ];

  // function showError(textError) {
  //   return throw new SyntaxError(textError);
  // }

  // function recSteck(arrOutput, arrSteck, value=undefined) {

  // }



  let numb = '';
  let arrOutput = [];
  let arrSteck = [];
  let i = -1;
  while (i < expr.length-1) {
    i++;
    s = expr[i];
    console.log( s );
    if (s === ' ') continue;
    if (isNumber(s)) {
      numb = numb + s;
      if (i === expr.length-1) arrOutput.push(Number(numb));
    } else {
      if (isNumber(numb)) {
        arrOutput.push(Number(numb));
      }
      arrSteck.push(s);
      numb = '';
    }
  }


  if ( arrSteck.length > 0 ) {
    for (let i = arrSteck.length-1; i >= 0; i--) {
      arrOutput.push(arrSteck[i])
    }
  }



  console.log( isNumber('') );

  console.log( arrOutput );
  console.log( arrSteck );

  return null;
}

module.exports = {
    expressionCalculator
}