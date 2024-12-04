import { HttpClient } from "@angular/common/http";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Injectable,
  Input,
  OnInit,
} from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "root-sidebar",
  imports: [RouterLink],
  template: `
    <div class="bg-gray-200 lg:w-[255px] md:0px">
      <div class="left-0 top-0 bottom-0 w-[25ppx] fixed">
        <nav
          class="min-w-[220px] max-w-[255px] h-dvh border-0 border-r border-solid border-gray-300 text-sm  bg-[#ececec] flex flex-col relative "
        >
          <header
            class="max-lg:pt-10 flex gap-1 justify-between items-center px-4 min-[360px]:pt-10 lg:pt-3 pb-3"
          >
            <button class="hover:bg-[#e1e1e1]">
              <div class="p-1">
                <a routerLink="/about">
                  <div class="bg-green-600 text-white rounded-md ">
                    <span class="px-1">O</span>
                  </div>
                </a>
              </div>
            </button>
            <a routerLink="/">home</a>
          </header>

          <main class="pt-2 flex-grow">
            <div class="px-4">
              <button
                (click)="dialogService.openDialog()"
                class=" hover:bg-[#e1e1e1] hover:rounded-md flex items-center
                gap-2 mb-6 w-full outline outline-1 outline-gray-300 rounded-md
                shadow-sm p-1 pl-2 "
              >
                New recipe
              </button>
            </div>
            <ul class="flex flex-col gap-1 px-4 mb-5">
              <li
                class="p-1 pl-2 hover:bg-[#e1e1e1] hover:rounded-md flex items-center gap-2 outline outline-1 outline-gray-300 rounded-md group "
              >
                <form
                  role="search"
                  class="flex items-center gap-2 focus-within:ring-2 focus-within:ring-blue-500 rounded-md"
                >
                  <input
                    name="search"
                    class="w-full flex gap-2 bg-transparent leading-4  outline-none text-base"
                    placeholder="Search"
                  />
                </form>
              </li>
            </ul>
          </main>
          <footer class="px-4 pb-5">
            <a
              href=""
              class="p-1 pl-2 flex gap-2 items-center hover:bg-gray-200 rounded"
            >
              Link to Github
            </a>
          </footer>
        </nav>
      </div>
    </div>
  `,
})
export class RootSidebar {
  constructor(public dialogService: DialogService) {}
}

@Injectable({ providedIn: "root" })
export class DialogService {
  private dialogRef: HTMLDialogElement | null = null;

  setDialogRef(dialog: HTMLDialogElement) {
    this.dialogRef = dialog;
  }

  openDialog() {
    if (this.dialogRef) {
      this.dialogRef.showModal();
      console.log("open");
    }
  }
  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
      console.log("close");
    }
  }
}

@Component({
  selector: "root",
  imports: [RouterOutlet, RootSidebar],
  template: `
    <main class="flex flex-row w-full flex-shrink-0 basis-0 min-w-0">
      <root-sidebar></root-sidebar>
      <div class="grow flex flex-col flex-shrink-0 min-w-0">
        <router-outlet></router-outlet>
      </div>
    </main>
  `,
})
export class Root {}

@Component({
  selector: "angular-root",
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AngularRoot {}

@Injectable({ providedIn: "root" })
export class ConfigService {
  constructor(private http: HttpClient) {}
}
@Component({
  selector: "about",
  template: `
    <section>
      <h1>about</h1>
    </section>
  `,
})
export class About {
  constructor(private http: HttpClient) {
    this.http.get("http://localhost:5002").subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error("Error occurred:", err);
      },
    });
  }
}

@Component({
  selector: "recipe-list",
  template: `
    <ul>
      <ng-content />
    </ul>
  `,
})
export class RecipeList {}

@Component({
  selector: "recipe-item",

  template: `
    <li
      class="leading-8 border-0 border-solid border-b border-gray-300 flex items-center bg-white px-6"
    >
      {{ text }}
    </li>
  `,
})
export class RecipeItem {
  @Input() text?: string;
}

@Component({
  selector: "index",
  imports: [RouterLink, RecipeItem, RecipeList],
  template: `
    <section
      class="flex flex-col border-0  flex-shrink-0 basis-0 min-w-0 border-b border-solid border-gray-300"
    >
      <div class="bg-gray-100  rounded-md flex justify-between items-center">
        <div class=" flex px-4 h-9 justify-between items-center text-sm ">
          <div class="flex items-center justify-center gap-10">
            <button
              class="flex items-center hover:bg-gray-300 p-1 rounded-md nav-btn z-[97] relative lg:hidden"
            ></button>
            <a routerLink="/" class="hover:bg-gray-200 px-2 p-1 rounded">
              All recipes
            </a>
          </div>
        </div>
        <form class="mr-4">
          <input type="hidden" name="" value="" />
          <button
            disabled="{}"
            type="submit"
            className=" flex gap-1 items-center disabled:cursor-not-allowed disabled:text-gray-300 px-2 max-w-fit enabled:text-red-400 outline-1 outline enabled:outline-red-400 text-sm rounded-md "
          >
            delete
          </button>
        </form>
      </div>
    </section>

    <section class="border-0 border-b border-solid border-gray-300 ">
      <recipe-list>
        <recipe-item [text]="'hello from parent!!'"></recipe-item>
        <recipe-item [text]="'2'"></recipe-item>
        <recipe-item [text]="'3'"></recipe-item>
        <recipe-item [text]="'4'"></recipe-item>
        <recipe-item [text]="'5'"></recipe-item>
      </recipe-list>
    </section>

    <section>
      <dialog id="dialog">
        <div id="dialog-inner">
          <header class="flex justify-between pb-10">
            <span>create a new recipe</span>
            <button (click)="dialogService.closeDialog()">x close</button>
          </header>
          <main>
            <p>some text</p>
            <div class="flex justify-end">
              <button type="submit" class="bg-green-400 p-1 rounded">
                submit
              </button>
            </div>
          </main>
        </div>
      </dialog>
    </section>
  `,
})
export class Index implements AfterViewInit {
  constructor(
    public dialogService: DialogService,
    private elementRef: ElementRef // private http: HttpClient
  ) {
    // this.http.get("https://localhost:5002").subscribe((response) => {
    //   console.log(response);
    // });
  }

  ngAfterViewInit() {
    const dialogEl = this.elementRef.nativeElement.querySelector("#dialog");
    console.log("Dialog in ngOnInit:", dialogEl);
    this.dialogService.setDialogRef(dialogEl);
  }
}
