import { register } from "../../conections/usuariosAPI";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const body = {
      nombre: name,
      email: email,
      password: password
    };
    await register(body)
    window.location.href = '../login/login.html'
  });
});