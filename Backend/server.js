"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");

const paymentRoutes = require("./routes/payment-routes");
const FpaymentRoutes = require("./routes/foreignPayment-route");
const HistoryRoutes = require("./routes/purchaseHistory-route");
const InspectionRoutes = require("./routes/inspection-route");

const scheduleRoutes = require("./routes/schedule-routes");
const paymentReportRoutes = require("./routes/paymentReport-routes");
const adminLoginRoutes = require("./routes/adminLogin-routes");
const tokenRoutes = require('./routes/token-routes');
const userRoutes = require('./routes/user-routes');
const userLogRoutes = require('./routes/userLogin-routes');


const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", paymentRoutes);
app.use("/api", FpaymentRoutes);
app.use("/api", HistoryRoutes);
app.use("/api", InspectionRoutes);


app.use("/api/schedule", scheduleRoutes.routes);
app.use("/api/paymentReport", paymentReportRoutes.routes);
app.use("/api/adminLogin", adminLoginRoutes.routes);

app.use('/api', tokenRoutes.routes);
app.use('/api', userRoutes.routes);
app.use('/api', userLogRoutes.routes);



app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));


