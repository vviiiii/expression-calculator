function eval() {
    // Do not use eval!!!
    return;
}

function topArrElem(arr) {
    if (arr.length) {
        return arr[arr.length - 1];
    }
    return null;

}



function expressionCalculator(expr) {

    let arrExpr = [];

    if (expr.indexOf(' ')===-1){
        arrExpr = expr.split('');
    } else{
        arrExpr = expr.split(' ');
    }
    

    // console.log(arrExpr);

    const brackets = {
        '(': 0,
        ')': 0
    };

    for (let i = 0; i < expr.length; i++) {
        let elem = expr[i];
        if (elem === '(') {
            brackets['('] += 1;
        } else if (elem === ')') {
            brackets[')'] += 1;
        }
    };

    // filter spaces
    let arrExprWithoutGaps = arrExpr.filter(function (elem) {
        return elem != '';
    });


    // console.log(arrExprWithoutGaps);
    // console.log(brackets);


    if (brackets['('] !== brackets[')']) {
        throw new Error("ExpressionError: Brackets must be paired");
    }

    /*---------*/
    const mathOperators = {
        '+': function (a, b) {
            return a + b;
        },
        '-': function (a, b) {
            return a - b;
        },
        '*': function (a, b) {
            return a * b;
        },
        '/': function (a, b) {
            if (b === 0) {
                throw new Error('TypeError: Division by zero.');
            }
            return a / b;
        }
    }

    const operatorsPriority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };



    let arrNumbers = [],
        arrStack = [];

    function mathOperation() {
        let lastOperation = arrStack.pop();
        let firstNumber = arrNumbers.pop();
        let secondNumber = arrNumbers.pop();
        let result = mathOperators[lastOperation](secondNumber, firstNumber);
        arrNumbers.push(result);
    }

    for (let i = 0; i < arrExprWithoutGaps.length; i++) {
        let elem = arrExprWithoutGaps[i];
        // console.log('elem ', typeof +elem);
        if (!isNaN(elem)) {
            arrNumbers.push(+elem);
            // console.log('1');
        } else if (elem === '(') {
            arrStack.push(elem);
            // console.log('2');
        } else if (elem === ')') {
            // console.log('3');
            while (topArrElem(arrStack) !== '(') {
                // console.log('4');
                mathOperation();
            }
            // console.log('5');
            arrStack.pop();
        } else {
            // console.log('6');
            while (arrStack.length > 0 && operatorsPriority[elem] <= operatorsPriority[topArrElem(arrStack)]) {
                // console.log('7');
                mathOperation();
            }
            // console.log('8');
            arrStack.push(elem);
        }

    }

    while (arrStack.length > 0) {
        mathOperation();
    };
    // console.log('arrNumbers', arrNumbers);
    // console.log('arrStack', arrStack);
    return arrNumbers.pop();

}

module.exports = {
    expressionCalculator
}