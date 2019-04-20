const proxyUrl = "https://cors-anywhere.herokuapp.com/";

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

function handleError(error) {
  console.error(`API call failed: ${error}`);
  throw error;
}

export default function request(apiUrl, data) {
  const url = `${proxyUrl}${apiUrl}`;
  return fetch(url, data)
    .then(handleResponse)
    .catch(handleError);
}
