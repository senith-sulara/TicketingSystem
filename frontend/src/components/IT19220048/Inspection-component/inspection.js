import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "./style.css";
import { API_URL } from "../../utils/constants";
import { CSVLink } from "react-csv";
import setAlert, { setAlerDanger } from "../../IT19204062/Alert/Alert";

const Editable = (props) => {
  const [data, setData] = useState([]);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    setReportData([]);
    axios
      .get(`${API_URL}/api/inspection`, {})

      .then((res) => {
        setData(res.data);
        res.data.forEach((item) => {
          let object = {
            BusID: item.bid,
            BusTime: item.btime,
            BusNo: item.busNo,
            Date: item.date,
            PassengerId: item.passengerId,
          };
          reportData.push(object);
        });
        setReportData(reportData);
      });
  }, []);

  //delete details
  const handleRowDelete = (oldData, resolve) => {
    axios
      .delete(`${API_URL}/api/deleteinspection/` + oldData.id, {})
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
        setAlert("Successfully deleted");
      })
      .catch((error) => {
        setAlerDanger("Delete failed! Try Again!");
        resolve();
      });
  };

  let fields = [
    { title: "Bus ID", field: "bid" },
    { title: "Bus Time", field: "btime" },
    { title: "Bus No ", field: "busNo" },
    { title: "Date", field: "date" },
    { title: "PassengerId", field: "passengerId" },
  ];

  return (
    <div>
      <br />
      <h1 id="h12" align="center">
        Inspection Reports
      </h1>
      <br />
      <div className="tbl">
        <MaterialTable
          title={
            <>
              <Button id="btnAdd" variant="contained" color="primary">
                <CSVLink
                  filename={"InspectionReport.csv"}
                  data={reportData}
               
                  data-toggle="tooltip"
                  data-placement="top"
                  style={{ color: "#ffffff" }}
                >
                  GENERATE EXCEL
                </CSVLink>
              </Button>
            </>
          }
          columns={fields}
          data={data}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                handleRowDelete(oldData, resolve);
              }),
          }}
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
};

export default Editable;
