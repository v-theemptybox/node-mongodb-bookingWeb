import { useNavigate } from "react-router-dom";
import "./featured.css";
import { useEffect, useState } from "react";

const Featured = () => {
  const [cityNumber, setCityNumber] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch("http://localhost:5000/api/postHotels", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cities: ["Ha Noi", "Ho Chi Minh", "Da Nang"],
          }),
        });

        const resData = await request.json();
        setCityNumber(resData.hotelNumbers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="featured">
      <div
        className="featuredItem"
        onClick={() => {
          navigate("/hotels");
        }}
      >
        <img src="/images/HN.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ha Noi</h1>
          <h2>{cityNumber[0] ?? 0} properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img src="/images/HCM.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ho Chi Minh</h1>
          <h2>{cityNumber[1] ?? 0} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="/images/DN.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Da Nang</h1>
          <h2>{cityNumber[2] ?? 0} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
