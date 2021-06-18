import React, { useEffect, Fragment, useState } from "react";
import axios from "axios";

const CUOriginDestiny = () => {
  const [originDestinys, setOriginDestinys] = useState([]);
  const [originDestinysSelected, setOriginDestinysSelected] = useState(null);
  const [plans, setPlans] = useState([]);
  const [plansSelected, setPlansSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [withPlanValue, setWithPlanValue] = useState(0);
  const [withoutPlanValue, setWithoutPlanValue] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://9fizt2qd49.execute-api.us-east-1.amazonaws.com/get-all-origindestiny"
      )
      .then(function (response) {
        console.log(response.data);
        setOriginDestinys(response.data);
      })
      .catch(function (error) {
        console.log("err:", error);
      });

    axios
      .get(
        "https://9fizt2qd49.execute-api.us-east-1.amazonaws.com/get-all-plan"
      )
      .then(function (response) {
        console.log(response.data);

        setPlans(response.data);
      })
      .catch(function (error) {
        console.log("err:", error);
      });
  }, []);

  function showPrices() {
    window.location.reload();
    console.log("show prices");

    var originDestiny = originDestinys.find(
      (od) => od.id === originDestinysSelected
    );
    console.log(originDestiny);
    var plan = plans.find((plan) => plan.id === plansSelected);
    console.log(plan);

    /* Calculate sample
    plan=011>017

    CALCULO:
    80*1.7 = 136
    60*1.7 = 102
    136 - 102 = 34
    20*(1.7+0.17(10%) = 1.87) = 37.40
    
    LEGENDAS:
    80 = minutos totais
    60 = minutos permitidos
    136 = valor a ser pago sem o plano
    1.7 = valor por minuto
    20 = minutos fora do plano
    0.17(10% do valor do minuto do plano) = taxa por minuto fora do plano
    1.87 = valor da taxa de minuto fora do plano
    37.40 = valor a ser pago com o plano

    */

    var valueTotalWithoutPay = minutes * parseFloat(originDestiny.value);
    var valueTotalWithPlanPay = plan.minuteMax * originDestiny.value;
    var valueTotalTaxPay = valueTotalWithoutPay - valueTotalWithPlanPay;
    var valueTax =
      parseFloat(originDestiny.value) +
      parseFloat((originDestiny.value / plan.tax).toFixed(2));
    var minutesRest = minutes - plan.minuteMax;
    var valueFinalTotalPay =
      minutesRest > 0 ? (minutesRest * valueTax).toFixed(2) : 0;

    setWithoutPlanValue(valueTotalWithoutPay);
    setWithPlanValue(valueFinalTotalPay);

    setShowResult(true);
  }

  const handleSelectChangeOriginDestiny = (event) => {
    console.log("handleSelectChangeOriginDestiny", event.target.value);
    setOriginDestinysSelected(event.target.value);
  };

  const handleSelectChangePlan = (event) => {
    console.log("handleSelectChangePlan", event.target.value);
    setPlansSelected(event.target.value);
  };

  return (
    <Fragment>
      <h1>CUD OriginDestiny - VX FaleMais</h1>
      <h2>Menu</h2>
      <h3>Instructions</h3>
      <span>CUD = Create, Update, Delete</span>
      <br />
      <span>XXX</span>
      <br />
      <br />
      <ol>
        <li>
          {" "}
          <a  onClick={() => window.history.back()} >Voltar</a>
        </li>
      </ol>
      <br />
      <label>Campo Id: </label>
      {/* <br /> */}
      <input
        onChange={(event) => setMinutes(event.target.value)}
        type="number"
      />
      <br/>
       <label>Campo Name: </label>
      {/* <br /> */}
      <input
        onChange={(event) => setMinutes(event.target.value)}
        type="number"
      />
      <br/>
       <label>Campo Tax: </label>
      {/* <br /> */}
      <input
        onChange={(event) => setMinutes(event.target.value)}
        type="number"
      />
      <br/>
       <label>Campo Minutes Max: </label>
      {/* <br /> */}
      <input
        onChange={(event) => setMinutes(event.target.value)}
        type="number"
      />
      <br />
      <button onClick={() => showPrices()}>Confirmar</button>
      <br />
      <br />

      {showResult && <h1>show result here</h1>}
      

      <table>
          <thead>
            <tr>
              <th>Id |</th>
              <th>Name |</th>
              <th>Tax |</th>
              <th>MinutesMax</th>
            </tr>
          </thead>
          <tbody>
           
            {plans.map((plan) => {
          return  <tr>
              <td>{plan.id}</td>
              <td>{plan.name}</td>
              <td>{plan.tax}%</td>
              <td>{plan.minuteMax}</td>
              </tr>
        })}
          
          </tbody>
        </table>
    </Fragment>
  );
};

export default CUOriginDestiny;
