# Todo List Frontend

A modern, responsive Todo List application built with Next.js, React, and Tailwind CSS that integrates with a Spring Boot backend.

## Features

- ✅ **View all todos** - Display a list of all tasks from the backend
- ✅ **Add new todos** - Create new tasks with title and description
- ✅ **Edit todos** - Update task title, description, and completion status
- ✅ **Delete todos** - Remove tasks with confirmation
- ✅ **Toggle completion** - Mark tasks as completed/uncompleted
- ✅ **Responsive design** - Works on desktop, tablet, and mobile
- ✅ **Error handling** - User-friendly error messages
- ✅ **Loading states** - Smooth loading indicators

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (version 18 or higher)
2. **Spring Boot Backend** running on `http://localhost:8080`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Integration

This frontend application communicates with the Spring Boot backend through the following RESTful APIs:

- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/{id}` - Update a todo
- `DELETE /api/todos/{id}` - Delete a todo

## Project Structure

```
src/app/
├── components/
│   ├── TodoList.js      # Main component managing todos and API calls
│   ├── TodoForm.js      # Form component for adding new todos
│   └── TodoItem.js      # Individual todo item component
├── page.js              # Main page component
├── layout.js            # Root layout component
└── globals.css          # Global styles and Tailwind CSS
```

## Technologies Used

- **Next.js 15** - React framework
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

## Usage

1. **Adding a Todo**: Use the form at the top to enter a title (required) and description (optional), then click "Add Task"

2. **Editing a Todo**: Click the "Edit" button on any todo item to modify its title and description

3. **Marking as Complete**: Use the checkbox to toggle the completion status of a todo

4. **Deleting a Todo**: Click the "Delete" button and confirm the action

5. **Refreshing**: Use the "Refresh List" button to reload todos from the backend

## Error Handling

The application includes comprehensive error handling:
- Network errors when the backend is unavailable
- Validation errors for required fields
- User-friendly error messages with dismissible notifications

## Development

To build the application for production:

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
