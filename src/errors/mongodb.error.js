const dbError = (res) => {
    return res
        .status(404)
        .send("Este dado não foi encontrado no banco de dados.");
};

const objectCastIdError = (res) => {
    return res
        .status(500)
        .send("O id informado nao foi encontrado no banco de dados.");
};
module.exports = { dbError, objectCastIdError };
