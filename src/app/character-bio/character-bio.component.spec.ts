import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterBioComponent } from './character-bio.component';

describe('CharacterBioComponent', () => {
  let component: CharacterBioComponent;
  let fixture: ComponentFixture<CharacterBioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CharacterBioComponent]
    });
    fixture = TestBed.createComponent(CharacterBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
