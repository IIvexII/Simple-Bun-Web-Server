import { server ,ConfigRoutes } from "./WebServer";

const app = new ConfigRoutes();
app.get('/', () => {
    return 'Hello This is home page';
})

app.get('/users', () => {
    return 'All users will show here.';
})

app.get('/foo', () => {
    return 'Foo';
})
server(1234, app);