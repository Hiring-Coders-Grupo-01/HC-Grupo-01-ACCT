const AWS = require("aws-sdk");

const tableName = "acct-leads";

var dynamo = new AWS.DynamoDB.DocumentClient();

function GenericClientApiError(message = "") {
  this.name = "GenericClientApiError";
  this.statusCode = 400;
  this.message = message;
}
GenericClientApiError.prototype = Error.prototype;

function NotFoundApiError(message = "") {
  this.name = "NotFoundApiError";
  this.statusCode = 404;
  this.message = message;
}
NotFoundApiError.prototype = Error.prototype;

function ConflictApiError(message = "") {
  this.name = "ConflictApiError";
  this.statusCode = 409;
  this.message = message;
}
ConflictApiError.prototype = Error.prototype;

exports.handler = async (event, context) => {
  let body;
  let statusCode;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
        case "GET /leads":
          let results;
          
          //Se Possui Query Parameters na Requisição
          if(event.hasOwnProperty("queryStringParameters")) {
            let queryParam = event["queryStringParameters"];
            let filterexpression = "";
            let expressionAttributeNames = {};
            let expressionAttributeValues = {};
            
            //UUID
            if(queryParam.hasOwnProperty("uuid")) {
              if(filterexpression !== "")
                filterexpression += " AND contains(#uuid, :uuid)";
              else
                filterexpression += "contains(#uuid, :uuid)";

              expressionAttributeNames['#uuid'] = 'uuid';
              expressionAttributeValues[':uuid'] = event["queryStringParameters"]["uuid"];
            }
            
            //Nome
            if(queryParam.hasOwnProperty("nome")) {
              if(filterexpression !== "")
                filterexpression += " AND contains(#nome, :nome)";
              else
                filterexpression += "contains(#nome, :nome)";
              
              expressionAttributeNames['#nome'] = 'nome';
              expressionAttributeValues[':nome'] = event["queryStringParameters"]["nome"];
            }
            
            //Email
            if(queryParam.hasOwnProperty("email")) {
              if(filterexpression !== "")
                filterexpression += " AND contains(#email, :email)";
              else
                filterexpression += "contains(#email, :email)";
                
              expressionAttributeNames['#email'] = 'email';
              expressionAttributeValues[':email'] = event["queryStringParameters"]["email"];
            }
            
            //Status (Prospecto ou Cliente)
            if(queryParam.hasOwnProperty("status")) {
              if(filterexpression !== "")
                filterexpression += " AND contains(#status, :status)";
              else
                filterexpression += "contains(#status, :status)";
                
              expressionAttributeNames['#status'] = 'status';
              expressionAttributeValues[':status'] = event["queryStringParameters"]["status"];
            }
            
            const paramsQuery = {  
              TableName: tableName,
              FilterExpression: filterexpression,
              ExpressionAttributeNames: expressionAttributeNames,
              ExpressionAttributeValues: expressionAttributeValues,
            };
            
            //Busca com Filtros
            results = await dynamo.scan(paramsQuery).promise();
          } else {
            //Se não possuir Query Parameters na Requisição, Busca sem Filtros
            results = await dynamo.scan({ TableName: tableName }).promise();
          }
          statusCode = 200; 
          body = results.Items;
          break;
            
        case "POST /leads":
            let postRequestBody = JSON.parse(event.body);
            
            //Valida Campos Obrigatórios
            validateLead(postRequestBody);

            //Busca Leads com E-mail Igual ao Enviado na Requisição
            let leadsCadastrados = await dynamo.scan({  
              TableName: tableName,
              FilterExpression: "email = :email",
              ExpressionAttributeValues: {
                ':email': postRequestBody.email,
              },
            }).promise();
            
            //Se encontrar pelo menos 1 Lead, Código HTTP 409 - CONFLICT
            if (leadsCadastrados.Items.length > 0) {
              throw new ConflictApiError(`E-mail já cadastrado`); 
            }
            
            //Se não encontrar, cadastrar Lead, Código HTTP 201 - CREATED
            const paramsPost = {
              TableName: tableName,
              Item: {
                uuid: context.awsRequestId,
                nome: postRequestBody.nome,
                email: postRequestBody.email,
                telefone: postRequestBody.telefone,
                status: "Prospecto",
                dataCadastro: new Date().toLocaleString('pt-BR', {timeZone: 'America/Recife'}),
                dataConversao: null,
              },
            };
            await dynamo.put(paramsPost).promise();
    
            statusCode = 201; 
            body = paramsPost.Item;

            break;
            
        case "GET /leads/{uuid}":
          //Busca Lead por UUID
          const lead = await findLeadByUuid(event.pathParameters.uuid);
          statusCode = 200;
          body = lead;
          break;
            
        case "DELETE /leads/{uuid}":
          //Busca Lead por UUID, Se não encontrar, Código HTTP 404 - NOT FOUND
          await findLeadByUuid(event.pathParameters.uuid);
          //Se encontrar exclui Lead, Código HTTP 204 - NO CONTENT
          statusCode = 204;
          await dynamo.delete({
            TableName: tableName,
            Key: {
              uuid: event.pathParameters.uuid
            }
          }).promise();

          break;

        case "PUT /leads/{uuid}":
          let putRequestBody = JSON.parse(event.body);

          //Valida Campos Obrigatórios
          validateLead(putRequestBody);
                    
          //Busca Lead por UUID, Se não encontrar, Código HTTP 404 - NOT FOUND
          await findLeadByUuid(event.pathParameters.uuid);

          //Busca Leads com E-mail Igual ao Enviado na Requisição e UUID diferente
          let leadsCadastradosUuidDiferente = await dynamo.scan({  
            TableName: tableName,
            FilterExpression: "email = :email and #uuid <> :uuid",
            ExpressionAttributeValues: {
              ':email': putRequestBody.email,
              ':uuid': event.pathParameters.uuid   
            },
            ExpressionAttributeNames: {
              "#uuid": "uuid"
            }
          }).promise();
          
          //Se encontrar pelo menos 1 Lead, Código HTTP 409 - CONFLICT
          if (leadsCadastradosUuidDiferente.Items.length > 0) {
            throw new ConflictApiError(`E-mail já cadastrado`); 
          }

          //Se não, atualiza e retorna Lead, Código HTTP 200 - OK
          const paramsPut = {
              TableName: tableName,
              Key:{
                uuid: event.pathParameters.uuid,
              },
              UpdateExpression: "set nome=:nome, email=:email, telefone=:telefone",
              ExpressionAttributeValues:{
                  ":nome": putRequestBody.nome || null,
                  ":email": putRequestBody.email || null,
                  ":telefone": putRequestBody.telefone || null,
              },
              ReturnValues: "ALL_NEW",
          };

          statusCode = 200; 
          body = await dynamo.update(paramsPut).promise().then((data) => {
            return data.Attributes;
          });

          break;
      case "POST /leads/{uuid}/actions/convert":
        //Busca Lead por UUID
        const leadParaConversao = await findLeadByUuid(event.pathParameters.uuid);

        if (leadParaConversao.status == "Cliente") {
          throw new GenericClientApiError(`Lead de UUID: ${event.pathParameters.uuid} já convertido`);  
        }
        
        const paramsConvert = {
            TableName: tableName,
            Key:{
              uuid: event.pathParameters.uuid,
            },
            UpdateExpression: "set dataConversao=:dataConversao, #status=:status",
            ExpressionAttributeValues:{
                ":dataConversao": new Date().toLocaleString('pt-BR', {timeZone: 'America/Recife'}),
                ":status": "Cliente",
            },
            ExpressionAttributeNames: {
              "#status": "status"
            },
            ReturnValues: "ALL_NEW",
        };

        statusCode = 200; 
        body = await dynamo.update(paramsConvert).promise().then((data) => {
          return data.Attributes;
        });
        
        break;
          
      default:
        throw new GenericClientApiError(`Rota não suportada: "${event.routeKey}`);
    }
  } catch (err) {
    statusCode = err.statusCode;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
  
  function validateLead(body) {
    if (!body.nome) {
      throw new GenericClientApiError(`Nome é obrigatório`);          
    } 
    if (!body.email) {
      throw new GenericClientApiError(`E-mail é obrigatório`);  
    } 
    if (!body.telefone) {
      throw new GenericClientApiError(`Telefone é obrigatório`); 
    }
  }
  
  async function findLeadByUuid(uuid) {
    const lead = await dynamo.get({
      TableName: tableName,
      Key: {
        uuid: event.pathParameters.uuid,
      }
    }).promise(); 
    
    if (!lead.Item) {
      throw new NotFoundApiError(`Não foi encontrado lead com UUID: ${uuid}`);    
    }
    
    return lead.Item;
  }

};