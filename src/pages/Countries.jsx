import { useDispatch, useSelector } from "react-redux";
import { fetchCountriesRegion } from "../redux/countriesSlice";

const Countries = () => {
  const dispatch = useDispatch();
  const {list, status, error} = useSelector((state)=> state.countries);

  return (
    <div>
      <h2>Countries Page</h2>

      <button onClick={()=> dispatch(fetchCountriesRegion("europe"))}>
        Load Europe
      </button>

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