//definindo variáveis//
const express = require("express")
const server = express()

//configurar o servidor para apresentar estáticos//
server.use(express.static('public'))

//configurando a template engine//
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server
})

//configurar apresentação da página//
server.get("/", function(req, res) {
    return res.render("index.html")
})

//Ligar servidor e permitir o acesso a porta//
server.listen(3000, function(){
    console.log("iniciei o bglh")
})
