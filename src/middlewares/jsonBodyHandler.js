export async function jsonBodyHandler(request, response) {
  const buffers = [];

  //Coleta os chunks de dados da requisicao
  for await (const chunk of request) {
    buffers.push(chunk);
  }

  try {
    // Concatenar os chunks e converte para string, em seguida converte para JSON
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    request.body = null;
  }

  // Define o header de resposta com json
  response.setHeader("Content-Type", "application/json");
}
