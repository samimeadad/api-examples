const loadCountries = () => {
    fetch( 'https://restcountries.eu/rest/v2/all' )
        .then( response => response.json() )
        .then( data => displayCountries( data ) );
}
loadCountries();


const displayCountries = countries => {
    const countrySeciton = document.getElementById( 'countries-cotainer' );
    countries.forEach( country => {
        const div = document.createElement( 'div' );
        div.classList.add( 'country' );
        div.innerHTML = `
        <h3>Name: ${ country.name }<br><br>
        <p>Capital:<br> ${ country.capital }</p>
        <button onclick="loadCountryByName('${ country.name }')" class="btn btn-primary">Details</button>
        `;
        countrySeciton.appendChild( div );
        console.log( country );
    } );
}

const loadCountryByName = countryName => {
    const url = `https://restcountries.eu/rest/v2/name/${ countryName };`
    fetch( url )
        .then( res => res.json() )
        .then( data => displayCountryDetail( data[ 0 ] ) );
}

const displayCountryDetail = country => {
    const detailSection = document.getElementById( 'information' );
    const detailBox = document.createElement( 'div' );
    detailBox.innerHTML = `
        <h5>Name: ${ country.name }</h5>
        <h5>Region: ${ country.region }</h5>
        <h5>Currency: ${ country.currencies[ 0 ].name }</h5>
    `;
    detailSection.innerText = "";
    detailSection.appendChild( detailBox );
    // console.log( country );

}