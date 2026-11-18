# Pushpak Ingle Portfolio

A responsive personal portfolio built with React 19, Vite, JSX, and UnoCSS. Styling is custom CSS in `src/styles.css`, with UnoCSS configured and ready to use.

## Run locally

1. Install Node.js (LTS).
2. Extract this folder and open it in VS Code.
3. Open a terminal in the project folder.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL shown by Vite, usually `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
index.html              page shell, fonts, meta tags
vite.config.js          Vite + React + UnoCSS plugins
uno.config.js           UnoCSS config
public/favicon.svg      browser tab icon
src/
  main.jsx              app entry
  App.jsx               hash routing (#about, #projects, #contact) and layout
  data.js               your profile, About items and projects, edit content here
  styles.css            all styles, light and dark theme colours at the top
  components/           Header, Home, About, Projects, ProjectCard, Contact, Background, SplitText, Icon
  hooks/                useHashRoute, useTheme, useReveal
  utils/preview.js      generates the project preview screens
```

## Edit your content

- Contact details, links, About sections and projects: edit `src/data.js`.
- Home page stats and the scrolling tech ribbon: edit `stats` and `techStack` in `src/data.js`.
- Home page intro text: edit `src/components/Home.jsx`.
- Project cards currently show generated preview screens that change as the cursor moves across them. To use real screenshots, add images to `public/` and show them in `src/components/ProjectCard.jsx`.

## Before publishing

- Add live demo and GitHub repository links for each project.
- Confirm experience dates and the exact company spelling in the resume. The Pandharkars internship has no dates yet.
- Add a PDF resume file to `public/` and link it from the Home page if you want a Download CV button.
- Update the page title and description in `index.html` if your role focus changes.

## Deploy

You can deploy the generated `dist/` folder to Netlify, Vercel, or GitHub Pages. For Vercel/Netlify, the default Vite build command is `npm run build` and the output folder is `dist`.
