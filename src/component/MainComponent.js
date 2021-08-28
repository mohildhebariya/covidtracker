import React, { useState, useEffect } from "react";
import "./MainComponent.css";
import axios from "axios";
import Checkbox from "./Checkbox";
import Sidecomponent from "./ChildComponent";

export default function MainGrid() {
  const [mainCb, setmainCb] = useState(true);
  const [data, setdata] = useState({ val: 0 });
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    axios
      .get("https://data.covid19india.org/v4/min/data.min.json")
      .then((res) => {
        let myobj = {};
        Object.entries(Object.values(res)[0]).map(([key, value], index) => {
          myobj = { ...myobj, [key]: true };
        });
        setCheckedItems(myobj);
        setdata(res);
      });
  }, []);

  let handelmaincheck = (e) => {
    setmainCb(e.target.checked);
    if (e.target.checked == true) {
      let myobj = {};
      Object.entries(Object.values(data)[0]).map(([keys, value], index) => {
        myobj = { ...myobj, [keys]: true };
      });
      setCheckedItems(myobj);
    }
  };

  let handelCheck = (event) => {
    console.log(event.target);
    if (mainCb == true) setmainCb(false);

    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="topdiv">
      <div className="checkboxdiv">
        <label className="mainlabel">
          <input type="checkbox" checked={mainCb} onChange={handelmaincheck} />
          SELECT STATES
        </label>

        {Object.entries(Object.values(data)[0]).map(([key, value], index) => (
          <Checkbox
            name={key}
            checked={checkedItems[key]}
            handelCheck={handelCheck}
            keyvale={key}
          />
        ))}
      </div>

      <div className="grapdiv">
        <Sidecomponent datajson={data} stateobj={checkedItems} />
      </div>
    </div>
  );
}
