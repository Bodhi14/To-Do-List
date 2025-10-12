# To-Do List

A simple and intuitive To-Do List web application to help you organize your tasks efficiently.

## 🚀 Live Demo
The app is live at: [https://todo-list-latest.onrender.com/](https://todo-list-latest.onrender.com/)

## 🐳 Dockerized Deployment
This app is now fully dockerized and can be run anywhere with Docker support.

### Build & Run Locally with Docker
1. Build the Docker image:
   ```bash
   docker build -t bodhi140802/todo-list:latest .
   ```
2. Run the container:
   ```bash
   docker run -p 80:80 bodhi140802/todo-list:latest
   ```
3. Visit [http://localhost](http://localhost) in your browser.

### Deploying to Render
- Go to [Render](https://render.com/)
- Create a new Web Service → Deploy an existing image from a registry
- Use image: `bodhi140802/todo-list:latest`
- Set port to `80`
- Deploy and get your public URL!

## Features
- Add, edit, and delete tasks
- Organize tasks into lists
- Modal dialogs for task and list management
- Responsive design for mobile and desktop
- Firebase integration for real-time data storage

## Getting Started (Development)

### Prerequisites
- Node.js
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Bodhi14/To-Do-List.git
   cd To-Do-List
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Project Structure
- `App.js`: Main application component
- `components/`: Contains all React components
- `assets/`: Images and icons
- `Firebase.js`: Firebase configuration
- `dummydata.js`: Sample data for testing

## About
This project is a modern To-Do List app built with React and Firebase, designed for simplicity and productivity. You can use it to manage daily tasks, create custom lists, and access your data from anywhere.

## License
This project is licensed under the MIT License.
