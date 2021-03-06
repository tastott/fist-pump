import express = require("express");
import session = require("express-session");
import { InversifyExpressServer } from "inversify-express-utils";
import path = require("path");
// const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
import passport = require("passport");
import ConfigureAuth from "./auth";
import container from "./ioc/container";
import { TYPES } from "./constants";
import { IUserRepository } from "./repositories/user-repository";
import dotenv = require("dotenv");
import {Auth0Service} from "./services/auth0-service";

dotenv.config();

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "jade");

  // uncomment after placing your favicon in /public
  // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
  app.use(session({secret: "blsh"}));
  app.use(ConfigureAuth(() => container.get(Auth0Service)));
  app.use(passport.session());
  // // catch 404 and forward to error handler
  // app.use((req, res, next) => {
  //   let err = new Error("Not Found");
  //   err["status"] = 404;
  //   next(err);
  // });

  // // error handler
  // app.use((err, req, res, next) => {
  //   // set locals, only providing error in development
  //   res.locals.message = err.message;
  //   res.locals.error = req.app.get("env") === "development" ? err : {};

  //   // render the error page
  //   res.status(err.status || 500);
  //   res.render("error");
  // });

});

export default server.build();
