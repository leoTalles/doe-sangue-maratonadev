//definindo variáveis//
const express = require("express")
const server = express()

//configurar o servidor para apresentar estáticos//
server.use(express.static('public'))

//Habilitando body do form//
server.use(express.urlencoded({ extended: true}))

//configurando a template engine//
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true, //boolean, aceita apenas 2 valores, true ou falso//
})

//Agrupamento de Dados//
//lista de doadores : Vetor ou Array//
const donors = [
    {
        name: "Diego Fernandes",
        blood: "AB+"
    },
    {
        name: "Cleiton Souza",
        blood: "B+"
    },
    {
        name: "Robson Marques",
        blood: "O+"
    },
    {
        name: "Mayk Brito",
        blood: "A-"
    },

]

//configurar apresentação da página//
server.get("/", function(req, res) {
    return res.render("index.html", { donors })
})

server.post("/", function(req, res){
    //pegar dados do form//
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    //coloco valores no array//
    donors.push({
        name: name,
        blood: blood,
        //email: email, 
    })

    return res.redirect("/")

})

//Ligar servidor e permitir o acesso a porta//
server.listen(3000, function(){
    console.log("iniciei o bglh")
})
