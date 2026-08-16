<div align="center">

<img src="public/icon.png" alt="SnipPad logo" width="120" />

# SnipPad

A fast, polished desktop client for managing your code snippets like a pro.

</div>

## Features

- **Snippet & Tag Management** — Create unlimited snippets and tags with filtered listing support.
- **Editor Workspace** — Built-in Monaco Editor for a first-class code editing experience.
- **Interactive Panel** — Action row for saving, editing, starring, and deleting snippets, plus tabbed navigation between open snippet files.
- **Custom Themes** — Client UI themes and Monaco editor themes via `~/.snippad/themes.json`.
- **Custom Settings** — Configure application behavior and editor preferences via `~/.snippad/settings.json`.
- **Auto-Updates** — Automated update checks to keep you on the latest features and patches.
- **In-App Announcements** — News, updates, and community notes on startup.

## Tech Stack

- [Electron](https://www.electronjs.org/) + [Vite](https://vitejs.dev/)
- [React](https://react.dev/) 19 + [Zustand](https://zustand-demo.pmnd.rs/) state management
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Tailwind CSS](https://tailwindcss.com/) v4

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (or npm/pnpm/yarn) and Node.js 18+

### Development

```bash
bun install      # install dependencies
bun run dev      # start the Vite dev server
bun run dev:electron  # run the Electron app
```

### Build

```bash
bun run build    # builds the renderer and packages the app with electron-builder
```

## Scripts

| Script                | Description                                       |
| --------------------- | ------------------------------------------------- |
| `bun run dev`         | Start the Vite dev server                         |
| `bun run dev:electron`| Run the Electron app                              |
| `bun run build`       | Build the renderer and package the desktop app    |
| `bun run lint`        | Run ESLint                                        |
| `bun run typecheck`   | Run TypeScript type checking                      |
| `bun run format`      | Format the codebase with Prettier                 |
| `bun run preview`     | Preview the built renderer                        |

## Configuration

SnipPad stores user configuration in `~/.snippad/`:

- `themes.json` — custom client themes and Monaco editor themes
- `settings.json` — application behavior and editor preferences

## License

SnipPad is licensed under the [GPL-3.0-only](LICENSE).

The project name, logos, and branding assets are not open-source. See [BRANDING.md](BRANDING.md) for branding usage guidelines.
