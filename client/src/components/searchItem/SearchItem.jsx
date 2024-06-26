import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({
  hotelId,
  name,
  distance,
  tag,
  type,
  description,
  free_cancel,
  price,
  rate,
  rate_text,
  img_url,
}) => {
  return (
    <div className="searchItem">
      <img src={img_url} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{name}</h1>
        <span className="siDistance">{distance}m from center</span>
        <span className="siTaxiOp">{tag}</span>
        <span className="siSubtitle overDesc">{description}</span>
        <span className="siFeatures">{type}</span>
        {/* If can cancel */}
        {free_cancel ? (
          <div>
            <span className="siCancelOp">Free cancellation </span>
            <p className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{rate_text}</span>
          <button>{rate.toFixed(1)}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={hotelId} className="siCheckButton" target="_blank">
            See availability
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
