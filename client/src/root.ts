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
                <a routerLink="/">
                  <div class="bg-green-600 text-white rounded-md ">
                    <span class="px-1">17747</span>
                  </div>
                </a>
              </div>
            </button>
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
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <section
      class="flex pt-3 flex-col border-0  flex-shrink-0 basis-0 min-w-0 border-b border-solid border-gray-300"
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
      </div>
    </section>

    <section class="border-0 border-b border-solid border-gray-300 ">
      <ul>
        @if (recipes.length > 0) {
        <ul>
          @for (recipe of recipes; track recipe.id) {

          <a [routerLink]="['/recipe', recipe.id]">
            <li
              class="rounded leading-8 border-0 border-solid border-b border-gray-300 flex items-center bg-white px-6"
            >
              <span>{{ recipe.name }}</span>
            </li>
          </a>

          }
        </ul>
        } @else {
        <p>No recipes found</p>
        }
      </ul>
    </section>

    <section>
      <dialog id="dialog">
        <div id="dialog-inner">
          <header class="flex justify-between pb-3">
            <span>Create a new recipe</span>
            <button (click)="dialogService.closeDialog()" class="px-2">
              Close
            </button>
          </header>
          <main>
            <form (submit)="uploadData($event)">
              <div class="flex flex-col gap-2">
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  [formControl]="name"
                  required
                />

                <input
                  type="text"
                  name="description"
                  placeholder="description"
                  [formControl]="description"
                  required
                />
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  class="bg-green-400 p-1 rounded py-1 px-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </main>
        </div>
      </dialog>
    </section>
  `,
})
export class Index implements OnInit, AfterViewInit {
  name = new FormControl("");
  description = new FormControl("");

  recipes: any[] = [];

  constructor(
    public dialogService: DialogService,
    private elementRef: ElementRef,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getRecipes();
    console.log(this.recipes);
  }

  getRecipes(): void {
    this.http.get<any[]>("http://localhost:5002/recipes").subscribe(
      (res) => {
        this.recipes = res;
        this.cdr.detectChanges();
        console.log("Recipes fetched:", this.recipes);
        console.log("Recipes length:", this.recipes.length);
        console.log("Recipes fetched successfully:", res);
      },
      (err) => {
        console.error("Error fetching recipes:", err);
      }
    );
  }

  uploadData(event: Event): void {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", this.name.value || "");
    formData.append("description", this.description.value || "");

    this.http.post("http://localhost:5002/recipes", formData).subscribe(
      (response) => {
        console.log("Upload successful:", response);
        this.name.setValue("");
        this.description.setValue("");

        this.getRecipes();
        this.dialogService.closeDialog();
      },
      (err) => {
        console.error("Error during upload:", err);
      }
    );
  }

  ngAfterViewInit() {
    const dialogEl = this.elementRef.nativeElement.querySelector("#dialog");
    console.log("Dialog in ngOnInit:", dialogEl);
    this.dialogService.setDialogRef(dialogEl);
  }
}
