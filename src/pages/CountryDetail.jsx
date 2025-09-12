import {useParams} from 'react-router-dom';

const CountryDetail = () => {
    const {countryName} = useParams();

  return (
    <section>
        <h1>Country Name Page</h1>
        <p>Selecte country: {countryName}</p>
    </section>
  )
}

export default CountryDetail;