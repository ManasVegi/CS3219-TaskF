# CS3219-TaskF

Instructions to run are as follows:
1. Open a terminal and run `redis-server`.
2. Open another terminal and open `redis-cli`.
3. Open another terminal.
4. `cd` into root directory of project.
5. Make sure port 8887 is free and run `nodemon backend.js`.
6. Open Postman and make calls to `http://localhost:8887/nasa_images`.
7. Test if caching works by either waiting 60 seconds or `del nasa_images` in the redis-cli
