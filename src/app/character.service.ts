import { Injectable } from "@angular/core";
import { CharacterBio } from "./character-bio";

@Injectable({
  providedIn: "root",
})
export class CharacterService {
  url = "http://localhost:3000/characters";

  constructor() {}

  async getAllCharacterBios(): Promise<CharacterBio[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getCharacterBioById(id: Number): Promise<CharacterBio | undefined>  {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? [];
  }

  submitComment(
    firstName: string,
    lastName: string,
    email: string,
    commentText?: string
  ): void {
    // For now just log comments — could be extended to POST to backend in the future.
    console.log(
      `Comment submitted for ${firstName} ${lastName} with email ${email}. Comment: ${commentText ?? ""}`
    );
  }
}
