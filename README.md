# Apply Kit

Modern CV and cover letter creator with professional templates.

**[Live Demo](https://apply-kit.vercel.app)**

## Features

- **6-step wizard** - guided CV creation process
- **5 professional templates** - Modern, Classic, Minimal, Creative, Professional
- **Cover letter generator** - matching cover letters for your applications
- **i18n support** - Polish and English interface
- **Print-ready** - optimized A4 layout for printing/PDF
- **Demo data** - quickly preview templates with sample data
- **Local storage** - your data persists between sessions

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Zustand (state management)
- react-i18next (internationalization)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── features/
│   ├── wizard/       # CV creation wizard
│   ├── templates/    # CV templates
│   ├── preview/      # CV preview
│   └── cover-letter/ # Cover letter feature
├── store/            # Zustand store
├── i18n/             # Translations
└── types/            # TypeScript types
```

## License

MIT
