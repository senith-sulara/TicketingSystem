import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "./style.css";
import { API_URL } from "../../utils/constants";
import setAlert, { setAlerDanger } from "../Alert/Alert";
import { CSVLink } from "react-csv";

export default function ViewSchedules() {
  const [data, setData] = useState([]);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/schedule/get`, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      })
      .then((res) => {
        setData(res.data);
        res.data.forEach((item) => {
          let object = {
            BusNumber: item.busNumber,
            Driver: item.driver,
            Depature: item.depature,
            Destination: item.destination,
            Time: item.time,
          };
          reportData.push(object);
        });
        setReportData(reportData);
      });
  }, []);

  //update details
  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (newData.busNumber === "") {
      errorList.push("Please enter bus number");
    }
    if (newData.driver === "") {
      errorList.push("Please enter driver");
    }
    if (newData.depature === "") {
      errorList.push("Please enter depature");
    }
    if (newData.destination === "") {
      errorList.push("Please enter destination");
    }
    if (newData.time === "") {
      errorList.push("Please enter time");
    }

    if (errorList.length < 1) {
      axios
        .put(`${API_URL}/api/schedule/update/` + newData.id, newData, {
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
          // },
        })
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setAlert("Successfully updated");
        })
        .catch((error) => {
          setAlerDanger("Update failed! Try Again!");
          resolve();
        });
    } else {
      setAlerDanger("Please try again");
      resolve();
    }
  };

  //delete details
  const handleRowDelete = (oldData, resolve) => {
    axios
      .delete(`${API_URL}/api/schedule/delete/` + oldData.id, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      })
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
    { title: "Bus Number", field: "busNumber" },
    { title: "Driver", field: "driver" },
    { title: "Depature", field: "depature" },
    { title: "Destination", field: "destination" },
    { title: "Depature Time", field: "time" },
  ];

  return (
    <div>
      <br />
      <h1 id="h12" align="center">
        Bus Schedules
      </h1>
      <div className="tbl">
        <MaterialTable
          title={
            <>
              <Button id="btnAdd" variant="contained">
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
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                handleRowUpdate(newData, oldData, resolve);
              }),

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
}
