
# My MVP App 

## Table of contents

- [Setup](#setup)
  - [Database prep](#database-prep)
  - [Dependencies](#dependencies)
  - [Development](#development)
- [Resources](#resources)
- [Guide](#guide)
  - [Preparation](#preparation)
  - [In class](#in-class)
    - [Explanation](#explanation)
    - [Code](#code)
- [React (frontend) route considerations](#react--frontend--route-considerations)


## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).


### Database Prep
- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called mvpData: `create database mvpData`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=mvpData
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table called 'students' in your database.

- Make sure you understand how the `users`, `events`, `friends` and `participations` table are constructed.
- If needed make test on postman to understand them better :).
-  In your MySQL console, you can run `use mvpData;` and then `describe events;` to see the structure of the events table, you can do it with all the tables.

#### My database model design


### Development

- Run `npm start` in project directory to start the Express server on port 4000
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.
- - I use React BigCalendar for the calendar template, it might give some error message regarding its .css file, ignore it.

## Resources 

### Calendar
https://github.com/jquense/react-big-calendar

### maps
[www.](https://leafletjs.com/)
https://www.tutorialspoint.com/leafletjs/leafletjs_markers.htm
https://www.thunderforest.com/

### Graph database
https://learn.microsoft.com/en-us/sql/relational-databases/graphs/sql-graph-architecture?view=sql-server-ver16
https://neo4j.com/developer/graph-database/
