class Produto {

    constructor() {
      this.id = 1;
      this.arrayProdutos = [];
      this.editId = null;
    }

    salvar() {
       let produto = this.lerDados();
       
       if(this.validaCampo(produto) == true) {
        if(this.editId == null){
            this.adicionar(produto)
        } else {
            this.atualizar(this.editId, produto)
        }
        
       }

       this.listaTabela()
       this.cancelar()
    
    }

    listaTabela() {
        let tbody = document.getElementById('tbody')
        tbody.innerText = ''

        for(let i = 0; i < this.arrayProdutos.length; i++ ){
             let tr = tbody.insertRow();

             let td_id = tr.insertCell()
             let td_produto = tr.insertCell()
             let td_valor =  tr.insertCell()
             let td_acoes = tr.insertCell()

             td_id.innerText = this.arrayProdutos[i].id
             td_produto.innerText = this.arrayProdutos[i].nomeProduto
             td_valor.innerText = this.arrayProdutos[i].valor

             td_id.classList.add('center')

             let imgEdit = document.createElement('img')
             imgEdit.src = './img/editar-codigo.png'
             imgEdit.setAttribute("onclick", "produto.preparaEditacao("+ JSON.stringify(this.arrayProdutos[i]) +")")

             let imgDelete = document.createElement('img')
             imgDelete.src = './img/botao-de-deletar.png'
             imgDelete.setAttribute("onclick", "produto.deletar("+this.arrayProdutos[i].id+")");

             td_acoes.appendChild(imgEdit)
             td_acoes.appendChild(imgDelete)

             console.log(this.arrayProdutos)

        }
    }

    adicionar(produto) {
        this.arrayProdutos.push(produto)
        this.id++

    }

    atualizar(id, produto) {
        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto
                this.arrayProdutos[i].valor = produto.valor
            }
        }
    }

    preparaEditacao(dados) {
        this.editId = dados.id

        document.getElementById('produto').value = dados.nomeProduto
        document.getElementById('valor').value = dados.valor
        document.getElementById('btn1').innerText = 'Atualizar'
    }


    
    lerDados() {
    let produto = {}
    
    produto.id = this.id;
    produto.nomeProduto = document.getElementById('produto').value;
    produto.valor = document.getElementById('valor').value;

    return produto
    }

    validaCampo(produto) {
        let msg = ''

    if(produto.nomeProduto == '') {
        msg += '- Informe o nome do Produto \n'
    }
    if(produto.valor == '') {
        msg += '- Informe o valor do Produto \n'
    }
    if(msg != '') {
        alert(msg)
        return false
    }

    return true
}

    cancelar() {
      document.getElementById('produto').value = ''
      document.getElementById('valor').value = ''
    }
    deletar(id) {
        if(confirm('Deseja realmente deletar o produto do ID' + id)) {

        }
        let tbody = document.getElementById('tbody')

        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos.splice(i, 1)
                tbody.deleteRow(i)
            }
        }

     console.log(this.arrayProdutos)
   }
}



var produto = new Produto()