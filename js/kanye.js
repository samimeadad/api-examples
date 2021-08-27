const loadQuotes = () => {
    fetch( 'https://api.kanye.rest/' )
        .then( res => res.json() )
        .then( data => displayQuote( data ) );
}

const displayQuote = ( quote ) => {
    const block = document.getElementById( 'quote' );
    // const p = document.createElement( 'p' );
    block.innerText = quote.quote;
    // block.appendChild( p );

}

document.getElementById( 'add-quote-button' ).addEventListener( 'click', function () {
    loadQuotes();
} );