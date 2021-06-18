import React, { useEffect, Fragment, useState } from "react";
import axios from "axios";
import { ENDPOINT_GET_ALL_ORIGINDESTINY, ENDPOINT_GET_ALL_PLAN } from "./constants";

const App = () => {
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
      .get(ENDPOINT_GET_ALL_ORIGINDESTINY)
      .then(function (response) {
        setOriginDestinys(response.data);
      })
      .catch(function (error) {
        console.log("err:", error);
      });

    axios
      .get(ENDPOINT_GET_ALL_PLAN)
      .then(function (response) {
        setPlans(response.data);
      })
      .catch(function (error) {
        console.log("err:", error);
      });
  }, []);

  function showPrices() {
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
   var valueTax = parseFloat(originDestiny.value) + parseFloat((originDestiny.value/plan.tax).toFixed(2));
   var minutesRest = minutes - plan.minuteMax;
   var valueFinalTotalPay = minutesRest > 0 ? (minutesRest * valueTax).toFixed(2) : 0;


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
      <h1>VX FaleMais</h1>
      <h2>Menu</h2>
      <ol>
        <li> <a href="" >CRUD origem e destino</a></li>
        <li> <a href="" >CRUD Plano</a></li>
        <li> <a href="https://github.com/ismaelash/falemais-node-backend" >Github</a></li>
        <li> <a href="https://www.ismaelnascimento.com/" >Contatos</a></li>
      </ol>
      <br />
      <label>Escolha origem e destino: </label>
      <br />
      <select onChange={handleSelectChangeOriginDestiny}>
        <option>Selecione origem e destino</option>
        {originDestinys.map((originDestiny) => {
          return (
            <option key={originDestiny.id} value={originDestiny.id}>
              {originDestiny.origin} - {originDestiny.destiny}
            </option>
          );
        })}
      </select>
      <br />

      <br />
      <label>Digite o tempo de ligação em minutos: </label>
      <br />
      <input
        onChange={(event) => setMinutes(event.target.value)}
        type="number"
      />
      <br />
      <br />
      <label>Escolha um plano: </label>
      <br />
      <select onChange={handleSelectChangePlan}>
        <option>Selecione origem e destino</option>
        {plans.map((plan) => {
          return (
            <option key={plan.id} value={plan.id}>
              {plan.name}
            </option>
          );
        })}
      </select>
      <br />
      <br />

      <button onClick={() => showPrices()}>Consultar</button>
      <br />
      <br />

      {showResult && (
        <table>
          <thead>
            <tr>
              <th>Sem plano</th>
              <th>Com plano</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>R${withoutPlanValue}</td>
              <td>R${withPlanValue}</td>
            </tr>
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

export default App;
