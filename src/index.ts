import { server ,ConfigRoutes } from "./WebServer";

const app = new ConfigRoutes();
app.get('/', () => {
    console.log('home page')
    return new Response('Hello This is home page');
})

app.get('/users', () => {
    console.log('user page')
    return new Response('All users will show here.');
})

server(1234, app);