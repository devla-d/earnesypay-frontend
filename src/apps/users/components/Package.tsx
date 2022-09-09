import React from "react";

type Prop = {
  id: number;
  hours: number;
  name: string;
  percent: number;
  min_amount: number;
  max_amount: number;
  ref_percent: number;
  handleFChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  packFId: string;
};

const Package = (prop: Prop) => {
  const {
    id,
    hours,
    name,
    percent,
    min_amount,
    max_amount,
    handleFChange,
    packFId,
  } = prop;
  return (
    <>
      <div className="col-lg-6">
        <div className="in-packages">
          <div className="in-package-head">
            <div className="left">
              <span>{percent}%</span>
            </div>
            <div className="right">
              <div className="h3">{name}</div>
              <div className="pl">After {hours} Hours</div>
            </div>
          </div>
          <div className="in-package-content">
            <ul>
              <li>
                Minimum:
                <span>{min_amount} USD</span>
              </li>
              <li>
                maxiimum:
                <span>{max_amount} USD</span>
              </li>
            </ul>
          </div>

          <div className="action">
            <div className="radio-toolbar">
              <input
                type="radio"
                name="package"
                id={id.toString()}
                value={id}
                required={true}
                onChange={handleFChange}
                checked={packFId === id.toString()}
              />
              <label htmlFor={id.toString()}>Select</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Package;
