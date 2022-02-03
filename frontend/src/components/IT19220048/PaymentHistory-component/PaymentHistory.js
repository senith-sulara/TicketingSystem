import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import "./style.css";
import { API_URL } from "../../utils/constants";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Button from "@material-ui/core/Button";
import setAlert, { setAlerDanger } from "../../IT19204062/Alert/Alert";

const PaymentHistory = (props) => {
  const [data, setData] = useState([]);
  const [paymentDetails, setpaymentDetails] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/getpayment`, {}).then((res) => {
      setData(res.data);
    });
    retrievePaymentDetails();
  }, []);

  const retrievePaymentDetails = () => {
    setpaymentDetails(null);
    axios.get(`${API_URL}/api/getpayment`, {}).then((res) => {
      console.log(res.data);
      res.data.forEach((item) => {
        let object = {
          Depature: item.fromTo,
          Destination: item.whereTo,
          Amount: item.amount,
          Date: item.expireDate,
        };
        paymentDetails.push(object);
      });
      setpaymentDetails(paymentDetails);
    });
  };

  //staff member pdf export
  const exportPaymentPDF = (tableData, type) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    console.log(tableData);

    //title of pdf
    const title = "History";
    //headers
    const headers = [["Depature", "Destination", "Amount", "Date"]];

    //data
    if (type == "all") {
      tableData = paymentDetails.map((elt) => [
        elt.Depature,
        elt.Destination,
        elt.Amount,
        elt.Date,
      ]);
    }
    let content = {
      startY: 50,
      head: headers,
      body: tableData,
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    //save name
    doc.save("PaymentReport.pdf");
  };

  //delete details
  const handleRowDelete = (oldData, resolve) => {
    axios
      .delete(`${API_URL}/api/deleterow/` + oldData.id, {})
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
    { title: "Depature", field: "fromTo" },
    { title: "Destination", field: "whereTo" },
    { title: "Amount", field: "amount" },
    { title: "Date", field: "expireDate" },
  ];

  return (
    <div>
      <br />
      <h1 id="h12" align="center">
       Payment History
      </h1>
      <br />
      <div className="tbl">
        <MaterialTable
          title={
            <>
              <Button
                id="btnAdd"
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => exportPaymentPDF(paymentDetails, "all")}
              >
                GENERATE PDF
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

export default PaymentHistory;
