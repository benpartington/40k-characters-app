import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { CharacterService } from "../character.service";
import { CharacterBio } from "../character-bio";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="character-photo" [src]="characterBio?.photo" />
      <section class="character-description">
        <h2 class="character-heading">{{ characterBio?.name }}</h2>
        <p class="character-faction">
          {{ characterBio?.faction }}
        </p>
      </section>
      <section class="character-features">
        <h2 class="section-heading">About</h2>
        <ul>
          <li>Age: {{ (characterBio?.age ?? 0) > 0 ? characterBio?.age : "N/A"}}</li>
          <li>Homeworld: {{ characterBio?.homeworld }}</li>
          <li>
            Currently Active?: {{ characterBio?.status ? "Yes" : "No" }}
          </li>
        </ul>
      </section>
      
      <section class="character-comment">
        <h2 class="section-heading">Leave a comment</h2>
        <div class="comment-wrapper">
          <div class="comment-form-container">
            <form [formGroup]="commentForm" (ngSubmit)="SubmitComment()" autocomplete="off">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />
          
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />
          
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
            
            <label for="comment-text">Comment</label>
            <textarea id="comment-text" formControlName="commentText" rows="4"></textarea>
            <button class="primary" type="submit" [disabled]="!(commentForm.get('commentText')?.value?.trim())">Comment</button>
            </form>
          </div>
          <aside class="comments-display">
            <h3 class="section-heading">Comments</h3>
            <div *ngIf="comments.length === 0">No comments yet. Be the first to post!</div>
            <ul class="comments-list">
              <li *ngFor="let c of comments; let i = index" class="comment-item">
                <div class="comment-meta">{{ c.firstName }} {{ c.lastName }} <span class="comment-email">({{ c.email }})</span></div>
                <div class="comment-body">{{ c.commentText }}</div>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </article>
  `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  characterService = inject(CharacterService);
  characterBio: CharacterBio | undefined;
  commentForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
    commentText: new FormControl("")
  });
  comments: Array<{firstName: string; lastName: string; email: string; commentText: string}> = [];

  constructor() {
    const characterBioId = Number(this.route.snapshot.params["id"]);
    this.characterService.getCharacterBioById(characterBioId).then(characterBio => {
      this.characterBio = characterBio;
    });

  }
  SubmitComment() {
    const firstName = this.commentForm.value.firstName ?? "";
    const lastName = this.commentForm.value.lastName ?? "";
    const email = this.commentForm.value.email ?? "";
    const commentText = this.commentForm.value.commentText ?? "";

    // Save to local comments array so it appears in the UI immediately
    this.comments.push({ firstName, lastName, email, commentText });

    // Optionally call the service to log or persist it later
    this.characterService.submitComment(firstName, lastName, email, commentText);

    // Reset the comment text and keep the name/email fields intact if desired
    this.commentForm.patchValue({ commentText: "" });
  }
}
