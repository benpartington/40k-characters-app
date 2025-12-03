import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CharacterBioComponent } from "../character-bio/character-bio.component";
import { RouterModule } from '@angular/router';
import { CharacterBio } from "../character-bio";
import { CharacterService } from "../character.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, CharacterBioComponent, RouterModule],
  template: `
    <section class="home-nav">
      <a routerLink="/battle" class="nav-link">Battle Selector</a>
    </section>
    <section>
      <form>
        <input type="text" placeholder="Filter by faction" #filter/>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section>
      <section class="results">
        <app-character-bio
          *ngFor="let characterBio of filteredFactionList"
          [characterBio]="characterBio"
        ></app-character-bio>
      </section>
    </section>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  characterBioList: CharacterBio[] = [];
  characterService: CharacterService = inject(CharacterService);
  filteredFactionList: CharacterBio[] = [];

  constructor() {
    this.characterService.getAllCharacteeBios().then((characterBioList: CharacterBio[]) => {
      this.characterBioList = characterBioList;
      this.filteredFactionList = characterBioList;
    });
  }

  filterResults(text: string) {
    if (!text) this.filteredFactionList = this.characterBioList;

    this.filteredFactionList = this.characterBioList.filter(
      characterBio => characterBio.faction.toLowerCase().includes(text.toLowerCase())
    );
  }
}
