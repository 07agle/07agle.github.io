const lcd = document.getElementById("lcd");
const button = document.querySelectorAll("#keyBoard button");
const equal = document.getElementById("enter");
const clearBtn = document.getElementById("clear");
let lastWasDigit = false ;

// Loopar igenom alla knappar på tangentbordet
for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function () {
        let btn = button[i].innerHTML
        // Undvik + - * = , flera gånger på rad
        if (btn !== "CLEAR" && btn !== "=" &&  (btn !== "+" && btn !== "-" && btn !== "x" && btn !== "/" && btn !== ",")) {
            lastWasDigit = true 
            lcd.value += btn;
            console.log(lcd.value)
            console.log(lastWasDigit)
        }
        // Tillåt operatorer endast om förra tecknet var en siffra
        else if(lastWasDigit){
            if(btn === ","){
                lcd.value += ".";
            }
            else{
                lcd.value += btn;
            }
            lastWasDigit = false 
            console.log(lcd.value)
            console.log(lastWasDigit)
        }
    });
}

// Kopplar knappar till funktioner
clearBtn.onclick = clear
equal.onclick = calculate

function calculate() {
    // Hanterar multiplikation och division först
    while (lcd.value.includes('x') || lcd.value.includes('/')){
        //Letar reda på x och / och tar det första decimaltalet till vänster och höger. till exempel 3.2x5,2
        let multiMatch = lcd.value.match(/(\d+(\.\d+)?)\x(\d+(\.\d+)?)/g);
        let divMatch = lcd.value.match(/(\d+(\.\d+)?)\/(\d+(\.\d+)?)/g);

        // Multiplikation
        if(multiMatch){
            for (let i = 0; i < multiMatch.length; i++) {
                let multiplication = multiMatch[i];
                let parts = multiplication.split("x")
                let result = parseFloat(parts[0]) * parseFloat(parts[1]);
                console.log(multiplication + " = " + result);   
                console.log(result)
                lcd.value = lcd.value.replace(multiplication, result);
            }
        }
        
        // Division
        if(divMatch){
            for (let i = 0; i < divMatch.length; i++) {
                let divition = divMatch[i];
                let parts = divition.split("/")
                let result = parseFloat(parts[0]) / parseFloat(parts[1]);
                console.log(divition + " = " + result);      
                console.log(result)
                lcd.value = lcd.value.replace(divition, result);
            }
        }
    }

    // Slutför beräkning med + och -
    evaluateFinalExpression()
    lastWasDigit = true
}

function evaluateFinalExpression(){
    // Dela upp uttrycket på + och -
    let parts = lcd.value.split(/([+-])/); 
    let result = parseFloat(parts[0]);

    // Utför addition och subtraktion i tur och ordning
    for (let i = 1; i < parts.length; i += 2) {
        let operator = parts[i];
        let nextNum = parseFloat(parts[i + 1]); 
        
        if (operator === "+") {
            result += nextNum;
        } else if (operator === "-") {
            result -= nextNum; 
        }
    }
    console.log(result)
    lcd.value = result
    lastWasDigit = true
}

function clear(){
    // Töm displayen och återställ tillstånd
    lcd.value = "";
    lastWasDigit = false
}
