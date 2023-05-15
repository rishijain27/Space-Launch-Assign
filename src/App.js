import "./App.css";
import { createContext, useEffect, useState } from "react";
import LaunchCard from "./components/LaunchCard";

export const SpaceContext = createContext();

function App() {
  const [data, setData] = useState([]);
  const LaunchYears = [
    2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
    2018, 2019, 2020,
  ];
  const [filters, setFilters] = useState({
    year: undefined,
    launch_success: undefined,
    land_success: undefined,
  });
  const [loaded, setLoaded] = useState(false);
  const [uri, setUri] = useState(
    "https://api.spacexdata.com/v3/launches?limit=100"
  );

  if (loaded) {
    console.log(filters);
    let baseUrl = "https://api.spacexdata.com/v3/launches?limit=100";
    if (filters.launch_success !== undefined) {
      baseUrl += "&launch_success=" + filters.launch_success;
    }
    if (filters.land_success !== undefined) {
      baseUrl += "&land_success=" + filters.land_success;
    }
    if (filters.year !== undefined) {
      baseUrl += "&launch_year=" + filters.year;
    }
    setUri(baseUrl);
    setLoaded(false);
  }
  useEffect(() => {
    fetch(uri, {
      "Content-Type": "application/json",
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log(result);
        console.log(uri);
      });
  }, [uri]);

  return (
    <SpaceContext.Provider value={{ data }}>
      <div className="gg">
        <h2 className="alignc">SpaceX Launch Programs</h2>
        <div className="flexing">
          <div className="card">
            <h4>Filters</h4>
            <h5>Launch Year</h5>
            <div className="container1">
              {LaunchYears.map((lyear) => {
                return (
                  <button
                    value={lyear}
                    onClick={() => {
                      setFilters({ ...filters, year: lyear });
                      setLoaded(true);
                    }}
                    className={
                      filters.year === lyear ? "clicked-btn" : "unclicked-btn"
                    }
                  >
                    {lyear}
                  </button>
                );
              })}
            </div>
            <div className="filter-launch">
              <h5>Succesfull launch</h5>
              <button
                onClick={() => {
                  setFilters({ ...filters, launch_success: true });
                  setLoaded(true);
                }}
                className={
                  filters.launch_success === true
                    ? "clicked-btn"
                    : "unclicked-btn"
                }
              >
                True
              </button>
              <button
                onClick={() => {
                  setFilters({ ...filters, launch_success: false });
                  setLoaded(true);
                }}
                className={
                  filters.launch_success === false
                    ? "clicked-btn"
                    : "unclicked-btn"
                }
              >
                False
              </button>
            </div>
            <div className="filter-land">
              <h5>Succesfull landing</h5>
              <button
                onClick={() => {
                  setFilters({ ...filters, land_success: true });
                  setLoaded(true);
                }}
                className={
                  filters.land_success === true
                    ? "clicked-btn"
                    : "unclicked-btn"
                }
              >
                True
              </button>
              <button
                onClick={() => {
                  setFilters({ ...filters, land_success: false });
                  setLoaded(true);
                }}
                className={
                  filters.land_success === false
                    ? "clicked-btn"
                    : "unclicked-btn"
                }
              >
                False
              </button>
            </div>
          </div>

          <div>
            <LaunchCard filters={filters} />
          </div>
        </div>
        <h2 className="alignc">Develpoed By: Rishi Jain</h2>
      </div>
    </SpaceContext.Provider>
  );
}

export default App;
