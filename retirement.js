/**
 * Authors: Ethan McEvoy & Rafeal ...
 * date: 3/26/26
 * assignment: CH 8 & 9 retirement countdown
 *
 * This code does...
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
const dateErr = $("#retirement_date_error");

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

    /* TODO: Validate Email
    const emailPattern = /^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/;
    if (!emailPattern.test(emailIn.value.trim())) {
    */

    const emailPattern = /^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/;
    if (!emailPattern.test(emailIn.value.trim())) {
        emailErr.textContent = emailIn.title; // Pulls from title attribute
        isValid = false;
    }

    /* TODO: Validate Date
    if date is empty
    display error similar to name logic
    else
    years = user's year - the current year
    if years is less or equal to 0 || greater than 75
    display error similar to name logic
    */
    if (isNaN(investIn) || investIn < 0) {
        $("#investErr").textContent = investIn.title;
        isValid = false;
    }
    /*
    TODO: do the same for the other two numeric input values
    based on the input field's title data validation message
    */
    if (isNaN(rateIn) || rateIn < 0) {
        $("#rateErr").textContent = rateIn.title;
        isValid = false;
    }
    if (isNaN(addIn) || addIn < 0) {
        $("#addErr").textContent = addIn.title;
        isValid = false;
    }
    if (isNaN(investIn) || investIn < 0) {
        $("#investErr").textContent = rateIn.title;
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
        for (let i = 0; i < 12; i++) {
        bal = ((bal + add) * (1 + (rate / 12 / 100))).toFixed(2);
        }
        format the balance - see code above
        update the output - see code above
        if count is >= years
        clear interval projectionTimer (Ch 8)
        update the statusMsg to Calculation Completed! (like code above)
        set the statusMsg to red (like code above)
        end if
        add one to the count
        */
    }, 1000);
};
const setTestData = () => {
    resetForm();
    /* TODO: set default value for all input fields
    Setup the future date to 10 years from now:
    (1) create a const variable named future and set it to the current date (Ch
    8)
    (2) add 10 years to the future date variable (Ch 8)
    (3) use toISOString().split('T')[0] to display the future date (Ch 8)
    */

    const retireDate = new Date();
    retireDate.setFullYear(retireDate.getFullYear() + 10);
    dateIn.value = retireDate.toISOString().split("T")[0];

    nameIn.value = "John Smith";
    emailIn.value = "John.Smith@wsc.edu"
    investIn.value = 100000;
    addIn.value = 500;
    rateIn.value = 5.5;

    //dateIn.value = Date.now();
};
const resetForm = () => {
    /* TODO:
    clear the interval projectionTimer (Ch 8)
    reset all the error spans back to *
    document.querySelectorAll(".error").forEach(s => s.textContent = "*");
    set the body width to 350px (see code example above)
    set the statusMsg to red (see code example above)
    set the focus to the name input field (Ch 9)
    */

    errBox.textContent = "";
    output.textContent = "";
    statusMsg.textContent = "";
    //clearInterval(startProjection);
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