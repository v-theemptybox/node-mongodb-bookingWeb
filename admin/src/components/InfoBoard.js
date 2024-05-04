import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faCoins,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const InfoBoard = () => {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getReports");
        const resData = await response.json();
        setReports(resData.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="d-flex flex-row justify-content-between">
        <div className="card w-25 mx-1 shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-start text-secondary">Users</h5>
            <h5 className="card-subtitle text-start">{reports[0]}</h5>
            <div className="card-text d-flex justify-content-end">
              <div className="rounded bg-danger bg-opacity-25">
                <FontAwesomeIcon icon={faUser} className="p-2 text-danger" />
              </div>
            </div>
          </div>
        </div>
        <div className="card w-25 mx-1 shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-start text-secondary">
              Transactions
            </h5>
            <h5 className="card-subtitle text-start ">{reports[1]}</h5>
            <div className="card-text d-flex justify-content-end">
              <div className="rounded bg-warning bg-opacity-25">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="p-2 text-warning"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card w-25 mx-1 shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-start text-secondary">Earnings</h5>
            <h5 className="card-subtitle text-start ">{reports[2]}</h5>
            <div className="card-text d-flex justify-content-end">
              <div className="rounded bg-success bg-opacity-25">
                <FontAwesomeIcon icon={faCoins} className="p-2 text-success" />
              </div>
            </div>
          </div>
        </div>
        <div className="card w-25 mx-1 shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-start text-secondary">
              Latest Earnings
            </h5>
            <h5 className="card-subtitle text-start ">{reports[3]}</h5>
            <div className="card-text d-flex justify-content-end">
              <div className="rounded bg-primary bg-opacity-25">
                <FontAwesomeIcon icon={faWallet} className="p-2 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBoard;
