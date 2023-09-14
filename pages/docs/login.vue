<template>
    <div>
      <h2>Iniciar sesión</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Nombre de usuario:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const username = ref('');
  const password = ref('');
  
  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username: username.value,
        password: password.value,
      });
  
      if (response.data.success) {
        // El inicio de sesión fue exitoso, puedes redirigir al usuario a la página principal
        // o realizar cualquier otra acción que necesites.
        console.log('Inicio de sesión exitoso');
        // Redirigir al usuario a la página principal
        router.push('/');
      } else {
        console.log('Inicio de sesión fallido');
        // Puedes mostrar un mensaje de error al usuario aquí.
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };
  </script>
  