import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryDetail } from '../redux/countriesSlice';
import "../css/CountryDetail.css";

const CountryDetail = () => {
  const { countryName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detail, status, error } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchCountryDetail(countryName));
  }, [dispatch, countryName]);

  const handleSave = () => {
    if (!detail) return;

    let saved = JSON.parse(localStorage.getItem("collection")) || [];

    if (!saved.some(country => country.name.common === detail.name.common)) {
      saved.push(detail);
      localStorage.setItem("collection", JSON.stringify(saved));

      alert("Country saved to your collection!");
      navigate("/collection");
    } else {
      alert("This country is already in your collection!");
    }
  };

  return (
    <div className="country-detail-page">
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      {status === "success" && detail && (
        <div className="country-detail-card">
          <img
            src={detail.flags?.svg}
            alt={detail.flags?.alt || "Flag"}
          />
          <div className="country-detail-info">
            <h3>{detail?.name?.common || "No name available"}</h3>

            <p>
              <strong>Population:</strong>{" "}
              {detail.population?.toLocaleString() || "Unknown"}
            </p>

            <p>
              <strong>Currencies:</strong>{" "}
              {detail.currencies
                ? Object.entries(detail.currencies)
                    .map(([code, { name, symbol }]) => `${name} (${symbol}, ${code})`)
                    .join(", ")
                : "Not available"}
            </p>

            <p>
                <strong>Language:</strong>
                {detail.languages 
                ? Object.values(detail.languages).join(",")
              : "Not available"}
            </p>
            
            {detail?.maps ? (
              <a href={detail.maps.googleMaps} target="_blank" rel="noreferrer">
               Location:  🌍 View on Google Maps
              </a>
            ) : (
              <p>No map link available</p>
            )}

            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
