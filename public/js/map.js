
	// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
    
	mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center:listing.geometrys.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 12// starting zoom
    });

console.log(listing.geometrys.coordinates)
const marker = new mapboxgl.Marker({color:"red"})
        .setLngLat(listing.geometrys.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<H4>${listing.location}</H4><P> Exact location provided after booking </P>`))
    .addTo(map);

