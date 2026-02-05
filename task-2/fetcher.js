/**
 * Fetch data from a given URL and handle success and error via callbacks.
 * @param {string} url The URL to fetch data from
 * @param {Function} onSuccess Called with data for successful fetch
 * @param {Function} onError Called with an Error object for fetch errors
 */
export function fetchData(url, onSuccess, onError) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (onSuccess) {
        console.log(data);
        onSuccess(data);
      }
    })
    .catch((error) => {
      if (onError) {
        console.log('Error fetching data:', error);
        onError(error);
      }
    });
}
