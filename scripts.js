//Variáveis no escopo global *############################################---Visual---#############################################*/
let nfOrder = 0
let order = 0

//------jQuery---------//
/* 
--------------------------------------------------------------------------------------------
Função para trocar o texto do btnOders
--------------------------------------------------------------------------------------------
*/
$(function swtBtnTxt(){
  $("#btnOrders").click(function () {
     $(this).text(function(i, text){
         return text === "Mostrar Pedidos" ? "Ocultar Pedidos" : "Mostrar Pedidos";
     })
  });
})


/*-------------------------------------------------------------------------------------------------*/
//  Funções para habilitar a One Page Aplication (hide n show)
//---------------------------------------------------------------------------------------------------//


function switchVisibleOrder() {

  if (document.getElementById('menu-2')) {
    

    if (document.getElementById('menu-2').style.display == 'none') {
        document.getElementById('menu-2').style.display = 'block';
        document.getElementById('menu-1').style.display = 'none';
        document.getElementById('input-2').style.display = 'block';
      
    }
    else {
        document.getElementById('menu-2').style.display = 'block';
        document.getElementById('menu-1').style.display = 'none';
        document.getElementById('input-2').style.display = 'block';
        document.getElementById('menu-2').style.display = 'block';


    }
}
}

// ------------------------------------------------------------------------------------------------------
function switchVisibleTxt() {
 
  if (document.getElementById('txtArea')) {
    

    if (document.getElementById('txtArea').style.display == 'none') {
        document.getElementById('txtArea').style.display = 'block';
        document.getElementById('menu-2').style.display = 'none';
        document.getElementById('input-2').style.display = 'none';
        document.getElementById('input-1').style.display = 'none';

        
    }
    else {
        document.getElementById('txtArea').style.display = 'none';
        document.getElementById('menu-2').style.display = 'none';
        document.getElementById('input-1').style.display = 'block';

    }
}
}

// --------------------------------------------------------------------------------------------------
function switchVisibleMenu() {
 
  if (document.getElementById('menu-1')) {
    

    if (document.getElementById('menu-1').style.display == 'none') {
        document.getElementById('menu-1').style.display = 'block';
        document.getElementById('input-1').style.display = 'block';
        document.getElementById('menu-2').style.display = 'none';
        document.getElementById('input-2').style.display = 'none';

        
        
    }
    else {
        document.getElementById('menu-1').style.display = 'none';
        document.getElementById('menu-2').style.display = 'none';
        document.getElementById('input-2').style.display = 'none';


    }
}
}


/*############################################---Get's---#############################################*/
/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de pedidos existentes do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getOrders = async () => {
  let url = 'http://127.0.0.1:5000/pedidos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.pedidos.forEach(order => insertListOrder(order.nf, order.cpf_cliente, order.nome_cliente, order.telefone_cliente, order.endereco_cliente, order.valor, order.data_insercao))
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/

getOrders()

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de produtos de cada pedido e comentários existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getOrder = async (nfOrder) => {
  console.log("nf pedido do getOrder:",nfOrder)
  getComments(nfOrder) //aqui ele já chama a função para povoar a lista de comentários
  let url = 'http://127.0.0.1:5000/produtos_pedido?pedido_nf=' + nfOrder;
  fetch(url, {
    method: 'get'
  }).then((response) => response.json())
    .then((data) =>{
      data.produtos.map(produto => insertItens(produto.id, produto.nome, produto.quantidade, produto.valor, produto.valor_total))

})
.catch((error) => {
  console.error('Error:', error);
});
}

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de comentários de cada pedido
  --------------------------------------------------------------------------------------
*/

const getComments = async (nfOrder) => {
  console.log("nf pedido do getOrder:",nfOrder)
  let url = 'http://127.0.0.1:5000/comentarios_pedido?pedido_nf=' + nfOrder;
  fetch(url, {
    method: 'get'
  }).then((response) => response.json())
    .then((data) =>{
      data.comentarios.map(comentario => insertComments(comentario.id, comentario.texto))

})
.catch((error) => {
  console.error('Error:', error);
});
}




/*############################################---Post's---############################################*/


/*
  --------------------------------------------------------------------------------------
  Função para colocar um novo Pedido na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postOrder = async (inputCPF, inputClient, inputAddress, inputMobile) => {
  const formData = new FormData();
  formData.append('cpf_cliente', inputCPF);
  formData.append('nome_cliente', inputClient);
  formData.append('endereco_cliente', inputAddress);
  formData.append('telefone_cliente', inputMobile);

  let url = 'http://127.0.0.1:5000/pedido';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar o item de Pedido na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputNf, inputName, inputQuantity, inputValue) => {
  const formData = new FormData();
  console.log("nf PostItem", inputNf)
  formData.append('pedido_nf', inputNf);
  formData.append('nome', inputName);
  formData.append('quantidade', inputQuantity);
  formData.append('valor', inputValue);

  let url = 'http://127.0.0.1:5000/produto';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar o comentário de Pedido na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
// */
const postComment = async (nfOrderTxt, txt) => {
  
  const formData = new FormData();
  formData.append('pedido_nf',nfOrderTxt);
  formData.append('texto',txt);
  


  console.log("nota e comentário: ",nfOrderTxt, txt)
  let url = 'http://127.0.0.1:5000/comentario'
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
   
}

/*############################################---Inserts---############################################*/


/*
  --------------------------------------------------------------------------------------
  Função para inserir Pedidos na lista Pedidos apresentada
  --------------------------------------------------------------------------------------
*/
const insertListOrder = (orderNF, clientCPF, clientName, clientMobile, clientAddress, orderValue, date) => {
  var item = [orderNF, clientCPF, clientName, clientMobile, clientAddress, orderValue, date]


  let table = document.getElementById('orderTable');
  for (var i = 0; i < table.length; i++){
    document.getElementById("orderTable").deleteRow(i)
  }  
  console.log("Table de orders",table.getElementsByTagName("td").length)
  
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
    row.onclick = () => getOrderRow(item[0]);

    }
   
  insertButtonAdd(row.insertCell(-1))
  insertButtonCloseOrder(row.insertCell(-1))
  document.getElementById("orderNF")
  document.getElementById("clientCPF")
  document.getElementById("clientMobile")
  document.getElementById("clientMobile")
  document.getElementById("clientName")
  document.getElementById("orderValue")
  
  addComment()
  removeOrder()
 

}

