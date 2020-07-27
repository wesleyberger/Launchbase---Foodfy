const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

// configurando dados de receitas
const recipes = require("./data")

// template engine
server.set("view engine", "njk"     )
nunjucks.configure("pages", {
    express: server
})  
// styles
server.use(express.static('public'))
server.use(express.static('public/styles'))
server.use(express.static('public/assets'))
// configurando "index"
server.get("/", function(req, res){
    return res.render("index", { items: recipes })
})
// configurando "sobre"
server.get("/sobre", function(req, res){    
    return res.render("sobre")
})
// configurando receitas
server.get("/receitas", function(req, res){
    return res.render("receitas", { items: recipes })
})
// page receita
server.get("/receitas/:index", function(req, res){
    const recipeIndex = req.params.index; // numero parametro vindo no index  
    const recipe = recipes[recipeIndex]; // executar numero do parametro no array recipes.data, selecionando os dados corretos 

    return res.render("receita", { recipe });
})  
// not-found 404
server.use(function(req, res){
    res.status(404).render("not-found")
})
// configurando porta 5000
server.listen(3000, function(){ 
    console.log("Server is RUNNING!!! !:^:!")
})