const searchButton = document.getElementById( "button-search" );
const inputField = document.getElementById( "search-field" );

inputField.addEventListener( "keyup", function ( event ) {
    event.preventDefault();
    if ( event.key === 'Enter' )
        searchButton.click();
} );

document.getElementById( 'api-error' ).style.display = 'none';

const displayApiError = () => {
    clearResult();
    document.getElementById( 'api-error' ).style.display = 'block';
}

const loadMealDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ mealId }`;
    fetch( url )
        .then( res => res.json() )
        .then( data => displayMealDetail( data.meals[ 0 ] ) );

}

const displayMealDetail = meal => {
    const mealDetails = document.getElementById( 'meal-details' );
    mealDetails.textContent = '';
    const div = document.createElement( 'div' );
    div.classList.add( 'card' );
    div.innerHTML = `
        <img src="${ meal.strMealThumb }" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h5 class="card-title">${ meal.strMeal }</h5>
            <p class="card-text">${ meal.strInstructions.slice( 0, 150 ) }</p >
        <a href="${ meal.strYoutube }" class="btn btn-primary">Go somewhere</a>
        </div >
    `;
    mealDetails.appendChild( div );
}

const clearResult = () => {
    document.getElementById( 'api-error' ).style.display = 'none';
    const searchResult = document.getElementById( 'search-result' );
    searchResult.textContent = '';
    const errorMessageDiv = document.getElementById( 'error-message' );
    errorMessageDiv.textContent = '';
}

const displayError = ( error ) => {
    const errorMessageDiv = document.getElementById( 'error-message' );
    clearResult();
    const h2 = document.createElement( 'h2' );
    h2.innerText = error;
    errorMessageDiv.appendChild( h2 );
}

const displaySearchResult = ( meals ) => {
    const searchResult = document.getElementById( 'search-result' );
    clearResult();
    if ( meals == null ) {
        displayError( 'NO DISH TO DISPLAY!!!' );
    }
    else {
        meals.forEach( meal => {
            // console.log( meal );
            const colDiv = document.createElement( 'div' );
            colDiv.classList.add( 'col' );
            colDiv.innerHTML = `
        <div onclick="loadMealDetail(${ meal.idMeal })" class="card h-100">
            <img src="${ meal.strMealThumb }" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title">${ meal.strMeal }</h5>
                <p class="card-text">${ meal.strInstructions.slice( 0, 200 ) }</p>
            </div>
        </div>
        `;
            searchResult.appendChild( colDiv );
        } );
    }
}

const loadData = url => {
    fetch( url )
        .then( res => res.json() )
        .then( data => displaySearchResult( data.meals ) )
        .catch( error => displayApiError( error ) );
}

const searchFood = () => {
    const searchField = document.getElementById( 'search-field' );
    const searchText = searchField.value;
    searchField.value = "";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${ searchText }`;
    if ( searchText == '' ) {
        displayError( 'NO EMPTY SEARCH!!!' );
    }
    else {
        loadData( url );
    }
}

document.getElementById( 'button-search' ).addEventListener( 'click', function () {
    searchFood();
} );