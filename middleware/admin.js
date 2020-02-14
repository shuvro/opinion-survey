export default ({ route, redirect }) => {
  if (!route.query.hasOwnProperty(process.env.token)) {
    redirect('/')
  }
}
