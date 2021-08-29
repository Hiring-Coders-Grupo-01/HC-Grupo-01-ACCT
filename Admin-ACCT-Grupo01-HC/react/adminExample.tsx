
import React, { FC, useEffect, useState } from 'react'
import {Tag, Layout, PageBlock, PageHeader, Table} from 'vtex.styleguide'
import './styles.global.css'
import axios from 'axios'

const AdminExample: FC = () => {

  //Realiza a Busca dos Prospects e dos Clientes na Amazon
  const [users, setUsers]:any = useState([])
  useEffect(() => {
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
  }, [])

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
            schema={defaultSchema}
            items={users}
            density="high"
            indexColumnLabel="Index"
            fixFirstColumn
            onRowClick={({ rowData }:any) => {
              alert(`Propecto registrado em ${rowData.dataCadastro}.`)
            }}
            lineActions={lineActions}
          />
        </div>
      </div>

      </PageBlock>
    </Layout>
  )

}
export default AdminExample