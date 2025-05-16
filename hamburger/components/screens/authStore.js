// components/authStore.js
let userCredentials = {
  email: '',
  password: ''
};

export const saveCredentials = (email, password) => {
  userCredentials.email = email;
  userCredentials.password = password;
};

export const getCredentials = () => userCredentials;
