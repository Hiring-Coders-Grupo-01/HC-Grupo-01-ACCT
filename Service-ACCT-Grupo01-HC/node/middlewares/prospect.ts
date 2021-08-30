import { json } from 'co-body'

export async function prospect(ctx: Context, next: () => Promise<any>) {
    
  // Order para Pegar os Dados nas APIs Internas da VTEX - AWS para pegar os dados na Amazon
  const {
    clients: { order, aws },
  } = ctx

  // Recebe dados do POST
  // Configurar o Hook
  // https://developers.vtex.com/vtex-rest-api/reference/order-hook-1#hookconfiguration
  const body = (await json(ctx.req))
  const orderid = body.OrderId
  //console.log(body)
  ctx.status = 200
  // Fim recebe dados do POST

  // Pegar o UserProfileID no Hook
  // https://developers.vtex.com/vtex-rest-api/reference/orders
  const orderData = (await order.getOrder(ctx, orderid))
  //console.log('UserProfileID:'+orderData.clientProfileData.userProfileId)
  //console.log('Nome:'+orderData.clientProfileData.firstName+' '+orderData.clientProfileData.lastName) //Nome Completo
  //console.log('Telefone:'+orderData.clientProfileData.phone)
  //console.log('Email Criptografado:'+orderData.clientProfileData.email)
  let userid = orderData.clientProfileData.userProfileId;
  let nome = orderData.clientProfileData.firstName+' '+orderData.clientProfileData.lastName;
  let telefone = orderData.clientProfileData.phone;
  //console.log('Console Token:'+ctx.vtex.authToken)

  // Pegar o Email Descriptografado
  // https://developers.vtex.com/vtex-rest-api/reference/search
  const emailData = (await order.getEmail(ctx, userid))
  const emaildescriptografo:string = emailData[0].email;
  //console.log('Nome:'+nome)
  //console.log('Email Descriptografado:'+emaildescriptografo)
  //console.log('Telefone:'+telefone)

  // Buscar se o Email esta cadastrado na AWS
  const emailAws :any = await aws.getLeads(emaildescriptografo)
  let uniqueId :string = '' //Declarando o ID - Default Null
  let status:string = '' //Declarando o Status - Default Null
  //console.log (emailAws)
  if (emailAws.length > 0){
    // SE JA E UM PROSPECTO, RECEBE AS VARIAVEIS PARA CONVERSAO PARA CLIENTE
    uniqueId = emailAws[0].uuid;
    status = emailAws[0].status;
    //console.log('Unique ID Aws: '+uniqueId);
    //console.log('Status: '+status);
  }else{
    // SE ELE NUNCA FOI UM PROSPECT, CADASTRA O CLIENTE NA BASE DA AWS COMO CLIENTE
    //console.log('Prospecto não cadastrado!')
    const postProspect :any = await aws.postLead(nome,emaildescriptografo,telefone)
    //console.log (postProspect)
    const uniqueIdNewClient :string = postProspect.uuid;
    //const convertProspect :any = await aws.convertLead(uniqueIdNewClient)
    await aws.convertLead(uniqueIdNewClient)
    //console.log(convertProspect)
    //console.log(convertProspect)
  }
  
  // Verificar se o cliente já é um Prospecto ou Cliente
  if(status == 'Prospecto'){
    // Se o Email existir, converte para Prospect
    //const convertProspect :any = await aws.convertLead(uniqueId)
    await aws.convertLead(uniqueId)
    //console.log (convertProspect)
  } else if(status == 'Cliente'){
    console.log('Prospect já foi convertido em um cliente!')
  }

  await next()
}