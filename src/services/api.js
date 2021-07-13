function uri() {
  return process.env.NODE_ENV ? `http://20.204.67.210:8081/api`:
  `http://20.204.67.210:8081/api`;
}
const API = {
  async get_profile(userID) {
    const result = await fetch(`${uri()}/profile/${userID}`);
    const json = await result.json();
    return Array.isArray(json.result) ? json.result[0] : json.result;
  }
}
export default API