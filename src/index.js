import express from "express";
import "dotenv/config";
import * as Sentry from "@sentry/node";
import amenitiesRouter from "../src/routes/amenities.js";
import bookingsRouter from "../src/routes/bookings.js";
import hostsRouter from "../src/routes/hosts.js";
import propertiesRouter from "../src/routes/properties.js";
import reviewsRouter from "../src/routes/reviews.js";
import usersRouter from "../src/routes/users.js";
import loginRouter from "../src/routes/login.js";
import logMiddleware from "../src/middleware/logMiddleware.js";
import errorHandler from "../src/middleware/errorHandler.js";

const app = express();

Sentry.init({
  dsn: "https://1054441d3f579148a2aedaae5b625958@o4506626472542208.ingest.sentry.io/4506746350796800",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use(logMiddleware);
// Resource routes..
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  const html =
    "<h1>Booking-API</h1><h2>Welcome to our BOOKING_API</h2><p>By using: GET - POST - PUT & DELETE you can handle the bookings!</p>";
  res.send(html);
  res.send("Booking-API");
});

app.get("/about", (req, res) => {
  const html =
    "<h1>About bookings</h1><h2>Welcome to our BOOKING_API</h2><p>By using: GET - POST - PUT & DELETE you can handle the bookings!</p>";
  res.send(html);
  res.send("Booking-API");
});


app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
// app.use(function onError(err, req, res, next) {
// The error id is attached to `res.sentry` to be returned
// and optionally displayed to the user for support.
// res.statusCode = 500;
// res.end(res.sentry + "\n");
// });

// This snippet contains an intentional error and can be used as a test to make sure that everything's working as expected.
// app.get("/debug-sentry", function mainHandler(req, res) {
// throw new Error("My first Sentry error!");
// });

// Error handling
app.use(errorHandler);


app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
