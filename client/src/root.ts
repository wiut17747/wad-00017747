import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: ` <router-outlet /> `,
})
export class Root {
  title = "ang";
}

@Component({
  selector: "navbar",
  standalone: true,
  imports: [RouterLink, Root, RouterOutlet],
  template: `
    <main class="bg-gray-200">
      <h1 class="text-green-400">Hello, {{ name }}</h1>
      <ul>
        <li><a routerLink="/">Home</a></li>

        <li><a routerLink="/about">About</a></li>
      </ul>
    </main>
    <router-outlet></router-outlet>
  `,
})
export class Navbar {
  name = "navbar";
}

@Component({
  selector: "about",
  standalone: true,

  template: `
    <section>
      <h1>about</h1>
    </section>
  `,
})
export class About {}
