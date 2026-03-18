# Third Lesson Tasks

## 1. Copy .env

Copy the contents of `.env.sample` to a new `.env` file.

**On Linux or macOS:**

cp .env.sample .env

On Windows, run:

copy .env.sample .env

You can set any value for the PORT variable.

2. Task 1 — GET /sum

Add server handling for the /sum route.

Expect two query parameters: a and b.

The server should return the sum of these numbers in JSON format, for example: { "result": 11 }.

Write a client request in request-http.js using http.request to request <your server url>/sum?a=5&b=6.

Log the response in the console.

Then implement the same request using axios in request-axios.js.

3. Task 2 — POST /sum

Now, numbers should be sent via POST request body instead of query parameters.

Add server logic to handle POST requests to /sum.

In client files request-http.js and request-axios.js, add corresponding POST requests with body JSON, for example: { "a": 5, "b": 6 }.

4. Task 3 — Check Event Loop

Open the file check-event-loop.js.

Analyze why each line runs in the observed order.

You can run it using:

npm run check-loop