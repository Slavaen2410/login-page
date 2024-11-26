export const validatePassword = (password) => {
    const hasNumber = /\d/.test(password);
    const hasOnlyLettersAndNumbers = /^[A-Za-z\d]+$/.test(password);
    return hasNumber && hasOnlyLettersAndNumbers;
  };
  