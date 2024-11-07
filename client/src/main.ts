import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./config";
import { Root } from "./root";
bootstrapApplication(Root, appConfig).catch((err) => console.error(err));
