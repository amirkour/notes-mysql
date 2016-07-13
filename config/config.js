module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "notes",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging":true
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "notes_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging":false
  },
  "production": {	// TODO - set this from environment variable
    "username": "WRONG",
    "password": "WRONG",
    "database": "WRONG",
    "host": "WRONG",
    "dialect": "WRONG",
    "logging":false
  }
}
