import Auth from "./auth/auth.controller";
import App from "./app";

const app = new App([
  new Auth,
]);

app.listen();
