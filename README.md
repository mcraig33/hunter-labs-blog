An blog app that uses SQLlite as a data store, python as a web api, and react as a front end.

# Getting Started
## Prerequisites

PIP 23.3.1
Python 3.11
Node >=22.3

## Setting up a local dev enironment

1.) Navigate to the backend directory and run "pip install -r requirements.txt"
2.) Return to the root directory of the project and run "uvicorn backend.main:app --reload" to start the web api and initialize the sqlite database
3.) Use sqlite3 to populate the database with sample data. The database is located at the root fo the project, named "hunter_blog.db"
4.) In a separate terminal, navigate to the frontend folder and run "npm install" to install all the dependencies
5.) Run "npm start" to start the React front end.
