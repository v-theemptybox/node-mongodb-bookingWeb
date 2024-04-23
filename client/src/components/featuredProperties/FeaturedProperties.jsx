import "./featuredProperties.css";
import { useEffect, useState } from "react";

const FeaturedProperties = () => {
  const [topRateHotels, setTopRateHotels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch("http://localhost:5000/api/postHotels", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            top3Rating: 3,
          }),
        });

        const resData = await request.json();
        setTopRateHotels(resData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="fp">
      {topRateHotels.map((hotel) => (
        <div key={hotel._id} className="fpItem">
          <img src={hotel.photos[2]} alt="" className="fpImg" />
          <span className="fpName">
            <a href="./hotels/0" target="_blank" rel="noopener noreferrer">
              {hotel.name}
            </a>
          </span>
          <span className="fpCity">{hotel.city}</span>
          <span className="fpPrice">Starting from ${hotel.cheapestPrice}</span>
          <div className="fpRating">
            <button>{hotel.rating.toFixed(1)}</button>
            <span>Excellent</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
