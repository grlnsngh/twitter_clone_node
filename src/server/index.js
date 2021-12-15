import express from "express";
import routes from "../routes";
import mongoose from "mongoose";

class Server {
  constructor(app) {
    this.app = app;
    // env-cmd -f in script will look for variables in .env.development file, if not found then it will also look in system variables, and if not present then it will use the other value which is 3000
    // dev needs to make their own .env.development file to compile code with their own values
    this.port = process.env.PORT || 3000;
    this.init();
  }
  init() {
    // convert data to json
    this.app.use(express.json());

    // setup routes
    this.app.use("/", routes);
  }

  async startServer() {
    try {
      await this.connectDatabase();
    } catch (err) {
      console.log("unable to connect db");
      process.exit(1);
    }

    // boot server
    this.app.listen(this.port, () => {
      console.log(`Server started listening on port ${this.port}`);
    });
  }

  async connectDatabase() {
    // connect to mongoose
    mongoose
      .connect("mongodb://localhost/twitter-clone-dev")
      .then(() => console.log("mongoDB connected"))
      .catch((err) => {
        throw err;
      });
  }
}
export default Server;
