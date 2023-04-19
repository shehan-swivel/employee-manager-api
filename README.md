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
src/
  api/
    employees/
      schemas/
  constants/
  middlewares/
  utils/
  |-- app.controller.spec.ts
  |-- app.controller.ts
  |-- app.module.ts
  |-- app.service.ts
  |-- main.ts
test/
.env
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

### Swagger documentation

`GET - /docs` - Swagger documentation

### Employee routes

`POST - api/employees` - Create a new employee

`GET - api/employees` - Returns array of employees. Optional query parameters are also acceptable.

`PUT - api/employees/:id` - Update an employee

`DELETE - api/employees/:id` - Delete an employee by id

`GET - api/employees/:id` - Returns an employee by id

## License

[MIT](LICENSE)
