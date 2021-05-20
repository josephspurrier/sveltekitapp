# sveltekitapp

This is a sample notepad application that uses SvelteKit with TypeScript on the front-end (UI) and on the back-end (API).

![Demo gif](https://user-images.githubusercontent.com/2394539/76177148-ac753e00-6189-11ea-963b-bff38b29e8ed.gif)

# Environment Prep

Once you have cloned the repo, you will need the following tools for local development.

## Node and npm

You should install [NodeJS and npm](https://nodejs.org/).

These are the current versions on the front-end components:

- SvelteKit [next](https://github.com/sveltejs/kit/releases) - [docs](https://kit.svelte.dev/docs)
- Bulma [v0.9.2](https://www.npmjs.com/package/bulma/v/0.9.2) - [docs](https://bulma.io/documentation/)

## Visual Studio Code (VSCode) Setup

You can use any IDE, but here is what you need for VSCode. It was quite a challenge getting ESLint to work properly when the .eslintrc.js file is not in the root of the project - the trick was the "eslint.workingDirectories" setting. All the settings are included in the .vscode/settings.json file. I use VSCode open only to the root of the project with no other projects. I recommend the following VSCode extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Environment Variables

Create a file in the root of this project called `.env`, and paste in the following:

```bash
# Encrypt server cookie.
VITE_SESSION_SECRET="32 character password here"
```

## NPM Commands

### Start Services

You can run these commands to start the services.

```bash
# Start the application.
npm run dev

# You can now open your browser to: http://localhost:8080/
```

# Project Status

This project uses SvelteKit which is not at v1.0 yet as of (5/29/2020). You can see the status of the [1.0 milestone here](https://github.com/sveltejs/kit/issues?q=is%3Aopen+is%3Aissue+milestone%3A1.0).

Storybook currently doesn't fully support SvelteKit because of the [common module imports](https://github.com/sveltejs/kit/issues/1485), but it should soon.

Here are a few good resources on SvelteKit:

- [SvelteKit FAQ](https://kit.svelte.dev/faq)
- [Svelte Integrations](https://github.com/sveltejs/integrations)
- [Svelte Preprocessor](https://github.com/sveltejs/svelte-preprocess)
- [SvelteKit Starter Template](https://github.com/navneetsharmaui/sveltekit-starter)

# Additional Documentation

This is one repository of a few that demonstrate with different front-end frameworks how to build a notepad application with authentication. A few of the other repositories are:

- [Vue and Go](https://github.com/josephspurrier/govueapp)
- [Mithril and Go](https://github.com/josephspurrier/gomithrilapp)
- [Mithril (TypeScript) and Go](https://github.com/josephspurrier/gomithriltsapp)
- [React (TypeScript) and Go](https://github.com/josephspurrier/goreactapp)