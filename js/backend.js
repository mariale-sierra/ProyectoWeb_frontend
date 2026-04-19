const BASE_URL = "http://localhost:8080"

export async function getSeries() {
  const res = await fetch(`${BASE_URL}/series`)
  return res.json()
}