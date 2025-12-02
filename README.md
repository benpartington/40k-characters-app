<!--- Project README for 40k-character-app --->
# 40K Character App (Angular)

An example Angular app showcasing Warhammer 40K characters with a simple UI for viewing character details. The application uses a local JSON server (`json-server`) to serve character data (from `db.json`).

## ✅ Features
- List of characters with images and basic metadata
- Details page for each character with responsive layout and a comment form
- In-memory comments preview: user-submitted comments are displayed immediately on the details page (right-side panel)
- Built using Angular standalone components and Reactive Forms

## Prerequisites
- Node.js (LTS recommended, 16.x/18.x or newer)
- npm (comes with Node)
- Angular CLI (global install optional)
- Optional: `json-server` to serve `db.json`

If you want to install Angular CLI globally:
```bash
npm install -g @angular/cli
```

## Quick Start
1. Clone the repository and install dependencies:

```bash
git clone <repo_url_here>
cd 40k-character-app
npm install
```

2. Run the JSON server (data source):

If you have `json-server` installed globally:
```bash
json-server --watch db.json --port 3000
```

Or run it via `npx` (no install required):
```bash
npx json-server --watch db.json --port 3000
```

This will create a REST API at `http://localhost:3000/characters`.

3. Run the Angular app:

```bash
npm start
# or
ng serve
```

Open the app at `http://localhost:4200`.

## Routes / Navigation
- Home page: `/` — list of characters
- Details page: `/details/:id` — view a single character's bio and leave comments

## Development Notes
- Angular standalone components are used in `DetailsComponent` and others.
- Reactive Forms are used for the comment form (`FormGroup`, `FormControl`).
- The `CharacterService` currently fetches `characters` from the JSON server at `http://localhost:3000/characters`.


## Project Structure
- `src/app` contains the main app code:
  - `home` — character list view
  - `details` — character details and comment form
  - `character.service.ts` — data access
- `db.json` — sample API data used by `json-server`

