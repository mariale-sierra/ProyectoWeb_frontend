import { getSeries } from "./backend.js"

window.onload = async () => {
  const series = await getSeries()
  render(series)
}

function render(series) {
  const tbody = document.getElementById("series-body")
  tbody.innerHTML = ""

  series.forEach(s => {

    const tr = document.createElement("tr")

    tr.innerHTML = `
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.current_episode}</td>
      <td>${s.total_episodes}</td>
      <td>+1</td>
      <td>${s.rating?.Int64 ?? "-"}</td>
    `

    tbody.appendChild(tr)
  })
}