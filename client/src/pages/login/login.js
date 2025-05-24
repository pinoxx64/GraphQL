import { login } from "../../conections/authAPI.js";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const body = {
      email: email,
      password: password
    };
    const user = await login(body)
    sessionStorage.setItem('userId',user.user._id)
    sessionStorage.setItem('token',user.token)
    window.location.href = '../inicio/inicio.html'
  });
});