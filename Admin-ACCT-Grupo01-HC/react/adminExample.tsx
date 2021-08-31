
import React, { FC, useEffect, useState } from 'react'
import {Tag, Layout, PageBlock, PageHeader, Table} from 'vtex.styleguide'
import './styles.global.css'
import axios from 'axios'

const AdminExample: FC = () => {
  //Realiza a Busca dos Prospects e dos Clientes na Amazon
  const [users, setUsers]:any = useState([])
  const [dataSort]:any = useState({
    sortedBy: null,
    sortOrder: null,
  })
  // const [usersPage, setUsersPage]:any = useState([])
  let tableLength = 5
  const [initialState, setInitialState]:any = useState({
      tableLength: tableLength,
      currentPage: 1,
      slicedData: users.slice(0, tableLength),
      currentItemFrom: 1,
      currentItemTo: tableLength,
      itemsLength: users.length,
      emptyStateLabel: 'Nothing to show.',
  })
  //Define os campos que seram exibidos na tabela
  const defaultSchema = {
    properties: {
      nome: {
        title: 'Nome',
        width: 330,
      },
      email: {
        title: 'Email',
        minWidth: 250,
      },
      dataCadastro: {
        title: 'Data Cadastro',
        // default is 200px
        minWidth: 190,
      },
      telefone: {
        title: 'Telefone',
        // default is 200px
        minWidth: 120,
      },
      status: {
        title: 'Status',
        // default is 200px
        minWidth: 120,
        sortable: true,
        // you can customize cell component render (also header component with headerRenderer)
        cellRenderer: ({ rowData } :any) => {
  
          let color = '';
  
          if(rowData.status=="Cliente"){
            color = "#f71963";
          }else{
            color = "#d4b8c1"
          }
  
          return (
            <Tag
              bgColor={color}
              color="#fff"
            >
              <span className="nowrap">
                {rowData.status}
              </span>
            </Tag>
          )
        }
      },
      dataConversao: {
        title: 'Data Conversao',
        // default is 200px
        minWidth: 180,
        // you can customize cell component render (also header component with headerRenderer)
        cellRenderer: ({ rowData } :any) => {
  
          let data_conversao = null;
          let color = '';
  
          //Define o valor que sera exibido na data, quando for vazio exibe um traço
          if(rowData.dataConversao){
            data_conversao = rowData.dataConversao;
          }else{
            data_conversao = "-"
          }
  
          //Define a vor que sera exibido na data, quando for vazio exibe um rosa fraco
          if(rowData.dataConversao){
            color = "#f71963";
          }else{
            color = "#d4b8c1"
          }
  
          return (
            <Tag
              bgColor={color}
              color="#fff"
            >
              <span className="nowrap">
                {data_conversao}
              </span>
            </Tag>
          )
        }
      },
    },
  }
  
  //Botoes que são exibidos no final da tabela
  const lineActions = [
    {
      label: () => `Converter para Cliente`,
      onClick: ({ rowData }:any) => {
  
          // POST Realiza uma requisição para a AWS passando o ID do usuário. Irá converter um prospect para cliente
          axios.post('https://1d0u5setve.execute-api.sa-east-1.amazonaws.com/leads/'+rowData.uuid+'/actions/convert')
              .then(res => {  
                console.log(res);
                console.log("User:"); 
                console.log(users);
  
                // Após converter ele faz novamente um GET para retornar a lista atualizada
                axios
                .get(
                    'https://1d0u5setve.execute-api.sa-east-1.amazonaws.com/leads'
                )
                .then(({ data }:any) => {
                  setUsers(data)
                  })
                .catch(() => {
                    return console.error('Não foi possível retornar os dados no momento!')
                })
                
                alert(`Registrado alterado: ${rowData.nome}`)
              })              
              .catch(err => {
                console.log('Erros: ');
                console.log(err);
                console.log(err.response.status);
                console.log(err.response.data);
                
                // Se tentar converter um usuario ja convertido e gerado o Erro 400, e nesse caso é exibio um alerta
                //Erro 400 - Prospect ja Convertido
                if(err.response.status = 400){
                  alert(`Não foi possível realizar a conversão, ${rowData.nome} já é um cliente.`);
                }else{
                  alert(err.response.data);
                }
              });
      },
    },
    {
      label: () => `Remover`,
      onClick: ({ rowData }:any) => {
  
          // DELETE - Envia uma requisicao de exclusao para a AWS
          axios.delete('https://1d0u5setve.execute-api.sa-east-1.amazonaws.com/leads/'+rowData.uuid)
              .then(res => {  
                console.log(res);  
  
                console.log("User:"); 
                console.log(users);
  
                // Atualizar a lista de usuario removendo da relacao o usuario excluido
                setUsers(
                    users.filter((data:any) => data.uuid !== rowData.uuid)
                );
  
                alert(`Registrado deletado: ${rowData.nome}`);
                 
                console.log("New User:"); 
                console.log(users);
  
                
              })
              .catch(err => {
                console.log(err);
                alert(`Erro ao tentar Deletar: ${rowData.nome} - ID: ${rowData.uuid} `);
              });
  
      },
    },
  ]

useEffect(() => {
    axios
    .get(
        'https://1d0u5setve.execute-api.sa-east-1.amazonaws.com/leads'
    )
    .then(({ data }:any) => {
      setInitialState( {
        ...initialState,
        itemsLength: data.length,
        slicedData: data.slice(0, initialState.tableLength),
        currentItemTo: initialState.tableLength
      })
      setUsers(data)
      
      })
    .catch(() => {
        return console.error('Não foi possível retornar os dados no momento!')
    })
}, [])



function handleNextClick() {
  const newPage = initialState.currentPage + 1
  const itemFrom = initialState.currentItemTo + 1
  const itemTo = tableLength * newPage
  const data = users.slice(itemFrom - 1, itemTo)
  return goToPage(newPage, itemFrom, itemTo, data)
}
function handlePrevClick() {
  if (initialState.currentPage === 0) return
    const newPage = initialState.currentPage - 1
    const itemFrom = initialState.currentItemFrom - tableLength
    const itemTo = initialState.currentItemFrom - 1
    const data = users.slice(itemFrom - 1, itemTo)
    return goToPage(newPage, itemFrom, itemTo, data)
}

function goToPage(currentPage:any, currentItemFrom:any, currentItemTo:any, slicedData:any) {
  setInitialState({
    ...initialState,
    currentPage,
    currentItemFrom,
    currentItemTo,
    slicedData,
    tableLength
  })
}

function handleRowsChange(e:any, value:any) {
  console.log(e)
  const currentPage = initialState.currentPage
  const itemFrom = initialState.currentItemFrom
  const currentItemTo = parseInt(value)
  const slicedData = users.slice(itemFrom, parseInt(value))
  const tableLength = parseInt(value)
  setInitialState( {
    ...initialState,
    currentItemFrom: 1,
    currentPage,
    currentItemTo,
    slicedData,
    tableLength
  })
}

function handleSort({ sortOrder, sortedBy }:any) {
  console.log(sortOrder, sortedBy)
  // I'll just handle sort by 'name', but I could handle multiple properties
  if (sortedBy === 'status') {
    // const orderedItems =
    //   sortOrder === 'ASC'
    //     ? users.slice().sort("Cliente")
    //     : users.slice().sort("Prospecto")
    // the above const could come out of an API call to sort items for example
    if(sortOrder === 'ASC') {
      const orderedItems = initialState.slicedData.slice().sort((a: any, b: any) => {
        if (a.status > b.Status) {
          return 1;
        } else if (b.status === "Prospecto") {
          return -1;
        } else {
          return
        }
      })
      console.log(orderedItems)
      return setInitialState({
        ...initialState,
        slicedData: orderedItems,
      })
    } else {
      const orderedItems = initialState.slicedData.slice().sort((a: any, b: any) => {
        if (a.status < b.Status) {
          return 1;
        } else if (b.status === "Cliente") {
          return -1;
        } else {
          return
        }
      })
      console.log(orderedItems)
      return setInitialState({
        ...initialState,
        slicedData: orderedItems,
      })
    }
  }
}

  //Monta a Tabela em Tela
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={'Prospectos x Clientes'}
        />
      }
    >
      <PageBlock variation="full">

      <div>
        <div className="mb5">
          <Table
            fullWidth
            toolbar
            schema={defaultSchema}
            items={initialState.slicedData}
            density="high"
            indexColumnLabel="Index"
            fixFirstColumn
            pagination={{
              onNextClick: handleNextClick,
              onPrevClick: handlePrevClick,
              textShowRows: 'Show rows',
              textOf: 'of',
              onRowsChange: handleRowsChange,
              totalItems: initialState.itemsLength,
              currentItemFrom: initialState.currentItemFrom,
              currentItemTo: initialState.currentItemTo,
              rowsOptions: [5, 10, 15, 25],
            }}
            onRowClick={({ rowData }:any) => {
              alert(`Propecto registrado em ${rowData.dataCadastro}.`)
            }}
            lineActions={lineActions}
            sort={{
              sortedBy: dataSort.sortedBy,
              sortOrder: dataSort.sortOrder,
            }}
            onSort={handleSort}
          />
        </div>
      </div>

      </PageBlock>
    </Layout>
  )

}
export default AdminExample