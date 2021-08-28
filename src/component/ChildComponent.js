import React, { useEffect, useState } from "react";
import "./ChildComponent.css";
import { Chart } from "react-google-charts";

export default function Sidecomponent(props) {
  const [graphArry, setgraphArry] = useState([]);
  const [tvsArry, settvsArry] = useState([]);

  useEffect(() => {
    let valuarr = Object.values(props.stateobj);
    let myobjtoAdd = [["City", "recovered", "deceased"]];
    let arrytoClone = [];
    let allstate = 0,
      tetsed = 0,
      recoverd = 0,
      confirm = 0;

    Object.entries(Object.values(props.datajson)[0]).map(
      ([keys, value], index) => {
        if (valuarr[index] == true) {
          allstate += 1;
          tetsed += value.total.tested;
          recoverd += value.total.recovered;
          confirm += value.total.confirmed;
          myobjtoAdd.push([keys, value.total.recovered, value.total.deceased]);
        }
      }
    );

    arrytoClone.push(allstate);
    arrytoClone.push(tetsed);
    arrytoClone.push(confirm);
    arrytoClone.push(recoverd);
    settvsArry(arrytoClone);
    setgraphArry(myobjtoAdd);
  }, [props]);

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }

  return (
    <div>
      <div>
        <div className="div1">
          <h3>SELECTED STATE</h3>
          <p> {tvsArry[0]}</p>
        </div>

        <div className="div2">
          <h3>TESTED</h3>
          <p> {kFormatter(tvsArry[1])}</p>
        </div>

        <div className="div2">
          <h3>CONFIRMED</h3>
          <p> {kFormatter(tvsArry[2])}</p>
        </div>

        <div className="div2">
          <h3>RECOVERED</h3>
          <p> {kFormatter(tvsArry[3])}</p>
        </div>
      </div>
      <h3 className="gptext">GRAPHICAL REPRESENTATION</h3>

      <div className="secondiv">
        <p className="stetetext">STATE WISE</p>
        <p className="stetetext">DISTRICT WISE BY STATE GROUPED</p>
      </div>

      <h4 className="text">TESTED CONFIRMED AND RECOVERED STATE</h4>

      <Chart
        width={"800px"}
        height={"1300px"}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={graphArry}
        options={{
          chartArea: { width: "60%", height: "85%" },
          isStacked: true,
          hAxis: {
            title: "Data",
            minValue: 0,
          },
          vAxis: {
            title: "State",
          },
        }}
      />
    </div>
  );
}
