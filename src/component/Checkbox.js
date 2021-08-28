import React from "react";

export default function Mycheckbox({name, checked = true, handelCheck, keyvale }) {
  return (
    <>
      <label className="smalllabel">
        <input
          type="checkbox"
          name = {name}
          checked={checked}
          onChange={handelCheck}
        />
        {keyvale}
      </label>
    </>
  );
}
