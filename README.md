# Employee Manager API

Employee Manager RESTful API which built with NestJS.

## Clone the repository

```bash
$ git clone https://github.com/shehanswivel/employee-manager-api.git
```

## Installation

```bash
$ npm install
```

## Environment variables

Make sure to create .env file in the project root with the variables that included in .env.example file.

```bash
# App running port
PORT=<PORT>

# Database configurations
DB_URL=<MONGO DB CONNECTION STRING>

# API Key to share with client apps.
# This API Key should be provided by each client using the X-Api-Key header in the request.
API_KEY=<YOUR API KEY>

# CORS allowed origins (ex: http://localhost:3000,https://example.com)
ALLOWED_ORIGINS=<COMMA SEPARATED ORIGIN LIST>
```

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```

## Project structure

```bash
src/                          # Source folder
  api/                        # Contains all the API modules
    employees/                # Employee module
      schemas/                # Employee schemas
  constants/                  # Contains all the constants
  middlewares/                # Contains all the custom middlewares
  utils/                      # Contains all the utils
  |-- app.controller.spec.ts
  |-- app.controller.ts
  |-- app.module.ts
  |-- app.service.ts
  |-- main.ts
test/
.env.example
.eslintrc.js
.gitignore
.prettierrc
nest-cli.json
package-lock.json
package.json
README.md
tsconfig.build.json
tsconfig.json
```

## API Endpoints

API endpoints are secured by an API Key. To access the endpoints, make sure to provide a valid API Key using the X-Api-Key header in the request. When using Swagger, you can use the "Authorize" option in the Swagger UI to provide the API Key.

### Swagger documentation

`GET - /docs` - Swagger documentation

### Employee routes

`POST - api/v1/employees` - Create a new employee

`GET - api/v1/employees` - Returns array of employees. Optional query parameters are also acceptable.

`PUT - api/v1/employees/:id` - Update an employee

`DELETE - api/v1/employees/:id` - Delete an employee by id

`GET - api/v1/employees/:id` - Returns an employee by id

## License

[MIT](LICENSE)
