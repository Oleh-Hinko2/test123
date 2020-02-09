import isEmpty from "lodash/isEmpty";
import memoise from "lodash/memoize";
import findKey from "lodash/findKey";
import mapValues from "lodash/mapValues";
import omitBy from "lodash/omitBy";
import isUndefined from "lodash/isUndefined";
import * as EmailValidator from 'email-validator';

export const isNotDate = value => !value.isValid()

export { isEmpty };
export const isNotEmpty = value => !isEmpty(value);

export const isEmptyValue = value => {
  let checkValue = value;
  if (Number.isInteger(value)) {
    checkValue = value.toString();
  }
  return isEmpty(checkValue);
}

export const isEmail = value => EmailValidator.validate(value);

export const isNotEmail = value => !isEmail(value);

export const composeValidators = rules => {
  return memoise((value, data) => {
    return findKey(rules, rule => {
      return rule(value, data);
    });
  });
};

export const makeFormValidator = rules => {
  return values => {
    const keys = mapValues(rules, (rule, key) => {
      const value = values ? values[key] : undefined;
      return rule(value, values);
    });
    const errors = omitBy(keys, isUndefined);
    return isEmpty(errors) ? undefined : errors;
  };
};
