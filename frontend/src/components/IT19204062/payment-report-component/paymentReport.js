import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "../schedule-component/style.css";
import { API_URL } from "../../utils/constants";
import setAlert, { setAlerDanger } from "../Alert/Alert";
import { CSVLink } from "react-csv";

export default function PaymentReport() {
  const [data, setData] = useState([]);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/paymentReport/get`, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      })
      .then((res) => {
        setData(res.data);
        res.data.forEach((item) => {
          let object = {
            Date: item.expireDate,
            Depature: item.fromTo,
            Destination: item.whereTo,
            Passanger: item.name,
            Amount: item.amount,
          };
          reportData.push(object);
        });
        setReportData(reportData);
      });
  }, []);

  let fields = [
    { title: "Date", field: "expireDate" },
    { title: "Passenger Name", field: "name" },
    { title: "Depature", field: "fromTo" },
    { title: "Destination", field: "whereTo" },
    { title: "Amount", field: "amount" },
  ];

  return (
    <div>
      <br />
      <h1 id="h12" align="center">
        Payment History
      </h1>
      <div className="tbl">
        <MaterialTable
          title={
            <>
              <Button id="btnAdd" variant="contained" color="primary">
                <CSVLink
                  filename={"BusSchedule.csv"}
                  data={reportData}
                 
                  data-toggle="tooltip"
                  data-placement="top"
                  style={{ color: "#ffffff" }}
                >
                  Generate Report
                </CSVLink>
              </Button>
            </>
          }
          columns={fields}
          data={data}
          options={{
            headerStyle: {
              backgroundColor: "rgb(72, 138, 199)",
              color: "rgba(0, 0, 0)",
            },
            actionsColumnIndex: -1,
          }}
        />
      </div>
    </div>
  );
}
