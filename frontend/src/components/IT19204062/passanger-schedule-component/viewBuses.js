import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import "./style.css";
import { API_URL } from "../../utils/constants";

export default function ViewBuses() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/schedule/get`, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

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
          title={""}
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
