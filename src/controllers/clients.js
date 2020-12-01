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
const updateClient = async (ctx) => {
  const { nome = null, cpf = null, email = null } = ctx.request.body;
  const { id = null } = ctx.params;

  const result = await clientDB.updateClient(id, nome, cpf, email);

  if (result === undefined) {
    return response(ctx, 404, "Cliente não existe, insira outro id");
  }
  return response(ctx, 200, result);
};

module.exports = { createClient, updateClient };
