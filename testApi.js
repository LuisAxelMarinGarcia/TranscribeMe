const fetch = require('node-fetch');
const FormData = require('form-data');

const testAPI = async () => {
  const formData = new FormData();
  formData.append('email', 'test69@example.com');
  formData.append('password', 'Test1234');
  formData.append('name', 'Test Name');
  formData.append('surname', 'Test Surname');

  try {
    const response = await fetch('https://transcribeme-usuarios.integrador.xyz:3003/users', {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders(),
    });

    const responseText = await response.text();
    console.log("Texto de respuesta del servidor:", responseText);

    if (response.ok) {
      console.log("Datos de respuesta:", JSON.parse(responseText));
    } else {
      console.error("Error en la respuesta:", responseText);
    }
  } catch (error) {
    console.error("Error en el registro:", error);
  }
};

testAPI();
