import * as L from 'leaflet';
import {Coordinates, PointOfInterest} from '../interfaces/Coordinates';

document.addEventListener('DOMContentLoaded', () => {
  function success(pos: GeolocationPosition) {
    const crd: Coordinates = pos.coords;
    console.log(crd);

    map.setView([crd.latitude, crd.longitude], 13);

    const ownLocation = addMarker(crd, 'Olen tässä!');
    ownLocation.openPopup();

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

  const options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function error(err: GeolocationPositionError) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);

  function addMarker(crd: Coordinates, text: string): L.Marker {
    return L.marker([crd.latitude, crd.longitude]).addTo(map).bindPopup(text);
  }
});
