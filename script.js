const operator = [
  add = function (a, b) {
    return a + b;
  },
  subtract = function (a, b) {
    return a - b;
  },
  multiply = function (a, b) {
    return a * b;
  },
  divide = function (a, b) {
    return a / b;
  }
]

function operate() {
  return operator[currentOperation](operands['a'], operands['b'])
}

let operands = {
  a: 0,
  b: 0,
  result: undefined,
}

let currentOperand;
function selectOperand() {
  if (operands.a === 0 && operands.b === 0) {
    currentOperand = 'a'
  }
  else if (currentOperation != undefined) {
    currentOperand = 'b'
  }
  else { currentOperand = 'b' }
}
selectOperand()

let currentSymb;
let currentOperation;
document.querySelector('#operators').addEventListener('click', e => {
  if (operands['a'] != 0 && operands['b'] != 0) {
    operands['result'] = operate();
    operands['b'] = 0;
    operands['a'] = 0;
    resultDisplay.textContent = '';
  }
  if (operands['result'] != 0 && operands['a'] === 0) {
    operands['a'] = operands['result'],
      resultDisplay.textContent = '';
    console.log(operands)
  }
  currentOperation = Number(e.target.value),
    currentSymb = e.target.textContent
  selectOperand()
  display()
  displayResult()
})

document.querySelector('#numPad').addEventListener('click', e => addNumber(e.target.value))
function addNumber(element) {
  if (element === "." && (operands[currentOperand] % 1 == 0)) {
    operands[currentOperand] = operands[currentOperand] + "."
  }
  else if (element !== '.') {
    operands[currentOperand] = Number(operands[currentOperand] + element);
    console.log(operands)
    display()
    displayResult()
  }
}

document.querySelector('#return').addEventListener('click', function () {
  if (currentOperation != undefined && operands['a'] != 0) {
    operands['result'] = operate();
    operands['b'] = 0;
    operands['a'] = 0;
    currentSymb = undefined;
  }

  selectOperand()
  displayResult()
  console.log(operands)
})


document.querySelector('#clear').addEventListener('click', function () {
  clear()
})

function clear() {
  currentOperation = undefined;
  currentSymb = undefined;
  operands['a'] = 0;
  operands['b'] = 0;
  operands['result'] = 0;
  expDisplay.textContent = '';
  resultDisplay.textContent = '';
  selectOperand()
}

document.querySelector('#backspace').addEventListener('click', function () {
  toStr = operands[currentOperand].toString();
  operands[currentOperand] = Number(toStr.slice(0, toStr.length - 1));
  display()
})

document.querySelector('#minus').addEventListener('click', e => {
  if (operands[currentOperand] > 0) {
    operands[currentOperand] = Number('-' + operands[currentOperand])
  }
  else if (operands[currentOperand] < 0) {
    operands[currentOperand] = -operands[currentOperand]
  }
  display()
  console.log(operands)
})

const resultDisplay = document.querySelector('#resultDisplay')
function displayResult() {
  if ((operands['a'] === 0 && operands['b'] === 0) && operands['result'] != undefined) {
    resultDisplay.textContent = floatLess(operands['result'])
    if (expDisplay.textContent.slice(-1) != "=") {
      expDisplay.textContent += '=';
    }
  }
  else { resultDisplay.textContent = '' }
}
const expDisplay = document.querySelector('#expression')
function display() {
  let a = floatLess(operands['a'])
  let b = floatLess(operands['b'])
  let result
  if (operands['result'] != undefined) {
    result = floatLess(operands['result'])
  }
  if (currentSymb === undefined) {
    expDisplay.textContent = a.toString()
  }
  else if (operands['b'] === 0 && currentSymb != undefined) {
    expDisplay.textContent = a + currentSymb
  }
  else {
    expDisplay.textContent = a.toString() + currentSymb + b.toString()
  }
}

function floatLess(n) {
  if (n % 1 != 0) {
    let halveTheFloat = n.toString().split('.');
    if (halveTheFloat[1].length > 7) {
      let halvedFloat = halveTheFloat[1].slice(0,halveTheFloat[1].length / 2);
      n = halveTheFloat[0] + '.' + halvedFloat
    }
    return n
  }
  else {
    return n 
  }
}