/*
  --------------------------------------------------------------------------------------
  Função para colocar o item de Pedido na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertItens = (itemId, itemName, itemQuantity, itemValue, itemTotalValue,) => {
  var item = [itemId, itemName, itemQuantity, itemValue, itemTotalValue]
  let table = document.getElementById('itemTable');

  if(table != undefined && table.length != null){
  for (var i = 0; i < table.length; i++){
    document.getElementById("itemTable").deleteRow(i)
  }  
}
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
     
  }

  insertButtonCloseItem(row.insertCell(-1))
  document.getElementById("itemNF")
  document.getElementById("itemName")
  document.getElementById("itemQuantity")
  document.getElementById("itemValue")
  document.getElementById("itemTotalValue")
  
  removeItem()

}

/*
  --------------------------------------------------------------------------------------
  Função para colocar o comentário do Pedido na lista apresentada
  --------------------------------------------------------------------------------------
*/

const insertComments = (id, text) => {
  var item = [id, text]
  let table = document.getElementById('commentsTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButtonCloseComment(row.insertCell(-1))
  document.getElementById("text")

  removeComment()
  }


/*############################################---Btn's---############################################*/

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButtonCloseItem = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u2716");
  span.className = "closeItem";
  span.title = "Clique para remover o item :(";
  
  span.appendChild(txt);
  parent.appendChild(span);

}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada pedido da lista
  --------------------------------------------------------------------------------------
*/
const insertButtonCloseOrder = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u2716");
  span.className = "closeOrder";
  span.title = "Clique para remover o pedido :(";
  
  span.appendChild(txt);
  parent.appendChild(span);

}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada comentário da lista
  --------------------------------------------------------------------------------------
*/
const insertButtonCloseComment = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u2716");
  span.className = "closeComment";
  span.title = "Clique para remover o comentário :(";
  
  span.appendChild(txt);
  parent.appendChild(span);

}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão addTxt para cada item da lista de comentários
  --------------------------------------------------------------------------------------
*/
const insertButtonAdd = (parent) => {
  
  let span = document.createElement("span");
  let txt = document.createTextNode("\u271A");
  span.className = "addTxt";
  span.title = "Clique para adicionar um comentário neste pedido!";

  span.appendChild(txt);
  parent.appendChild(span);
}

// ########################################--Removes---######################################################
/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de produtos de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeItem = () => {
  let close = document.getElementsByClassName("closeItem");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const Item = div.getElementsByTagName('td')[0].innerHTML
      
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(Item)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de comentários de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeComment = () => {
  let close = document.getElementsByClassName("closeComment");
  //var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const Comment = div.getElementsByTagName('td')[0].innerHTML
      
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteComment(Comment)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um pedido da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/

const removeOrder = () => {
  let close = document.getElementsByClassName("closeOrder");
  //var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const Order = div.getElementsByTagName('td')[0].innerHTML
      
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteOrder(Order)
        alert("Removido!")
      }
    }
  }
}

