
export default function CountryCard({country}) {

  return(
    <div className="country-card" style={{
      backgroundImage: `url(${country.flags.svg})`,
      backgroundSize: 'cover',
    }}>
      <div className="country-data">
        <span>{country.name.common}</span>
        <img src={country.coatOfArms.svg} alt={country.flags.alt}
          style={{ width: "100%",
            height: "auto",
            maxHeight: "200px",
            objectFit: "contain",
          }}></img>

      </div>
      <div className="country-buttons">
        <button>⚔️Attack</button>
        <button>🏛️Negotiate</button>
      </div>
    </div>
  )
}