function uri() {
  return process.env.NODE_ENV ? 'http://localhost:8081/api':
  'https://localhost:8081/api';
}
const API = {
  async get_profile(userID) {
    const result = await fetch(`${uri()}/profile/${userID}`);
    const json = await result.json();
    return Array.isArray(json.result) ? json.result[0] : json.result;
  }
}
export default API