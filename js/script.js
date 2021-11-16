var input = document.getElementById("input"),
    operator = document.querySelectorAll(".operators div"),
    number = document.querySelectorAll(".numbers div"),
    result = document.getElementById("result"),
    clear = document.getElementById("clear"),
    resultDisplayed = false // flag to keep an eye on what output is displayed;

    for(let i = 0; i < number.length; i++) {
        number[i].addEventListener("click", function(e) {
            var currentString = input.innerHTML;
            var lastChar = currentString[currentString.length - 1];
            // if result is not diplayed, just keep adding
            if(resultDisplayed === false) {
                input.innerHTML += e.target.innerHTML;
            } else if(resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
                // if result is currently displayed and user pressed an operator
                // we need to keep on adding to the string for next operation
                resultDisplayed = false;
                input.innerHTML += e.target.innerHTML;
            }else {
                // if result is currently displayed and user pressed a number
                // we need clear the input string and add the new input to start the new opration
                resultDisplayed = false;
                input.innerHTML = "";
                input.innerHTML += e.target.innerHTML;
            }
        })
    }

    for(let i = 0; i < operator.length; i++) {
        operator[i].addEventListener("click", function(e) {
            // storing current input string and its last character in variables - used later
            var currentString = input.innerHTML;
            var lastChar = currentString[currentString.length - 1];
            // if last character entered is an operator, replace it with the currently pressed one
            if(lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
                newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
                input.innerHTML = newString;
            } else if(currentString.length == 0) {
                // if first key pressed is an opearator, don't do anything
                alert("Enter a Number First")
            } else {
                // else just add the operator pressed to the input
                input.innerHTML += e.target.innerHTML;
            }
        })
    }

    // on click of 'equal' button
    result.addEventListener("click", function(e) {
        // this is the string that we will be processing eg. -10+26+33-56*34/23
        var inputString = input.innerHTML;
        // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
        var numbers = inputString.split(/\+|\-|\×|\÷/g);
        var operators = inputString.replace(/[0-9]|\./g, "").split("");
        console.log(inputString);
        console.log(numbers);
        console.log(operators);
        console.log("##########");
        
        
        var divide = operators.indexOf("÷");
        console.log(divide);
        while(divide != -1) {
            numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
            operators.splice(divide, 1);
            divide = operators.indexOf("÷")
        }
        var multiply = operators.indexOf("×");
        console.log(multiply);
        while(multiply != -1) {
            numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
            operators.splice(multiply, 1);
            multiply = operators.indexOf("×")
        }
        var subtract = operators.indexOf("-");
        console.log(subtract);
        while(subtract != -1) {
            numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
            operators.splice(subtract, 1);
            subtract = operators.indexOf("-")
        }
        var add = operators.indexOf("+");
        console.log(add);
        while(add != -1) {
            // using parseFloat is necessary, otherwise it will result in string concatenation :)
            numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
            operators.splice(add, 1);
            add = operators.indexOf("+")
        }
        input.innerHTML = numbers[0] // displaying the Output
        

        resultDisplayed = true // turning flag if result is displayed
    });

    // clear the input when click on clear

    clear.addEventListener("click", function(e) {
        input.innerHTML = "";
    })