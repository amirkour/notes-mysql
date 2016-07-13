module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "notes",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "notes_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {	// TODO - set this from environment variable
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}