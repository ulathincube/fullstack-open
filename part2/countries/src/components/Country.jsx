function Country({
  languages,
  flags,
  countryName,
  capital,
  area,
  temperature,
  weatherIcon,
  windSpeed,
  weatherDescription,
}) {
  const languagesData = Object.entries(languages).map(([key, value]) => (
    <li key={key}>{value}</li>
  ));

  const { png: flagPng, alt: flagAlt } = flags;

  const [capitalCity] = capital;
  return (
    <li>
      <h2>{countryName}</h2>
      <dl>
        <div className='row'>
          <dt style={{ fontWeight: 500 }}>Capital</dt>
          <dd>{capitalCity}</dd>
        </div>
        <div className='row'>
          <dt style={{ fontWeight: 500 }}>Area</dt>
          <dd>{area}</dd>
        </div>
      </dl>
      <h3>Languages</h3>
      <ul>{languagesData}</ul>
      <img src={flagPng} alt={flagAlt} />
      <h3>Weather in {capitalCity}</h3>
      <dl style={{ display: 'grid', gap: 10 }}>
        <div className='row'>
          <dt style={{ fontWeight: 500 }}>Temperature</dt>
          <dd>{temperature} Celsius</dd>
        </div>

        <div>
          <dt>
            <img
              src={weatherIcon}
              alt={`Icon showing ${weatherDescription} weather`}
            />
          </dt>
        </div>

        <div className='row'>
          <dt style={{ fontWeight: 500 }}>Wind</dt>
          <dd>{windSpeed} m/s</dd>
        </div>
      </dl>
    </li>
  );
}

export default Country;
