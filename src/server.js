const express = require("express")
const server = express()

//acesso ao banco de dados
const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public"))

//habilitar req.body
server.use(express.urlencoded({ extended: true }))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos
//req: requisição
//res: resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})
server.get("/create-point", (req, res) => {
    //pegar query sctring do form
    console.log(req.query)
    return res.render("create-point.html")
})

server.post("/savepoint", (req,res) => {
    //console.log(req.body)
    //inserir dados no db
    const query = `INSERT INTO places (image,name,address,address2,state,city,items) VALUES (?,?,?,?,?,?,?);`
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items]
    
    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no cadastro")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", { saved: true })
    } 
    db.run(query, values, afterInsertData)    
})

server.get("/search", (req, res) => {
    const search = req.query.search
    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err){
            return console.log(err)
        }
/*         console.log("Aqui estão seus registros: ")
        console.log(rows) */
        const total = rows.length
        if(search == "") {   
            const cidade = "todas as cidades cadastradas"
            return res.render("search-results.html", { places: rows, total: total, cidade: cidade })
        }
        else {
            //mostrar a página html com os dados do banco de dados
            return res.render("search-results.html", { places: rows, total: total, cidade: search })
        }

    })
    
})

//ligar o servidor
server.listen(3000)