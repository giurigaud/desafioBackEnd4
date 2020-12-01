const db = require("../utils/database");

const clientVerification = async (email) => {
  const result = await db.query({
    text: `SELECT * FROM clients WHERE email = $1`,
    values: [email],
  });

  return result.rows[0];
};

const createClient = async (user_id, nome, cpf, email, tel) => {
  const result = await db.query({
    text: `INSERT INTO clients (user_id, nome, cpf, email, tel)
            VALUES ( $1, $2, $3, $4, $5 )
            RETURNING *`,
    values: [user_id, nome, cpf, email, tel],
  });

  return result.rows;
};

const updateClient = async (user_id, nome, cpf, email) => {
  const result = await db.query({
    text: `UPDATE clients SET
          nome = $1,
          cpf = $2,
          email = $3
          WHERE user_id = $4
          RETURNING *`,
    values: [nome, cpf, email, user_id],
  });

  return result.rows;
};
module.exports = { clientVerification, createClient, updateClient };
