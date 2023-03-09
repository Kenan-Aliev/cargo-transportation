import express, { Express } from "express";
import { usersRouter, cargosRouter } from "./routes";
import { exceptionMiddleware } from "./midllewares";

class App {
  app: Express;
  port: string | undefined;
  constructor(app: Express) {
    this.app = app;
    this.port = process.env.PORT;
  }

  init() {
    this.app.use(express.json());
    this.app.use("/auth", usersRouter);
    this.app.use("/cargo", cargosRouter);
    this.app.use(exceptionMiddleware);

    this.app.listen(this.port, () => {
      console.log(`Server started on PORT ${this.port}`);
    });
  }
}

export default App;
