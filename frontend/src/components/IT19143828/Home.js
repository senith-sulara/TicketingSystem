import img from './images/hed.jpg'
import img1 from './images/bus.jpg'
import img2 from './images/bus2.jpg'
import './home.css';
function Home() {
    return (
      <div>
         <img src={img} className="d-block w-100" style={{ height: '200px'}} alt="img1"/>

         <div id="dep">
           <h1 id="hh">Description</h1>
           <p>We provide full fledged online bus booking platform to buy and <br/>sell bus seats. The passenger can purchase bus tickets online and <br/>in return to confirm the seat reservation.

With the efficient bus reservation<br/> system from Smarttravel.lk, plan your journey early, save your valuable time<br/> in buying bus tickets, avoid waiting in long queues, find to your boarding<br/> place easily and enjoy your happy journey with comfort.</p>
           
         </div>
         <img src={img1} id="imm" style={{with:'350px', height: '300px'}} alt="img1"/>
         <img src={img2} id="ad" style={{ with:'350px', height: '300px'}} alt="img1"/>
         <div id="deep">
           <h1 id="hh">Features</h1>
           <p>Comfortable sleep rest sleep<br/> LOWEST PRICES- We always give you the lowest price with the best partner offers. <br/>SAFETY +
With Safety+ we have brought in a set of measures
like Sanitized buses,<br/> mandatory masks etc. to ensure you travel safely.<br/>
SUPERIOR CUSTOMER SERVICE
We put our experience and relationships to good<br/>
use and are available to solve your travel issues.<br/>
UNMATCHED BENEFITS
We take care of your travel beyond ticketing <br/>by
providing you with innovative and unique benefits.</p>
           
         </div>
      </div>
    );
  }
  
  export default Home;