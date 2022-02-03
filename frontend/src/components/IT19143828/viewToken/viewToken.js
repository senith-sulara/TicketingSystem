import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "../addToken/style.css";
import { API_URL } from "../../utils/constants";
import setAlert, { setAlerDanger } from "../Alert/Alert";
// import Modal from "./Modal";

export default function ViewSchedules() {
  const [data, setData] = useState([]);
  const [reportData, setReportData] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/api/PaidAll`, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

   //delete details
   const handleRowDelete = (oldData, resolve) => {
    axios
      .delete(`${API_URL}/api/token/` + oldData.id, {
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
    { title: "ID/QR", field: "id" },
    { title: "Amount", field: "amount" },
    { title: "Status", field: "status" },
    // { title: "Destination", field: "destination" },
    // { title: "Time", field: "time" },
  ];

  return (
    <div>
      <br />
      <h1 id="h12" align="center">
        Recharge History
      </h1>
      <div className="tbl2">
        <MaterialTable
        title={
            <>
              <Button
                id="btnAdd"
                variant="contained"
                color="primary"
                href="/addToken"
              >
                Recharge
              </Button>
            </>
          }
          columns={fields}
          data={data}
          editable={{
            // onRowUpdate: (newData, oldData) =>
            //   new Promise((resolve, reject) => {
            //     // handleRowUpdate(newData, oldData, resolve);
            //   }),

            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                 handleRowDelete(oldData, resolve);
              }),
          }}
          options={{
            headerStyle: {
                // action: false,
              backgroundColor: "rgb(72, 138, 199)",
              color: "rgba(0, 0, 0)",
            },
            actionsColumnIndex: -1,
          }}
        />
      </div>
      {/* <Modal
        title="Send Email "
        openPopup={openModal}
        setOpenPopup={setOpenModal}
      >
        <EmailForm setOpenModal={setOpenModal} emailData={emailData} />
      </Modal> */}
    </div>
  );
}


//

// import React, { useState, useEffect } from "react";
// import MaterialTable from "material-table";
// import Button from "@material-ui/core/Button";
// import axios from "axios";
// import "./style.css";
// import { API_URL } from "../../utils/constants";
// // import Modal from "./Modal";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const Editable = (props) => {
//   const [data, setData] = useState([]);
//   const [inspectionDetails, setinspectionDetails] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/api/inspection`, {
//         // headers: {
//         //   Authorization: `Bearer ${localStorage.getItem("token")}`,
//         // },
//       })
//       .then((res) => {
//         setData(res.data);
//       });
//     retrieveInspectionDetails();
//   }, []);

//   const retrieveInspectionDetails = () => {
//     setinspectionDetails(null);
//     axios.get(`${API_URL}/api/inspection`, {}).then((res) => {
//       console.log(res.data);
//       res.data.forEach((item) => {
//         let object = {
//           BusNo: item.date,
//           Date: item.bid,
//           Time: item.btime,
//           PassengerId: item.passengerId,
//         };
//         inspectionDetails.push(object);
//       });
//       setinspectionDetails(inspectionDetails);
//     });
//   };

//   //staff member pdf export
//   const exportInspectionPDF = (tableData, type) => {
//     const unit = "pt";
//     const size = "A4"; // Use A1, A2, A3 or A4
//     const orientation = "portrait"; // portrait or landscape
//     const marginLeft = 40;
//     const doc = new jsPDF(orientation, unit, size);
//     doc.setFontSize(15);
//     console.log(tableData);

//     //title of pdf
//     const title = "Inspection report";
//     //headers
//     const headers = [["Bus No", "Date", "Time", "Passenger ID"]];

//     //data
//     if (type == "all") {
//       tableData = inspectionDetails.map((elt) => [
//         elt.BusNo,
//         elt.Date,
//         elt.Time,
//         elt.PassengerId,
//       ]);
//     }
//     let content = {
//       startY: 50,
//       head: headers,
//       body: tableData,
//     };
//     doc.text(title, marginLeft, 40);
//     doc.autoTable(content);
//     //save name
//     doc.save("InspectionReport.pdf");
//   };

//   let fields = [
//     { title: "Bus No", field: "date" },
//     { title: "Date", field: "bid" },
//     { title: "Time", field: "btime" },
//     { title: "PassengerId", field: "passengerId" },
//   ];

//   return (
//     <div>
//       <br />
//       <h1 id="h12" align="center">
//         Inspection Reports
//       </h1>
//       <br />
//       <div className="tbl">
//         <MaterialTable
//           title={
//             <>
//               <Button
//                 id="btnAdd"
//                 variant="contained"
//                 color="primary"
//                 type="submit"
//                 onClick={() => exportInspectionPDF(inspectionDetails, "all")}
//               >
//                 GENERATE
//               </Button>
//             </>
//           }
//           columns={fields}
//           data={data}
//           options={{
//             headerStyle: {
//               backgroundColor: "rgb(72, 138, 199)",
//               color: "rgba(0, 0, 0)",
//             },
//             actionsColumnIndex: -1,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Editable;