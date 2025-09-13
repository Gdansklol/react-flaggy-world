import { useDispatch, useSelector } from "react-redux";
import { fetchCountriesRegion } from "../redux/countriesSlice";
import { useNavigate } from "react-router-dom";
import '../css/countries.css';

const regions = ["Europe", "Asia", "Oceania", "Americas", "Africa"];

const Countries = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {list, status, error} = useSelector((state)=> state.countries);

  return (
    <div>
      <h2>Countries Page</h2>
      <div className="">
      {regions.map((region)=> (
        <button key={region} onClick={()=> dispatch(fetchCountriesRegion(region.toLowerCase()))} >
          {region}
        </button>
      ))}
      </div>
      
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      {status === "success" && (
        <div>
          {list.map((country) => (
            <div 
            key={country.cca3}
            onClick={()=>navigate(`/countries/${country.name.common}`)}
            >
              <img 
              src={country.flags.png}
              ald={country.name.common}
              />
              <p>{country.name.common}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Countries;