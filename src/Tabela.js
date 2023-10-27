function Tabela({ vetor, selecionar }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Marca</th>
          <th>Selecione</th>
        </tr>
      </thead>

      <tbody>
        {
          vetor.map((obj, indice) => (
            <tr key={indice}>
              <td>{indice + 1}</td>
              <td>{obj.name}</td>
              <td>{obj.brand}</td>
              <td><button onClick={() => { selecionar(indice) }} className="btn btn-success">Selecionar</button></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default Tabela;