const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.to = !isEmpty(data.to) ? data.to : '';

  if (Validator.isEmpty(data.school)) {
    errors.school = 'school field is required';
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'degree field is required';
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'fieldofstudy field is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From field is required';
  }
  if (!Validator.isDate(data.from)) {
    errors.from = 'from field input is not valid';
  }
  if (Validator.equals(data.to,data.from)) {
    errors.to = 'From and To field can not be same';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
