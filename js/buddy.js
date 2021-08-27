const loadBuddies = () => {
    fetch( 'https://randomuser.me/api/?results=5' )
        .then( res => res.json() )
        .then( data => displayBuddies( data ) );
}

const displayBuddies = data => {
    const buddies = data.results;
    const buddiesContainer = document.getElementById( 'buddies' );
    for ( const buddy of buddies ) {
        const p = document.createElement( 'p' );
        p.innerHTML = `
        <img src="${ buddy.picture.large }"></img><br>
        Name: ${ buddy.name.first } ${ buddy.name.last }<br>
        Email: ${ buddy.email }<br>
        Phone: ${ buddy.cell }<br>
        Location: ${ buddy.location.city }<br>
        <br><br>
        `
        p.classList.add( 'buddy' );
        buddiesContainer.appendChild( p );
        console.log( buddy );
    }

}
loadBuddies();