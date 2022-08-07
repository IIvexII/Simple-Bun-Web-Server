# Bun Server

## Install
* Install Bun and thats it.

## Run
```bash
bun run ./src/index.ts
```

## Example
```typescript
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
// Pass port and the instance of ConfigureRoutes
server(1234, app);
```