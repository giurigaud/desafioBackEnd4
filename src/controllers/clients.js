const response = require("../utils/response");
const clientDB = require("../repositories/clients");

const createClient = async (ctx) => {
  const { nome, cpf, email, tel } = ctx.request.body;

  if (!nome || !cpf || !email || !tel) {
    return response(ctx, 400, { message: "Por favor, insira todos os dados!" });
  }
  /**
   * Verificar a existencia do usuario
   */
  const existenClient = await clientDB.clientVerification(email);

  if (existenClient) {
    return response(ctx, 400, {
      message: "Email já cadastrado, por favor, utilize outro!",
    });
  }

  const createClientController = await clientDB.createClient(
    ctx.tokenData.id,
    nome,
    cpf,
    email,
    tel
  );

  return response(ctx, 201, createClientController);
};

module.exports = { createClient };
