function validateIndianMobileNumber(number) {
    const pattern = /^\+?(\d{1,4})?[\s-]?((\(?\d{2,4}\)?)?[\s-]?)?([6-9]\d{9}|\d{7,15})$/;
    return pattern.test(number);
}
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

module.exports = {
    validateIndianMobileNumber,
    validateEmail
}