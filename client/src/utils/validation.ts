/* eslint-disable max-classes-per-file */
import isEmpty from 'lodash/isEmpty';

class Validation {
  static isEmpty = (value?: string | object) =>
    typeof value === 'string' ? value && isEmpty(value.trim()) : isEmpty(value);

  static isValidEmail = (value?: string) => {
    if (!value) {
      return false;
    }

    if (value.split(' ').filter((truthy) => truthy).length > 1) {
      return false;
    }

    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      value
    );
  };
}

export default class Validator {
  static required = (value: string) => (Validation.isEmpty(value) ? 'Required' : undefined);

  static validEmail = (email: string) => (Validation.isValidEmail(email) ? undefined : 'Invalid email format');
}
