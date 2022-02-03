import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PurchaseTicket from "./components/IT19220048/ForiegnTicket-component/purchaseTicket";
import SelectFpackage from "./components/IT19220048/ForiegnTicket-component/selectFPackage";
import LuxuryPayment from "./components/IT19220048/ForiegnTicket-component/LuxuryPayment";
import SemiLuxuryPayment from "./components/IT19220048/ForiegnTicket-component/SemiLuxuryPayment";
import SelectLpackage from "./components/IT19220048/LocalPackage-component/selectLPackage";
import LuxuryPaymentLocal from "./components/IT19220048/LocalPackage-component/LuxuryPaymentLocal";
import SemiLuxuryPaymentLocal from "./components/IT19220048/LocalPackage-component/SemiLuxuryPaymentLocal";
import Editable from "./components/IT19220048/Inspection-component/inspection";
import LoginDashboard from "./components/IT19220048/LoginDashboard-component/loginDashboard";
import PaymentHistory from "./components/IT19220048/PaymentHistory-component/PaymentHistory";

import AddSchedule from "./components/IT19204062/schedule-component/addSchedule";
import ViewSchedules from "./components/IT19204062/schedule-component/viewSchedule";
import ViewBuses from "./components/IT19204062/passanger-schedule-component/viewBuses";
import PaymentReport from "./components/IT19204062/payment-report-component/paymentReport";
import AdminSignIn from "./components/IT19204062/admin-component/adminLogin";
import AdminNavBar from "./components/IT19204062/navbar-component/adminNavBar.js";
import Footer from "./components/IT19143828/common/footer";
import AddUser from "./components/IT19143828/user/addUser";
import SignIn from "./components/IT19143828/user/login";
import SignUp from "./components/IT19143828/user/register";
import Profile from "./components/IT19143828/user/userProfile";
import NavBar from "./components/IT19143828/navBar/navBar.js";
import Home from "./components/IT19143828/Home.js";
import Foreign from "./components/IT19143828/foreign";
import AddToken from "./components/IT19143828/addToken/addToken";
import Dash from "./components/IT19143828/dashboad/dashboad";
import History from "./components/IT19143828/History";

import ViewToken from "./components/IT19143828/viewToken/viewToken";

function App() {
  return (
    <div>
      <Router>
        {localStorage.getItem("userType") === "admin" ? (
          <AdminNavBar />
        ) : (
          <NavBar />
        )}
        <section>
          <Switch>
            <Route path="/addSchedule" component={AddSchedule} exact />
            <Route path="/viewSchedule" component={ViewSchedules} exact />
            <Route path="/viewBuses" component={ViewBuses} exact />
            <Route path="/paymentReport" component={PaymentReport} exact />
            <Route path="/adminSignin" component={AdminSignIn} />
            <Route path="/addUser" component={AddUser} />
            <Route path="/profile" component={Profile} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/foreign" component={Foreign} />
            <Route path="/addToken" component={AddToken} />
            <Route path="/dashboad" component={Dash} />
            <Route path="/viewToken" component={ViewToken} />
            <Route path="/history" component={History} />
            <Route path="/purchaseTicket" component={PurchaseTicket} />
            <Route path="/selectFpackage" component={SelectFpackage} />
            <Route path="/flpayment" component={LuxuryPayment} />
            <Route path="/fspayment" component={SemiLuxuryPayment} />
            <Route path="/selectLpackage" component={SelectLpackage} />
            <Route path="/llpayment" component={LuxuryPaymentLocal} />
            <Route path="/lspayment" component={SemiLuxuryPaymentLocal} />
            <Route path="/logindash" component={LoginDashboard} />
            <Route path="/ireport" component={Editable} />
            <Route path="/phistory" component={PaymentHistory} />
            <Route path="/" component={Home} />
          </Switch>
        </section>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
