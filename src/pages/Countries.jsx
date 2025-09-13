import { useDispatch, useSelector } from "react-redux";
import { fetchCountriesRegion } from "../redux/countriesSlice";

const regions = ["Europe", "Asia", "Oceania", "Americas", "Africa"];

const Countries = () => {
  const dispatch = useDispatch();
  const {list, status, error} = useSelector((state)=> state.countries);

  return (
    <div>
      <h2>Countries Page</h2>
      {regions.map((region)=> (
        <button key={region} onClick={()=> dispatch(fetchCountriesRegion(region.toLowerCase()))} >
          {region}
        </button>
      ))}
      

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      {status === "success" && (
        <ul>
          {list.map((country) => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Countries;