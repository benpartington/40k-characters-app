import { Component } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  selector: "app-root",
  template: `
    <main>
      <header class="brand-name">
        <a routerLink="/" class="brand-logo" aria-label="40K-Character-App logo">
          <img
            src="/assets/logo.png"
            alt="40K-Character-App logo"
            aria-hidden="true"
          />
        </a>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ["./app.component.css"],
  imports: [RouterModule],
})
export class AppComponent {
  // human-readable page or app title; not a runtime identifier
  title = "40K-Character-App";
}
