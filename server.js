//definindo variáveis//
const express = require("express")
const server = express()

//configurar o servidor para apresentar estáticos//
server.use(express.static('public'))

//Habilitando body do form//
server.use(express.urlencoded({ extended: true}))

//configurar a conexão com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '1008',
    host: 'localhost',
    port: 5432,
    database: 'doe',
})


//configurando a template engine//
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true, //boolean, aceita apenas 2 valores, true ou falso//
})

//configurar apresentação da página//
server.get("/", function(req, res) {
    
    db.query("SELECT * FROM donors", function(err, result) {
        if (err) return res.send("Erro de banco de dados.")

        const donors = result.rows
        
        return res.render("index.html", { donors })
    })


})

server.post("/", function(req, res){
    //pegar dados do form
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    //se name igual a vazio
    //ou name igual a vazio
    // ou blood igual a vazio
    if (name == "" || email == "" || blood == ""){
        return res.send("Todos os campos são obrigatórios.")
    }

    //coloco valores dentro do banco de dados.
    const query = `
        INSERT INTO donors ("name", "email", "blood") 
        VALUES ($1, $2, $3)`

    const values = [name, email, blood]    
    
    
    db.query(query, values, function(err){
        //fluxo de erro
        if (err) return res.send("Erro no banco de dados.")

        //fluxo ideal
        return res.redirect("/")
    })


    

})

//Ligar servidor e permitir o acesso a porta//
server.listen(3000, function(){
    console.log("iniciei o bglh")
})
