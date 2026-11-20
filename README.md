
# Student Task Manager

A simple task management web application built as a DevOps academic project.

## Features
- Add new tasks
- View all tasks
- Mark tasks as completed
- Delete tasks
- Persistent MongoDB storage

## Technology Stack
- HTML, CSS, JavaScript
- Node.js and Express.js
- MongoDB
- Docker and Docker Compose
- Jenkins
- Git and GitHub

## Architecture
The application uses two Docker containers:
1. Node.js Express application
2. MongoDB database

Docker Compose manages both containers.

## Run Locally

Install dependencies:

npm install

Start the Docker containers:

docker compose up -d --build

Open:

http://localhost:3000

## Run Tests

npm test

## Stop Containers

docker compose down

## CI/CD Pipeline

Jenkins automates:
1. GitHub source code checkout
2. Dependency installation
3. Docker image build and deployment
4. Automated API testing
5. Deployment verification

## Project Purpose

Developed for a DevOps practical to demonstrate
Docker Compose and Jenkins CI/CD integration.
