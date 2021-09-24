
let arrAB = {
    a:0,
    b:0,
};

const add = function(a,b) {
    return a + b; 
};
const subtract = function(a,b) {
    return a - b; 
};
const multiply = function(a,b) {
    return a * b;
};
const divide = function(a,b) {
    return a / b; 
};
const operator = [
    divide, 
    multiply,
    subtract,
    add,
]

const operate = function(func, a,b) {   
    if (b === 0 && func === operator[0]) {
        display.textContent = "not today";
    } 
    else {
        display.textContent = (func(a,b) % 1 != 0) ? parseFloat(func(a,b).toFixed(5)) : func(a,b);
        arrAB["a"] = func(a,b);
        arrAB["b"] = 0;
        operand = "a";
    }
operandArray = []
con()
}


let operand = "a";
let operandArray = [];

const display = document.querySelector('#display');
const allButtons = document.querySelector('.calculator');
const numButtons  = document.querySelectorAll('.operand');

numButtons.forEach(e => e.addEventListener('click', e => {
    operandArray.push(e.target.value);
    display.textContent = operandArray.join('');
    arrAB[operand] = Number(operandArray.join(''));
    con()
}))

let currentOperator
const operatorButtons = document.querySelectorAll('.operator')
operatorButtons.forEach(e => e.addEventListener('click', e => {
    currentOperator = e.target.value;
    operand = "b";   
    operandArray = [];
    if(arrAB["a"] != 0 && arrAB["b"] != 0) {
        let a = arrAB["a"];
        let b = arrAB["b"];
        operate(func,a,b)
        operand = "b"
    }
    func = operator[e.target.id]
    con()
}))

const runTheOp = document.querySelector("#return");
runTheOp.addEventListener('click', e=> {
    let a = arrAB["a"];
    let b = arrAB["b"];
    operate(func,a,b)
    })

const clear = document.querySelector("#clear");
clear.addEventListener('click', e => {
  clearThis();
  con()
})

const backspace = document.querySelector('#backspace') 
backspace.addEventListener('click', e=> {
  operandArray = operandArray.slice(0, (operandArray.length - 1) )
  console.log(operandArray);
  arrAB[operand] = Number(operandArray.join(''));
  display.textContent = operandArray.join('') 
  con()
})

const decimal = document.querySelector('#decimal')
decimal.addEventListener('click', e=>{
    if (Number.isInteger(Number(display.textContent)) === false) { 
    decimal.disabled = true
    } 
    else {
    operandArray.push(e.target.value);
    display.textContent = operandArray.join('');
    arrAB[operand] = Number(operandArray.join(''));
    }
    decimal.disabled = false;
})


const negative = document.querySelector('#negative')
negative.addEventListener('click', e=>{
    if (Number(display.textContent) <= 0) { 
        operandArray.shift("-");
        display.textContent = operandArray.join('');
        arrAB[operand] = Number(operandArray.join(''));
    } 
    else {
        operandArray.unshift("-");
        display.textContent = operandArray.join('');
        arrAB[operand] = Number(operandArray.join(''));
    }
    decimal.disabled = false;
    con()
})

function clearThis() {
    arrAB['a'] = 0;
    arrAB['b'] = 0;
    display.textContent = ""; 
    operandArray = [];
    operand = "a"; }
    function con() {
        console.log(arrAB)
  }

