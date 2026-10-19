# Todo App

A responsive todo application built with **React, TypeScript, and Vite** as a solution to the [Frontend Mentor Todo App challenge](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). It supports task management, filtering, theme switching, and drag-and-drop reordering, with todos saved locally between visits.

## Overview

### Features

- Add new todos and mark them as completed or active.
- Delete individual todos or clear all completed todos.
- Filter tasks by **All**, **Active**, or **Completed**.
- Reorder tasks with drag and drop, including keyboard-based sorting support.
- Switch between light and dark themes, with the initial theme based on system preferences.
- Persist todos and theme preference using `localStorage`.
- View a responsive layout designed for mobile and desktop screens.

### Screenshot

![Todo app screenshot](/public/screenshots/screenshot.png)

### Links

- **Frontend Mentor challenge:** [Todo App](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW)
- **Live demo:** [Live Todo](https://fem-todo-tau.vercel.app/)

## Built with

- **React** — component-based user interface
- **TypeScript** — typed components, actions, and todo data
- **Vite** — development server and production build tooling
- **CSS** — responsive layouts, custom styling, and light/dark themes
- **React Context API and `useReducer`** — shared todo state and updates
- **`@dnd-kit`** — sortable todos with pointer and keyboard sensors
- **Web Storage API** — local persistence for todos and theme settings

## Getting started

### Prerequisites

Install a version of Node.js compatible with the project's Vite version and npm.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Lewis-mbui/fem-todo.git
   cd fem-todo
   ```

   _Update the repository URL and folder name if yours differ._

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed in your terminal.

### Available scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Type-check and build for production  |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run Oxlint                           |

## Implementation notes

### State management

The app uses a `TodosProvider` with React Context and `useReducer` to manage adding, toggling, deleting, clearing, and reordering todos. Custom hooks provide access to the todo and theme contexts from components.

### Local persistence

Todos are loaded from `localStorage` when the provider initializes. Saved data is validated before use, with starter todos used as a fallback. Updates are written back to `localStorage`. The selected theme is also saved locally; when no preference is saved, the app checks the device's preferred color scheme.

### Drag and drop

The list uses `@dnd-kit/core` and `@dnd-kit/sortable`, with pointer and keyboard sensors. When a drag ends, the reordered list is dispatched to the todo reducer and persisted.

## What I learned

This project provided an opportunity to practice:

- Organizing a React application into reusable components, contexts, and custom hooks.
- Modeling todo state and reducer actions with TypeScript.
- Keeping application state synchronized with browser storage.
- Implementing sortable interactions with `dnd-kit`.
- Managing responsive styling and theme preferences without an external UI framework.

## Possible improvements

- Add automated tests for reducer actions and user interactions.
- Improve empty-state messaging when no tasks match the selected filter.
- Review keyboard and screen-reader usability across all interactions.

## Author

- **GitHub:** [Lewis-mbui](https://github.com/Lewis-mbui)
- **Portfolio:** [Lewis Mbui](https://lewis-mbui-portfolio.vercel.app/)
- **LinkedIn:** [Lewis Mbui](https://www.linkedin.com/in/lewis-mbui/)

## Acknowledgments

Challenge design provided by [Frontend Mentor](https://www.frontendmentor.io/).
