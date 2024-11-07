import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from "@angular/core";
import { provideRouter, Routes } from "@angular/router";
import { About, Navbar } from "./root";

const routes: Routes = [
  {
    path: "",
    component: Navbar,
    children: [
      {
        path: "about",
        component: About,
      },
    ],
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
  ],
};
