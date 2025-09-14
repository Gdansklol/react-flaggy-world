import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Collection = () => {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("collection")) || [];
    setCountries(saved);
  }, []);

  const handleDelete = (countryName) => {
    const updated = countries.filter((c) => c.name.common !== countryName);
    setCountries(updated);
    localStorage.setItem("collection", JSON.stringify(updated));
  };

  const handleNavigate = (countryName) => {
    navigate(`/countries/${countryName}`);
  };

  return (
    <div className="collection-page">
      <section className="collection-list">
        {countries.length > 0 ? (
          countries.map((country) => (
            <div
              key={country.cca3}
              className="collection-item"
              onClick={() => handleNavigate(country.name.common)}
            >
              <div className="country-info">
                <img
                  src={country.flags.svg}
                  alt={country.flags.alt || country.name.common}
                  className="flag"
                />
                <span>{country.name.common}</span>
              </div>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleDelete(country.name.common);
                }}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No saved countries yet.</p>
        )}
      </section>
    </div>
  );
};

export default Collection;
