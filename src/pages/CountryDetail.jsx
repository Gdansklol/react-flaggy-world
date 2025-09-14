import {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryDetail } from '../redux/countriesSlice';

const CountryDetail = () => {
  const { countryName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detail, status, error } = useSelector((state) => state.countries);

  useEffect(()=> {
    dispatch(fetchCountryDetail(countryName));
  },[dispatch,countryName]);

  const handleSave = () => {
    if(!detail) return;

    let saved = JSON.parse(localStorage.getItem("collection")) || [];

    if(!saved.some(country => country.name.common === detail.name.common)) {
      saved.push(detail);
      localStorage.setItem("collection", JSON.stringify(saved));

      alert(" Country saved to your collection!");
      navigate("/collection"); 
    } else {
      alert(" This country is already in your collection!");
    }
  };

  return (
    <>
      <section>
        <h2>Country Detail Page</h2>
        <p>Selected Country: {countryName}</p>
      </section>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      {status === "success" && detail && (
        <div>
          <h3>{detail?.name?.common || "No name available"}</h3>

          {detail?.flags 
            ? <img src={detail.flags.svg} alt={detail.flags.alt || "Flag"} />
            : <p>No flag available</p>
          }

          <p>
            <strong>Population:</strong>{" "}
            {detail.population || "Unknown"}
          </p>

          <p>
            <strong>Currencies:</strong>{" "}
            {detail.currencies 
              ? Object.entries(detail.currencies)
                  .map(([code, { name, symbol }]) => `${name} (${symbol}, ${code})`)
                  .join(", ")
              : "Not available"}
          </p>

          {detail?.maps 
            ? <a href={detail.maps.googleMaps} target="_blank" rel="noreferrer">View on Google Maps</a>
            : <p>No map link available</p>
          }

          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </>
  );
};

export default CountryDetail;
