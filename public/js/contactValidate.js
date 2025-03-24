const { assert, error } = console;

const email = document.querySelector("#email");
const date = document.querySelector("#date");

class validateForm {
    constructor(email, date) {
        this.email = email;
        this.date = date;
    }

    dateObj() {
        return this.date;
    }

    emailObj() {
        return this.email;
    }


    validateDate() {
        let dateInput = this.dateObj();
        typeof dateInput === "object" ? dateInput = dateInput : dateInput = 
        document
        .querySelector("#date") || document
        .getElementsByClassName("date")[0];

        let currentDate = new Date(),
        clientInputDate;
        
        dateInput.addEventListener("change", (e) => {
            let clientDate = e.target.value;

            clientDate = new Date(clientDate).toLocaleDateString();

            let clientMonthForValidation = clientDate.split("/")[0];
            let clientCorrectDayFormat = clientDate.split("/")[1].replace(clientDate.split("/")[1], parseInt(clientDate.split("/")[1]) + 1);

            if (clientDate.split("/").indexOf(clientDate.split("/")[1]) != -1) {
                clientDate = clientDate.split(clientDate.split("/")[1]).join(clientCorrectDayFormat);
            }

            // validate if curr date is greater than date input from client.

            // if current date is greater than date input 
            // --> style border input field to RED.
            // else 
            // --> style border input field to DEFAULT (BLACK).

            // log (clientDate);

            let formatClientDateForValidation = clientDate
            .split("/")
            .join("-")
            .split("-")
            .reverse()
            .join("-")
            .split(clientCorrectDayFormat)
            .join(clientCorrectDayFormat >= 10 
                ? clientCorrectDayFormat : 
                "0" + clientCorrectDayFormat)
        .split(clientMonthForValidation).join(clientMonthForValidation >= 10 ? clientMonthForValidation : "0" + clientMonthForValidation);
            ;
            let formatDayDate = formatClientDateForValidation.split("-")[1];
           formatClientDateForValidation = formatClientDateForValidation.split("-");
           formatClientDateForValidation[1] = formatClientDateForValidation[2];
            formatClientDateForValidation[2] = formatDayDate;

            formatClientDateForValidation = formatClientDateForValidation.join("-");


            clientInputDate = new Date(formatClientDateForValidation);

            let bool;

            if (currentDate <= clientInputDate) {
                bool = true;
                dateInput.style.border = "1px solid";
            } else {
                bool = false;
                dateInput.style.border = "1px solid red";
            }
        })
    }

    static validateEmail() {
        let emailInput = new validateForm().emailObj();
        
        emailInput = !emailInput || 
        emailInput == undefined ||
        typeof emailInput != "object" ? document.querySelector("#email") || 
        document.querySelector(".email") : email;

  
        emailInput.addEventListener("focusout", (e) => {
            let val = e.target.value;
            
            let filterVal = [...val].filter((c) => {
                if (c !== '@') return false;
                return true;
            });
            
           let found = filterVal.length;
           if (found <= 0) { e.target.style.border = "1px solid red" }
           else { e.target.style.border = "1px solid" };
            
        })
        
    }
}


let validate = new validateForm(email, date);
validate.validateDate();
validateForm.validateEmail();



