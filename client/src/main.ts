import { bootstrapApplication } from "@angular/platform-browser";
import { About, AngularRoot, Index, RecipeDetail, Root } from "./root";
import { provideRouter, Routes } from "@angular/router";
import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from "@angular/core";
import { provideHttpClient, withFetch } from "@angular/common/http";

const routes: Routes = [
  {
    path: "",
    component: Root,
    children: [
      {
        path: "",
        component: Index,
      },
      {
        path: "about",
        component: About,
      },
      {
        path: "recipe/:id",
        component: RecipeDetail,
      },
    ],
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
  ],
};

bootstrapApplication(AngularRoot, appConfig).catch((err) => console.error(err));
