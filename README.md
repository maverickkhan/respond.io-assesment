# Respond.io Backend Test

Welcome to the Respond.io Backend Test project! This repository contains the backend codebase for the Respond.io application. Below you will find instructions on how to set up and run the project locally, as well as additional information and notes.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16.17.1)
- NPM (package manager)
- MySQL (v13 or later)

## Getting Started

1. Install dependencies using NPM:

```bash
npm install
```

2. Set up the environment variables:

Update the environment file (.env) with your database connection details:

```plaintext
# PORT
PORT = 3001

# DATABASE
DB_USER = root
DB_PASSWORD = ''
DB_HOST = localhost
DB_PORT = 3306
DB_DATABASE = respond-test
DB_SYNC = false,
REDIS_URL = redis://localhost:6379

# TOKEN
SECRET_KEY = secretKey

# LOG
LOG_FORMAT = dev
LOG_DIR = ../logs

# CORS
ORIGIN = *
CREDENTIALS = true
```

5. Start the development server:

```bash
npm run dev
```

The application should now be running at `http://localhost:3001`.

## Linting

To lint the source code, use the following command:

```bash
npm run lint
```

To automatically fix linting issues, use:

```bash
npm run lint:fix
```

## API Documentation

The Postman collection (in JSON format) is included in the repository. You can import this collection into Postman and use it to consume the APIs by changing the port number to match the one specified in the `.env` file.

## Additional Information

- This project uses Node.js as the backend runtime environment.
- The database is set up using MySQL with Sequelize as the ORM.
- The application uses a secret key for generating and verifying tokens.
- Logs are generated in the `../logs` directory using the specified log format.
- Cross-Origin Resource Sharing (CORS) is enabled with the specified configurations.

## Notes

- Make sure to run the necessary database is sync and keep the database schema up-to-date.

Thank you for checking out my work! If you have any questions or issues, please feel free to reach out to me! Happy coding!
