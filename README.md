# Contact App

A React frontend for managing contacts. The application communicates with the Contacts API and lets users browse, add, edit and delete contacts, as well as upload profile photos.

## Features

- Display a paginated contact list
- View contact details
- Add a new contact
- Edit an existing contact
- Delete a contact
- Upload and update profile photos
- Show error notifications with React Toastify
- Navigate between views with React Router

## Tech stack

- React
- Vite
- React Router DOM
- Axios
- React Toastify
- CSS
- Bootstrap Icons

## Project structure

```text
contactapp
├── public/
├── src/
│   ├── api/
│   │   ├── ContactService.js  # HTTP requests to the backend API
│   │   └── ToastService.js    # Toast notification helpers
│   ├── components/
│   │   ├── Contact.jsx
│   │   ├── ContactDetail.jsx
│   │   ├── ContactList.jsx
│   │   └── Header.jsx
│   ├── App.jsx                # Application state and routes
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

## Requirements

Before starting the application, install:

- Node.js
- npm
- The Contacts API backend running locally

Backend repository:

```text
https://github.com/StarkusNt/Contacts
```

## Installation

Clone the repository:

```bash
git clone https://github.com/StarkusNt/contactapp.git
cd contactapp/contactapp
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will show the local application address in the terminal, usually:

```text
http://localhost:5173
```

## Backend connection

The frontend communicates with the backend API at:

```text
http://localhost:8085/contacts
```

This address is currently configured in:

```text
src/api/ContactService.js
```

Make sure the backend is running before using the application.

## API integration

The frontend uses the following backend endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/contacts?page=0&size=10` | Load paginated contacts |
| `GET` | `/contacts/{id}` | Load one contact |
| `POST` | `/contacts` | Create a contact |
| `PUT` | `/contacts/{id}` | Update a contact |
| `PUT` | `/contacts/photo?id={id}` | Upload or update a profile photo |
| `DELETE` | `/contacts/{id}` | Delete a contact |

## Available scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds a production version of the application.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

## Contact creation flow

When a user saves a new contact, the application performs two requests:

1. It sends the contact form data to `POST /contacts`.
2. The backend returns the new contact ID.
3. The selected image file is sent to `PUT /contacts/photo?id={id}`.

This is why the profile photo is handled separately from the text fields of the contact form.

## Author

Krystian Stański  
GitHub: [@StarkusNt](https://github.com/StarkusNt)
