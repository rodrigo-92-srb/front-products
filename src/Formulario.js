function Formulario({ botao, eventoTeclado, cadastrar, atualizar, obj, cancelar, remover }) {
  return (
    <form>
      <input type="text" value={obj.name} onChange={eventoTeclado} name="name" placeholder="nome" className="form-control" />
      <input type="text" value={obj.brand} onChange={eventoTeclado} name="brand" placeholder="marca" className="form-control" />

      {
        botao
          ?
          <input type="button" value='Cadastrar' onClick={cadastrar} className="btn btn-primary" />
          :
          <div>
            <input type="button" value='Atualizar' onClick={atualizar} className="btn btn-warning" />
            <input type="button" value='Remover' onClick={remover} className="btn btn-danger" />
            <input type="button" value='Cancelar' onClick={cancelar} className="btn btn-secondary" />
          </div>
      }

    </form>
  )
}

export default Formulario;