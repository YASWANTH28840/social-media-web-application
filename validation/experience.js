const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.to = !isEmpty(data.to) ? data.to : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
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
