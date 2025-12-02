import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CharacterBio } from "../character-bio";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-character-bio",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="character">
      <img
        class="character-photo"
        [src]="characterBio.photo"
        alt="Exterior photo of {{ characterBio.name }}"
      />
      <h2 class="character-heading">{{ characterBio.name }}</h2>
      <p class="character-faction">
        {{ characterBio.faction }}
      </p>
      <a [routerLink]="['/details', characterBio.id]">Learn More</a>
    </section>
  `,
  styleUrls: ["./character-bio.component.css"],
})
export class CharacterBioComponent {
  @Input() characterBio!: CharacterBio;
}
