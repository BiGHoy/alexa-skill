import express from "express";
const app = express();

app.use(express.json());

// Rota da Alexa
app.post("/api/alexa", (req, res) => {
  console.log("Requisição recebida da Alexa:", req.body);

  return res.json({
    version: "1.0",
    response: {
      shouldEndSession: false,
      outputSpeech: {
        type: "PlainText",
        text: "Servidor Railway respondendo com sucesso!"
      }
    }
  });
});

// Página inicial
app.get("/", (req, res) => {
  res.send("Servidor ativo e funcionando!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Rodando na porta " + port));
