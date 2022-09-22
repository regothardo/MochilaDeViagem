//capturar formulário
const form=document.getElementById('novoItem');
/*
***
document.getElementByID - retornar um elemento do DOM que 
é identificado por um ID específico.

No caso acima, vai capturar o formulário e que tiver dentro dele.
***
console.log(document.getElementById('novoItem'));
*/

//vai capturar a ul
const lista=document.getElementById('lista');

//caso contrário gerará um erro 
/*
localStorage.getItem() - recuperar o valor de uma 
chave gravada anteriormente pelo setItem().
*/
const itens= JSON.parse(localStorage.getItem('itens'))||[];

/*
***
mostra o array
***
console.log(itens);
*/
itens.forEach(elemento=> {

    /*
    console.log(elemento);
    */
    criarElemento(elemento)
});

/*
***
Se fizer o evento forEach para itens sem fazer a conversão 
do JSON para o JavaScript, aparecerá o erro abaixo

"Uncaught TypeError: itens.forEach is not a 
function"

Para resolver essa situação, tem que converter as 
informações presentes na variável itens de JSON (string) para JavaScript (array)
por meio do comando JSON.parse()

***
    itens.forEach(elemento=>
    console.log(elemento));

*/

form.addEventListener('submit', (evento)=>{
    //interromper funcionamento padrão para pegar os dados do formulário
    evento.preventDefault();
    //evento se refere aos dados do formulário
    console.log(evento);
    /*
    ***
    aparece o valor do campo nome
    ***
    console.log(evento.target[0].value);
    */
    
    /*
    ***
    aparece o valor quantidade
    ***
    console.log(evento.target[1].value);
    */

    const nome = evento.target.elements['nome'];
    const quantidade =  evento.target.elements['quantidade'];

    const itemAtual={
        'nome':nome.value,
        'quantidade':quantidade.value
    }

    //para verificar se o item existe por meio do nome
    /* 
    a const existe é um objeto
    
    Valor booleno para objetos
    O valor passado como primeiro parâmetro é convertido para um valor boleano, se necessário. 
    Se o valor é omitido ou é 0, -0, null, false, NaN, undefined ou é uma string vazia(""), 
    o objeto terá um valor inicial de false. 
    
    Todos outros valores, incluindo qualquer objeto ou string "false",  
    criam um objeto com valor inicial  true.

    Qualquer objeto cujo o valor não é undefined ou null, incluindo um objeto Boolean que o valor seja false,
     é avaliado para ***true*** quando passa por uma declaração condicional. 

    Mais informações em 
    https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Boolean#descri%C3%A7%C3%A3o

    */
    const existe=itens.find(elemento=>elemento.nome===nome.value)

    console.log(existe);

    if(existe){
        //se encontrado atualiza o valor do elemento
        // a busca é efetuada pelo id
        itemAtual.id=existe.id;
        //para comprovar que existe o item e informa o id dele


        console.log(existe.id);

        atualizaElemento(itemAtual);
        /*para atualizar o local Storage, caso contrário permanecerá 
        a quantidade inicialmente inserida quando o item foi criado.
        */
        itens[itens.findIndex(elemento=> elemento.id===existe.id)]=itemAtual;
    }else{
        //se não é encontrado, cria um elemeno do zero
        //o tamanho do array passa a ser o valor id do novo elemento
        itemAtual.id = itens[itens.length -1] ? itens[itens.length-1].id+1: 0
        
            /*
        ***
        aparece o valor do campo nome usando o campo "name" do input
        ***
        console.log(nome);
        console.log(quantidade);
        */

        criarElemento(itemAtual);
        itens.push(itemAtual);
    }
    

    //para visualizar as informações no Local Storage, tem que passar em JSON(em string)
    localStorage.setItem('itens', JSON.stringify(itens));


    //para esvaziar o campo assim que enviar as informações
    nome.value='';
    quantidade.value='';

});

function criarElemento(item){
    /*
    ***
    Aparece o nome do item criado
    ***
    console.log(item.nome);
    */

    /*
    ***
    Aparece a quantidade do item criado
    ***
    console.log(item.quantidade);
    */
    
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem=document.createElement('strong');
    numeroItem.innerHTML=item.quantidade;

    //para criar o id no JavaScript 
    numeroItem.dataset.id=item.id

    console.log(numeroItem);

    novoItem.appendChild(numeroItem);

    novoItem.innerHTML+=item.nome;

    console.log(novoItem);

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);

    
    /*
    ***
    localStorage.setItem - Esse método te permite 
    gravar os valores dentro do localStorage no browser do usuário.
    ***
    */

    localStorage.setItem('nome', item.nome);
    localStorage.setItem('quantidade', item.quantidade);

    //novoItem.appendChild(botaoDeleta());
    
}

/*busca efetuada pelo ID existente para atualizar a quantidade de
um elemento já existente
*/
function atualizaElemento(item){
    /* a linha comentada  abaixo foi  uma tentativa de somar o valor já existente
    let quantidadeAntiga= document.querySelector('[data-id="'+item.id+'"]').innerHTML;
    */
    document.querySelector('[data-id="'+item.id+'"]').innerHTML=item.quantidade;
    /* a linha comentada  abaixo foi  uma tentativa de somar o valor já existente
    document.querySelector('[data-id="'+item.id+'"]').innerHTML=quantidadeAntiga+item.quantidade;
    */
}

function botaoDeleta(id){
    const elementoBotao=document.createElement('button');
    elementoBotao.innerText='x';

    /*tem que adicionar o evento porque o botão foi
    criado dinamicamente (via JavaScript)

    não dá para usar arrow function porque não carrega o this para frente
    neste caso tem que usar function() mesmo
    */

    elementoBotao.addEventListener('click',function(){
        //para remover o elemnto inteiro tem que usar o parentNode
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao;

}

//recebe um parâmetro(elemento do HTML - TAG) e vai remover a TAG
function deletaElemento(tag, id){
    tag.remove();

    /*
    remove o elemento encontrado no findIndex
    encontra o index de um elemnto qualquer
    */
    itens.splice(itens.findIndex(elemento=> elemento.id===id),1);

    //para ver o id do item excluído no console
    console.log(id);

    //para ver a lista atualizada de itens
    console.log(itens);

    //atualizar o localStorage
    localStorage.setItem('itens', JSON.stringify(itens));
}

/*remover o item e escrever no local Storage

o que queremos remover

splice() - funciona no índice do Array
índice é o ID - precisa receber o ID
para receber o ID é preciso enviá-lo

Se o ID é um parâmetro na função tembém tem que ser um parâmetro para o botão

*/


