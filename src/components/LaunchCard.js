import React, { useContext } from "react";
import { SpaceContext } from "../App";
import "./LaunchCard.css";
const LaunchCard = (props) => {
  const { data } = useContext(SpaceContext);

  return (
    <div className="container">
      {data.map((result) => {
        // console.log(result);
        return (
          <div className="card">
            <div className="card-image">
              <img src={result.links.mission_patch} alt="space launch" />
            </div>
            <div className="card-content">
              <span className="card-title">
                {result.mission_name}#{result.flight_number}
              </span>
              <h6 className="cardprops">Mission Ids:</h6>
              <ul>
                <li>{result.misssion_id}</li>
              </ul>
              <div className="content_display">
                <h6 className="cardprops">Launch Year:</h6>
                {result.launch_year}
              </div>
              <div className="content_display">
                <h6 className="cardprops">Succesfull Launch:</h6>
                {result.launch_success === true ? "true" : "false"}
              </div>
              <div className="content_display">
                <h6 className="cardprops">Succesfull Landing:</h6>
                {props.filters.land_success === true ? "true" : "false"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LaunchCard;
