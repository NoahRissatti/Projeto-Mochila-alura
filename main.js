const inputNome = document.querySelector("#nome")
const inputQuantidade = document.querySelector("#quantidade")
const formulario = document.querySelector("form")
const lista = document.querySelector("ul")
var objetos = JSON.parse(localStorage.getItem('itens')) || []

objetos.forEach(element => {
    criarItemNovo(element)
});

formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    
    const itemObjeto = {
        "nome": inputNome.value,
        "quantidade": inputQuantidade.value,
    }

    if(verificarSeExiste(itemObjeto) == undefined){
        criarItemNovo(itemObjeto)
        objetos.push(itemObjeto)
    }else{
        atualizarItem(verificarSeExiste(itemObjeto),itemObjeto)
    }

    localStorage.setItem('itens',JSON.stringify(objetos))

    inputNome.value = ''
    inputQuantidade.value = ''
})

function criarItemNovo(item){
    const itemNovo = document.createElement("li")
    const strongNovo = document.createElement("strong")

    strongNovo.innerHTML = item.quantidade
    itemNovo.appendChild(strongNovo)
    itemNovo.innerHTML += item.nome
    itemNovo.classList.add("item")
    itemNovo.appendChild(botaoDeletar())

    lista.appendChild(itemNovo)
}

function botaoDeletar(){
    const botao = document.createElement("button")
    botao.innerHTML = "X"
    botao.classList.add("excluir")
    botao.addEventListener("click",function(){
        objetos.forEach((elemento)=>{
            if(this.parentElement.innerHTML.split("</strong>")[1].split("<button")[0] == elemento.nome){
                objetos.splice(objetos.indexOf(elemento),1)
                localStorage.setItem('itens',JSON.stringify(objetos))
            };
        })
        this.parentElement.remove()
    })

    return botao
}

function verificarSeExiste(item){
    for (let index = 0; index < lista.children.length; index++) {
        const nomeItem = lista.children[index].innerHTML.split("</strong>")[1].split("<button")[0];
        if(item.nome === nomeItem){
            return lista.children[index]; 
        }
    }
}

function atualizarItem(itemAntes, itemDepois){
    itemAntes.children[0].innerHTML = itemDepois.quantidade;
    objetos.forEach((elemento)=>{
        if(itemAntes.innerHTML.split("</strong>")[1] == elemento.nome){
            elemento.quantidade = itemAntes.children[0].innerHTML
        };
    })
    
}
