import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CharacterService } from "../character.service";
import { CharacterBio } from "../character-bio";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-battle-selector",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="home-nav">
      <a routerLink="/" class="nav-link">Home</a>
    </section>
    <section class="battle-page">
      <h2 class="page-heading">Battle Selector</h2>

      <p class="instructions">Click character cards to select two fighters.</p>

      <div class="clear-btn">
        <button
          class="secondary"
          type="button"
          (click)="selected = []"
          [disabled]="selected.length === 0"
        >
          Clear Selections
        </button>
      </div>

      <div class="characters-grid">
        <div
          class="char-card"
          *ngFor="let c of characters"
          (click)="toggleSelect(c)"
          [class.selected]="isSelected(c.id)"
          [attr.aria-pressed]="isSelected(c.id)"
          role="button"
          tabindex="0"
          (keydown.enter)="toggleSelect(c)"
        >
          <img [src]="c.photo" alt="{{ c.name }} photo" />
          <div class="card-name">{{ c.name }}</div>
          <div class="card-faction">{{ c.faction }}</div>
        </div>
      </div>

      <div class="vs-display" *ngIf="selected.length > 0">
        <div class="fighter" *ngFor="let f of selected">
          <div class="fighter-name">{{ f.name }}</div>
          <img class="fighter-photo" [src]="f.photo" alt="{{ f.name }} photo" />
        </div>
      </div>
    </section>
  `,
  styleUrls: ["./battle-selector.component.css"],
})
export class BattleSelectorComponent {
  characterService = inject(CharacterService);
  characters: CharacterBio[] = [];
  selected: CharacterBio[] = [];

  constructor() {
    this.characterService
      .getAllCharacterBios()
      .then((cs) => (this.characters = cs ?? []));
  }

  isSelected(id?: number) {
    return this.selected.some((s) => s.id === id);
  }

  toggleSelect(c: CharacterBio) {
    const already = this.isSelected(c.id);
    if (already) {
      this.selected = this.selected.filter((s) => s.id !== c.id);
      return;
    }

    if (this.selected.length >= 2) {
      // Replace the oldest selection with the new one
      this.selected.shift();
    }
    this.selected = [...this.selected, c];
  }
}
