function uri() {
  console.log(process.env);
  return process.env.NODE_ENV ? `http://${process.env.SERVER_URI}:${process.env.SERVER_PORT}/api`:
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