const notAllowed = (res) => {
    return res.status(500).send("Campos não editaveis");
};

module.exports = { notAllowed };
