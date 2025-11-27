import express from "express";
const app = express();

app.use(express.json());

// Lista de produtos e códigos
const itens = {
"aipim com casca": "001",
"aipim descascado": "002",
"alface unidade": "003",
"abobora": "004",
"alho": "005",
"batata branca": "006",
"batata rosa": "007",
"batata promocao": "008",
"brocolis unidade": "009",
"beterraba molho": "010",
"cenoura kg": "011",
"cebola": "012",
"chuchu": "013",
"couve unidade": "014",
"couve flor": "015",
"espinafre": "016",
"moranga": "017",
"milho com 3 unidades": "018",
"batata doce": "019",
"pimentao": "020",
"pepino salada": "021",
"repolho": "022",
"rabanete molho": "023",
"rucula": "024",
"rabanete": "025",
"tomate": "026",
"tempero verde": "027",
"vagem": "028",
"gengibre": "029",
"pinhao": "030",
"agriao": "031"
};

// Página inicial
app.get("/", (req, res) => {
res.send("Servidor ativo e funcionando!");
});

// Endpoint para testar código pelo navegador ou Postman
app.get("/codigo/:item", (req, res) => {
const item = req.params.item.toLowerCase();
const codigo = itens[item];
if (codigo) {
res.json({ item, codigo });
} else {
res.json({ erro: "Item não encontrado" });
}
});

// Endpoint para Alexa
app.post("/api/alexa", (req, res) => {
const request = req.body;
let produtoNome = null;

try {
const intent = request.request.intent;
if (intent && intent.slots && intent.slots.produto && intent.slots.produto.value) {
produtoNome = intent.slots.produto.value.toLowerCase();
}
} catch (err) {
console.log("Erro ao ler o slot:", err);
}

let respostaTexto;
if (produtoNome && itens[produtoNome]) {
respostaTexto = `O código de ${produtoNome} é ${itens[produtoNome]}`;
} else {
respostaTexto = "Desculpe, não encontrei o código desse produto.";
}

return res.json({
version: "1.0",
response: {
shouldEndSession: false,
outputSpeech: {
type: "PlainText",
text: respostaTexto
}
}
});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Servidor rodando na porta " + port));
