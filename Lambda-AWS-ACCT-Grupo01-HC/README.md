<h1 align="center">
    Função AWS Lambda API Cadastro de Leads ACCT
</h1>

## 💻 Sobre o projeto

Projeto desenvolvido como parte do desafio final no HiringCoders Gama Academy VTEX.

## 🌍 Endpoints

### 1. GET /leads
Endpoint para listagem de todos os Leads cadastrados, aceita os seguintes query parameters:
* uuid - UUID do Lead
* nome - Nome do Lead
* email - E-mail do Lead
* telefone - Telefone do Lead
* status - Status do Lead (Prospecto ou Cliente)

Códigos Http de Retorno Possíveis:
* 200 - OK

#### Exemplo Retorno:
```
[
    {
        "dataCadastro": "25/08/2021 21:25:19",
        "telefone": "8799999999",
        "status": "Prospecto",
        "uuid": "5d0c266a-f8ee-4f80-8cc0-a719c0fe10a6",
        "nome": "André",
        "email": "andre@exemplo.com",
        "dataConversao": null
    },
    {
        "dataCadastro": "25/08/2021 20:13:33",
        "status": "Cliente",
        "telefone": "8799999999",
        "uuid": "2c996c7e-4b14-4c05-84cb-41ece7d7184f",
        "nome": "João",
        "email": "joao@exemplo.com",
        "dataConversao": "25/08/2021 20:13:57"
    }
]
```
### 2. GET /leads/{uuid}
Endpoint para obter um único Lead pelo seu UUID

Códigos Http de Retorno Possíveis:
* 200 - OK
* 404 - NOT FOUND

#### Exemplo Retorno:
```
{
    "dataCadastro": "25/08/2021 21:25:19",
    "status": "Cliente",
    "telefone": "8799999999",
    "uuid": "5d0c266a-f8ee-4f80-8cc0-a719c0fe10a6",
    "nome": "André",
    "email": "andre2@teste.com",
    "dataConversao": "25/08/2021 21:33:19"
}
```
### 3. POST /leads
Endpoint para cadastrar um novo Lead
#### Exemplo Body:
```
{
    "nome": "Marcos",
    "email": "marcos@exemplo.com",
    "telefone": "8799999999"
}
```
Códigos Http de Retorno Possíveis:
* 201 - CREATED
* 400 - BAD REQUEST (Nome, E-mail e Telefone são obrigatórios)
* 409 - CONFLICT (E-mail já cadastrado)

#### Exemplo Retorno:
```
{
    "uuid": "91faae4e-0c3f-49b1-8475-a004504f7c4f",
    "nome": "Marcos",
    "email": "marcos@exemplo.com",
    "telefone": "8799999999",
    "status": "Prospecto",
    "dataCadastro": "25/08/2021 22:01:27",
    "dataConversao": null
}
```
### 4. PUT /leads/{uuid}
Endpoint para atualizar dados cadastrais de um Lead
#### Exemplo Body:
```
{
    "nome": "Marcos",
    "email": "marcos@exemplo.com",
    "telefone": "8799999999"
}
```
Códigos Http de Retorno Possíveis:
* 200 - OK
* 400 - BAD REQUEST (Nome, E-mail e Telefone são obrigatórios)
* 404 - NOT FOUND (Lead não encontrado)
* 409 - CONFLICT (E-mail já cadastrado)

#### Exemplo Retorno:
```
{
    "uuid": "91faae4e-0c3f-49b1-8475-a004504f7c4f",
    "nome": "Marcos",
    "email": "marcos@exemplo.com",
    "telefone": "8799999999",
    "status": "Prospecto",
    "dataCadastro": "25/08/2021 22:01:27",
    "dataConversao": null
}
```
### 5. DELETE /leads/{uuid}
Endpoint para excluir um Lead

Códigos Http de Retorno Possíveis:
* 204 - NO CONTENT
* 404 - NOT FOUND (Lead não encontrado)

### 6. POST /leads/{uuid}/actions/convert
Endpoint para converter um Lead de Prospecto para Cliente

Códigos Http de Retorno Possíveis:
* 200 - OK
* 400 - BAD REQUEST (Lead já convertido)
* 404 - NOT FOUND (Lead não encontrado)

#### Exemplo Retorno:
```
{
    "dataCadastro": "25/08/2021 21:25:19",
    "status": "Cliente",
    "telefone": "8799999999",
    "uuid": "5d0c266a-f8ee-4f80-8cc0-a719c0fe10a6",
    "nome": "André",
    "email": "andre2@teste.com",
    "dataConversao": "25/08/2021 21:33:19"
}
```

## 🛠 Como utilizar?

Basta seguir este tutorial da AWS: https://docs.aws.amazon.com/pt_br/apigateway/latest/developerguide/http-api-dynamo-db.html utilizando a função lambda deste projeto;

Prestando atenção ao nome da tabela no DynamoDB que deve ser **acct-leads** e o id deve se chamar **uuid** do tipo String;

Prestar atenção também na configuração das Rotas na AWS e realizar conforme esse README.md;

## 🦸 Autor

Desenvolvido por Douglas Rodrigues 👋🏽 [Entre em contato!](https://www.linkedin.com/in/douglas-rodrigues-pnz/)


