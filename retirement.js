/**
 * Authors: Ethan McEvoy & Rafeal ...
 * date: 3/31/26
 * assignment: CH 8 & 9 retirement countdown
 *
 * This code provides a retirement projection based on user input for current investment, monthly addition, rate of return, and retirement date. 
 * It validates the input, calculates the projected balance over time, and displays the results in a user-friendly format. 
 * The code also includes error handling and test data functionality to assist with testing and demonstration purposes.
 *
 */
"use strict";
// Defer in HTML allows us to grab these immediately at the top
const $ = selector => document.querySelector(selector);
const nameIn = $("#client_name");
const emailIn = $("#email");
const investIn = $("#investment");
const addIn = $("#monthly_add");
const rateIn = $("#rate");
const dateIn = $("#retirement_date");

const nameErr = $("#name_error");
const emailErr = $("#email_error");
const investErr = $("#investment_error");
const addErr = $("#monthly_add_error");
const rateErr = $("#rate_error");
const dateErr = $("#retire_date_error");

const errBox = $("#error_message");
const statusMsg = $("#status_message");
const output = $("#projection_output");
const form = $("#projection_form");
const testData = $("#test_data");

let projectionTimer = null;


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});
const processEntries = (evt) => {
    let isValid = true;
    let years = 0;

    evt.preventDefault();
    resetForm(); //get rid of the errors, not the input fields

// Validate the name
    if (nameIn.value.trim() === "" || !isNaN(nameIn.value)) {
        nameErr.textContent = nameIn.title; // Pulls from title attribute
        isValid = false;
    }

    const emailPattern = /^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/;
    if (!emailPattern.test(emailIn.value.trim())) {
        emailErr.textContent = emailIn.title; // Pulls from title attribute
        isValid = false;
    }

    years = new Date(dateIn.value).getFullYear() - new Date().getFullYear();              // years = user's year - the current year

    if (new Date(dateIn.value).toString() === "Invalid Date" || years < 0 || years > 75) { //  if date is empty or if years is less 0 or greater than 75
        dateErr.textContent = dateIn.title;                                               //display error similar to name logic
        isValid = false;
    }

    if (isNaN(investIn.value) || investIn.value < 0 || investIn.value === " ") {
        investErr.textContent = investIn.title;
        isValid = false;
    }

    if (isNaN(rateIn.value) || rateIn.value < 0 || rateIn.value === " ") {
        rateErr.textContent = rateIn.title;
        isValid = false;
    }
    if (isNaN(addIn.value) || addIn.value < 0 || addIn.value === " ") {
        addErr.textContent = addIn.title;
        isValid = false;
    }
    /* TODO: Code try-catch logic
    try
    if not valid then throw error "Please correct the entries highlighted
    below."
    NOTE: otherwise the following 2 statements will run
    document.body.style.width = "350px";
    startProjection(nameIn.value, invest, add, rate, years);
    catch(e)
    set the body width to 700px (like code above)
    errBox.textContent = e.message;
    */
    // try {
    //     if (!isValid) {
    //         errBox.textContent = "Please correct the entries highlighted"
    //     }
    // }
    
};
const startProjection = (name, bal, add, rate, years) => {
    statusMsg.textContent = `Live Projection: ${name}`;
    statusMsg.style.color = "red";
    let count = 1;
    const startYear = new Date().getFullYear();
    let formattedBal = formatter.format(bal);
    output.textContent = `Year ${startYear} = ${formattedBal}`;
    projectionTimer = setInterval(() => {
        /* TODO: code the interval logic
        format the balance - see code above
        update the output - see code above
        if count is >= years
        clear interval projectionTimer (Ch 8)
        update the statusMsg to Calculation Completed! (like code above)
        set the statusMsg to red (like code above)
        end if
        add one to the count
        */
        for (let i = 0; i < 12; i++) {
            bal = ((bal + add) * (1 + (rate / 12 / 100))).toFixed(2);
        }
        if (count >= years) {
            clearInterval(projectionTimer);
            errBox.color = "red";
            statusMsg.textContent = "Calculation Complete!"

        }
    }, 1000);
};
const setTestData = () => {
    resetForm();
    const retireDate = new Date();
    retireDate.setFullYear(retireDate.getFullYear() + 10); // adds 10 years to the current date
    dateIn.value = retireDate.toISOString().split("T")[0]; // formats the date to YYYY-MM-DD

    nameIn.value = "John Smith";
    emailIn.value = "John.Smith@wsc.edu"
    investIn.value = 10000;
    addIn.value = 500;
    rateIn.value = 5.5;
};
const resetForm = () => {

    errBox.textContent = "";
    output.textContent = "";
    statusMsg.textContent = "";
    document.querySelectorAll(".error").forEach(s => s.textContent = "*");
    statusMsg.style.color = "red";
    document.body.style.width = "350px";
    nameIn.focus();

};
document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", processEntries);
    form.addEventListener("reset", resetForm);
    testData.addEventListener("click", setTestData);
});