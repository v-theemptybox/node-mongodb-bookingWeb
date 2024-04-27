import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faCoins,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

const InfoBoard = () => {
  return (
    <div>
      <div className="d-flex flex-row justify-content-between">
        <div className="card w-25 mx-1 shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-start text-secondary">Users</h5>
            <h5 className="card-subtitle text-start">100</h5>
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
            <h5 className="card-subtitle text-start ">100</h5>
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
            <h5 className="card-subtitle text-start ">100</h5>
            <div className="card-text d-flex justify-content-end">
              <div className="rounded bg-success bg-opacity-25">
                <FontAwesomeIcon icon={faCoins} className="p-2 text-success" />
              </div>
            </div>
          </div>
        </div>
        <div className="card w-25 mx-1 shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-start text-secondary">Earnings</h5>
            <h5 className="card-subtitle text-start ">100</h5>
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
