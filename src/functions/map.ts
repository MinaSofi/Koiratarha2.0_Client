import * as L from 'leaflet';

document.addEventListener('DOMContentLoaded', () => {
  // Define the types for the location coordinates
  interface Coordinates {
    latitude: number;
    longitude: number;
  }

  // Define the types for the point of interest
  interface PointOfInterest {
    name_fi: string;
    latitude: number;
    longitude: number;
    street_address_fi: string;
    address_city_fi: string;
  }

  // Set the view for the map
  const map = L.map('map').setView([60.172659, 24.926596], 11);

  // Add the tile layer to the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Create a layer group for markers
  const layerGroup = L.layerGroup();

  // Define a variable to store the button choice
  let btnChoice: number | string;

  // Define the success function for geolocation
  function success(pos: GeolocationPosition) {
    const crd: Coordinates = pos.coords;
    console.log(crd);

    map.setView([crd.latitude, crd.longitude], 13);

    // Add a marker for the user's location
    const ownLocation = addMarker(crd, 'Olen tässä!');
    ownLocation.openPopup();

    // Function to fetch location data from the Helsinki city API
    function getLocations(crd: Coordinates): Promise<PointOfInterest[]> {
      const apiUrl =
        'https://www.hel.fi/palvelukarttaws/rest/v4/unit/?ontologyword=317+318+319+320+321+322+323';

      return fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
          }
          return response.json();
        })
        .then((pointsOfInterest) => {
          console.log(pointsOfInterest);
          return pointsOfInterest;
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          throw error;
        });
    }
  }

  // Define the options for geolocation
  const options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  // Define the error function for geolocation
  function error(err: GeolocationPositionError) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  // Get the user's geolocation
  navigator.geolocation.getCurrentPosition(success, error, options);

  // Function to add a marker to the map
  function addMarker(crd: Coordinates, text: string): L.Marker {
    return L.marker([crd.latitude, crd.longitude]).addTo(map).bindPopup(text);
  }
});
