function uri() {
  console.log(process.env.ARG_NODE_ENV);
  return process.env.ARG_NODE_ENV === 'development' ? `http://${process.env.SERVER_URL}:${process.env.SERVER_PORT}/api`:
  `http://${process.env.SERVER_URI}:${process.env.SERVER_PORT}/api`;
}
const API = {
  async get_profile(userID) {
    const result = await fetch(`${uri()}/profile/${userID}`);
    const json = await result.json();
    return Array.isArray(json.result) ? json.result[0] : json.result;
  }
}
export default API