// #######################################---------Deletes------#################################################

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteOrder = (id) => {
  console.log(id)
  let url = 'http://127.0.0.1:5000/pedido?nf=' + id;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}
/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteComment = (id) => {
  console.log(id)
  let url = 'http://127.0.0.1:5000/comentario?id=' + id;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}
/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (id) => {
  console.log(id)
  let url = 'http://127.0.0.1:5000/produto?id=' + id;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

// #######################################---------Add & New-------#################################################


/*
  // --------------------------------------------------------------------------------------
  // Função para adicionar habilitar a func() para mostrar a caixa de texto do comentário de acordo com o click do mouse (para cada pedido)
  // --------------------------------------------------------------------------------------
*/
const addComment = () => {
  let orderTxt = document.getElementsByClassName("addTxt");
  let i
  for (i = 0; i < orderTxt.length; i++) {
    orderTxt[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const orderTxt = div.getElementsByTagName('td')[0].innerHTML
  
      switchVisibleTxt();
      self.nfOrder = orderTxt
} 
}
}


/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo pedido com nome, CPF, endereço e telefone do cliente 
  --------------------------------------------------------------------------------------
*/

const newOrder = () => {
  let inputCPF = document.getElementById("newCPF").value;
  let inputClient = document.getElementById("newClient").value;
  let inputAddress = document.getElementById("newAddress").value;
  let inputMobile = document.getElementById("newMobile").value;
  
  if       (inputClient === '') {
    alert("Escreva o nome do Cliente!");
  }else if (inputAddress === '') {
    alert("O endereço não pode ser nulo!");    
  } else if (isNaN(inputCPF) || isNaN(inputMobile)) {
    alert("O CPF do cliente e o telefone precisam ser somente números!");
  } else {
    postOrder(inputCPF, inputClient, inputAddress, inputMobile)
    alert("Pedido Registrado!");
    alert("Não se esqueça de adicionar produtos ao Pedido!")
    getOrders();
    
  }
}

/*
   --------------------------------------------------------------------------------------
   Função para adicionar um novo item com nome, quantidade e valor 
   --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputName = document.getElementById("itemName").value;
  let inputQuantity = document.getElementById("itemQtd").value;
  let inputValue = document.getElementById("itemValue").value;
  const selectionOrd = order
  
  
  
  
  if  (selectionOrd == null || selectionOrd == undefined || selectionOrd == 0){
    alert("Problema no sistema")
  } else  if       (inputName === '') {
    alert("Escreva o nome do Produto!:  ");
  } else if (inputQuantity === '') {
    alert("O endereço não pode ser nulo!");    
  } else if (isNaN(inputQuantity) || isNaN(inputValue)) {
    alert("Os campos de quantidade e valor precisam ser somente números!");
  } else {
    postItem(selectionOrd, inputName, inputQuantity, inputValue)
    alert("Produto Registrado!");
    getOrder(selectionOrd);
    
  }
}







/*############################################---Btn's App---############################################*/

function getOrderRow(row) {
  order = row
  if(row){
    console.log("nf pedido do orderRow:",order)
}else{
  alert("Por favor, selecione um pedido na lista!")
}
      
}
/**-------------------------------------------------------------------------------------------------------
 * Button p/ dar "commit" no comentário
 * ------------------------------------------------------------------------------------------------------
 */



function addCommentBtn(){
  let txt = document.getElementById("txt").value;
  let nfOrderTxt = self.nfOrder;
  if(nfOrderTxt == 0 || NaN){
    alert("Erro, selecione um item na lista")
  }else if(confirm("Deseja adicionar o comentário:\n" + txt +"\nNf do pedido: "+ nfOrderTxt)){
      
  postComment(nfOrderTxt, txt)
  getComments(nfOrderTxt)
  insertComments(nfOrderTxt)
  switchVisibleTxt()
  this.nfOrder,nfOrderTxt = 0;
  txt, document.getElementById("txt").value = "";
  alert("Adicionado!")
    
    

}else{
  alert("Cancelado!")
}
}

/*
   --------------------------------------------------------------------------------------
   Button p/ ver detalhes do pedido
   --------------------------------------------------------------------------------------
*/

function orderDetails(){
 table = document.getElementById("orderTable").length
  if(order == undefined || NaN || order == ''||order == null || order == 0 ){
    alert("Por favor, selecione um item na lista!")
   
  }else if (confirm("Você selecionou o pedido NF:  "+order)){
           console.log('getOrderRow', order)
           switchVisibleOrder()
          getOrder(order)
          // document.getElementById("ordBtn").style.display = 'none';
    

    }else{
      alert("Cancelado!")
      order = 0;
      console.log("nf pedido cancelado:",order)
    }
  }



//  #############################################################################################################################################################   
//  #############################################################################################################################################################