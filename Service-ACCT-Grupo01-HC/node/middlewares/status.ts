export async function status(ctx: Context, next: () => Promise<any>) {
  const {
    state: { code },
    clients: {  oms : omsClient },
  } = ctx

  const data = await omsClient.order(code.toString(),"ADMIN_TOKEN")

  ctx.body = data

  await next()
}