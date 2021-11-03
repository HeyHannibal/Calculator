
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
    
  }
  currentOperation = Number(e.target.value),
    currentSymb = e.target.textContent
  selectOperand()
  display()
  displayResult()
})

document.querySelector('#numPad').addEventListener('click', e => addNumber(e.target.value))
function addNumber(element) {
if(!isNaN(element)) {
  if (element === "." && (operands[currentOperand] % 1 == 0)) {
    operands[currentOperand] = operands[currentOperand] + "."
  }
  else if (element !== '.') {
    operands[currentOperand] = Number(operands[currentOperand] + element);
    
    display()
    displayResult()
  }
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
})

const resultDisplay = document.querySelector('#resultDisplay')
function displayResult() {
   if (operands['result'].toString().length >= 20) {resultDisplay.style.fontSize = '1.2rem'}
  else if(operands['result'].toString().length > 15  ) {resultDisplay.style.fontSize = '1.5rem'}
  else {resultDisplay.style.fontSize = '3rem'}
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
  if(operands['a'].toString().length > 15 || operands['b'].toString().length > 15) {expDisplay.style.fontSize = '1.5rem'}
  else {expDisplay.style.fontSize = '2.5rem'}
  if(operands['a'] > 1.1111111111111112e+211 || operands['b'] > 1.1111111111111112e+211) {expDisplay.textContent = 'Number too Big, Stop all the downloading!'}
  if(isNaN(operands["a"]) || isNaN(operands["a"])) {expDisplay.textContent = 'Help Computer!'}

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
let unfocus =  document.querySelector('#input')
unfocus.addEventListener('click', e =>{
let i = document.querySelector('#focus');
setTimeout(function(){i.focus();}, 1700) 
})


