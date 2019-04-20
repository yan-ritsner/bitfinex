const proxyUrl = "https://cors-anywhere.herokuapp.com/";

/**
 * Response handler
 * @param {object} response
 */
async function handleResponse(response) {
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("API response was not ok.");
}

/**
 * error handler
 * @param {string} error - error
 */
function handleError(error) {
  console.error(`API call failed: ${error}`);
  throw error;
}

/**
 * Web Api call helper
 * @param {string} apiUrl - url
 * @param {object} data - parameter
 */
export default function request(apiUrl, data) {
  const url = `${proxyUrl}${apiUrl}`;
  return fetch(url, data)
    .then(handleResponse)
    .catch(handleError);
}
