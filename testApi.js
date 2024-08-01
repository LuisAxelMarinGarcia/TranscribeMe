const fetch = require('node-fetch');

const testAPI = async () => {
  const transcriptionData = {
    teacher: "roberto@gmail.com",
    clas: "soa",
    class_id: "389e1eed-53c1-469f-a04c-e0947a296f3b",
    transcription: "Hola esta es una transcripcion 2"
  };

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1NTUyOTc3LTIwZTctNDQ0Mi1hNzMzLWQxOTJjYmJkODhiMyIsImVtYWlsIjoianVsaWV0YUBnbWFpbC5jb20iLCJpYXQiOjE3MjI0MzY5NDUsImV4cCI6MTcyMjUyMzM0NX0.TNf1oA3XzojQh7fNm9WZ__ZMU-dkcV09t4Iql2OaSIA";

  try {
    const response = await fetch('https://transcribeme-transcripciones.integrador.xyz:3001/transcription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(transcriptionData)
    });

    const responseText = await response.text();
    console.log("Texto de respuesta del servidor:", responseText);

    if (response.ok) {
      console.log("Datos de respuesta:", JSON.parse(responseText));
    } else {
      console.error("Error en la respuesta:", responseText);
    }
  } catch (error) {
    console.error("Error en la transcripción:", error);
  }
};

testAPI();
