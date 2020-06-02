import isEmpty from 'lodash/isEmpty';

class Validation {
  static isEmpty = (value?: string | object) =>
    typeof value === 'string' ? value && isEmpty(value.trim()) : isEmpty(value);
}

export default class Validator {
  static required = (value: string) => (Validation.isEmpty(value) ? 'Required' : undefined);
}
