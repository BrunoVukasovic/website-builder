/* eslint-disable max-classes-per-file */

class Validation {
  static isEmpty = (value?: string) => !value || value.trim().length === 0;

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
