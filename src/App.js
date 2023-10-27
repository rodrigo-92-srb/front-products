
import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  const produto = {
    id: 0,
    name: '',
    brand: ''
  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  useEffect(() => {
    fetch("http://localhost:8080/products/list")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  const aoDigitar = (e) => {
    setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
  }

  const cadastrar = () => {
    fetch('http://localhost:8080/products/create', {
      method: 'post', body: JSON.stringify(objProduto),
      headers: { 'Content-type': 'application/json', 'Accept': 'application/json' }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.message !== undefined) {
          alert(retorno_convertido.message);
        } else {
          setProdutos([...produtos, retorno_convertido]);
          alert('Produto cadastrado com sucesso!');
          limparFormulario()
        }
      })
  }

  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  const remover = () => {
    fetch('http://localhost:8080/products/delete/' + objProduto.id, {
      method: 'delete',
      headers: { 'Content-type': 'application/json', 'Accept': 'application/json' }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {

        alert(retorno_convertido.message);

        let vetorTemp = [...produtos];

        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.id;
        });

        vetorTemp.splice(indice, 1);

        setProdutos(vetorTemp);

        limparFormulario();

      })
  }

  const atualizar = () => {
    fetch('http://localhost:8080/products/update', {
      method: 'put', body: JSON.stringify(objProduto),
      headers: { 'Content-type': 'application/json', 'Accept': 'application/json' }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.message !== undefined) {
          alert(retorno_convertido.message);
        } else {

          alert('Produto atualizado com sucesso!');

          let vetorTemp = [...produtos];

          let indice = vetorTemp.findIndex((p) => {
            return p.codigo === objProduto.id;
          });

          vetorTemp[indice] = objProduto;

          setProdutos(vetorTemp);

          limparFormulario();
        }
      })
  }

  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} atualizar={atualizar} cancelar={limparFormulario} remover={remover} obj={objProduto}></Formulario>
      <Tabela vetor={produtos} selecionar={selecionarProduto}></Tabela>
    </div>
  );
}

export default App;
