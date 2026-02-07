# User Management CRUD Application

A production-ready React + TypeScript CRUD application with **schema-driven, extensible architecture**. Adding new fields requires only modifying a single configuration file.

![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![MUI](https://img.shields.io/badge/Material--UI-6.4-purple)

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Schema-driven dynamic forms
- ✅ Form validation with user-friendly error messages
- ✅ Loading states and skeleton placeholders
- ✅ Error handling with toast notifications
- ✅ Responsive design with modern dark theme
- ✅ JSON-server for mock API during development

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start the mock API server (in terminal 1)
npm run server

# Start the development server (in terminal 2)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Layout.tsx
│   ├── UserList.tsx
│   ├── UserDialog.tsx
│   └── ConfirmDialog.tsx
├── forms/            # Schema-driven form system
│   ├── DynamicField.tsx
│   ├── DynamicForm.tsx
│   └── validation.ts
├── hooks/            # Custom React hooks
│   └── useUsers.ts
├── pages/            # Page components
│   └── UsersPage.tsx
├── schemas/          # Field configuration (EXTENSIBILITY CORE)
│   └── userSchema.ts
├── services/         # API layer
│   ├── api.ts
│   └── userService.ts
├── types/            # TypeScript interfaces
│   ├── user.ts
│   └── form.ts
├── App.tsx
├── main.tsx
└── theme.ts
```

## 🔧 Adding a New Field (Extensibility)

To add a new field (e.g., `dateOfBirth`), you only need to:

### 1. Update the Schema

Edit `src/schemas/userSchema.ts`:

```typescript
export const userSchema: FieldConfig[] = [
  // ... existing fields
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: false,
    gridWidth: 6,
  },
];
```

### 2. Update the User Type (Optional for strict typing)

Edit `src/types/user.ts`:

```typescript
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth?: string; // Add new field
}
```

### 3. Update the mock database

Edit `db.json`:

```json
{
  "users": [
    {
      "id": "1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phoneNumber": "+1-555-123-4567",
      "dateOfBirth": "1990-01-15"
    }
  ]
}
```

**That's it!** The form, table, and validation will automatically include the new field.

## API Configuration

The app uses a configurable API layer. By default, it connects to JSON-server at `http://localhost:3001`.

### Change API URL

Set the environment variable:

```bash
VITE_API_URL=https://your-api.com npm run dev
```

Or create a `.env` file:

```env
VITE_API_URL=https://your-api.com
```

## Available Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Start development server   |
| `npm run build`   | Build for production       |
| `npm run preview` | Preview production build   |
| `npm run lint`    | Run ESLint                 |
| `npm run server`  | Start JSON-server mock API |

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Or use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Environment Variables

Set `VITE_API_URL` in your deployment platform's environment settings.

## Design Decisions

1. **Schema-Driven Forms**: All form fields are defined in a single configuration file (`userSchema.ts`), enabling easy extensibility without touching UI components.

2. **Custom Hooks**: The `useUsers` hook encapsulates all CRUD operations, providing a clean separation between data management and UI.

3. **Generic API Layer**: The `api.ts` service provides type-safe HTTP methods, making it easy to swap between mock and real APIs.

4. **Material-UI with Custom Theme**: Modern dark theme with gradient accents for a premium look and feel.

5. **Form-Level Validation**: Validation rules are defined in the schema, keeping validation logic centralized and reusable.

## Technology Stack

- **React 18** - UI Framework
- **TypeScript 5** - Type Safety
- **Material-UI 6** - Component Library
- **Vite** - Build Tool
- **JSON-Server** - Mock REST API

## License

MIT
