const BASE_URL = ""

export async function getSeries() {
  const res = await fetch(`${BASE_URL}/series`)
  return res.json()
}