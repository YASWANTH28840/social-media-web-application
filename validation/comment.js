const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCommentInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text,{min:10,max:300})) {
    errors.text = 'Post should be between 10 to 300 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
