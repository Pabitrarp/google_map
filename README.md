# google_map
Key Features:
Fetch Current Location:

Utilizes the Geolocation API to fetch the user's current latitude and longitude.
Sets a custom map marker icon for the current location.
Get Address from Coordinates:

Uses Axios to make a request to the Nominatim API to retrieve the address based on the current latitude and longitude.
Calculate Distance:

Uses the haversine library to calculate the distance between the current location and a user-defined destination.
Displays the distance in kilometers.
Get Coordinates from Address:

Uses Axios to make a request to the Nominatim API to retrieve the latitude and longitude of a user-defined destination address.
Detailed Breakdown:
State Management:

position: Stores the current latitude and longitude of the user.
icon: Stores the custom icon for the map marker.
address: Stores the current address based on the user's location.
destiaddress: Stores the destination address input by the user.
destination: Stores the latitude and longitude of the destination address.
distance: Stores the calculated distance between the current position and the destination.
Functions:

fetchLocation: Uses the Geolocation API to get the user's current position and sets a custom marker icon.
getAddress: Uses Axios to fetch the address corresponding to the current position from the Nominatim API.
calculateDistance: Uses the haversine library to calculate the distance between the current position and the destination.
getCoordinatesFromAddress: Uses Axios to fetch coordinates for the destination address from the Nominatim API.
UI Elements:

Buttons to trigger fetching the location, getting the current address, and calculating the distance.
An input field for the user to enter the destination address.
Displays the current address and calculated distance.
Example Usage:
Click the "Get Current Location" button to fetch and display the user's current location.
Click the "Get Current Address" button to fetch and display the address of the current location.
Enter a destination address in the input field and click the "Get Shortest Route" button to fetch and display the coordinates of the destination.
Click the "Get Distance" button to calculate and display the distance between the current location and the destination.
Dependencies:
React
Axios
Haversine
