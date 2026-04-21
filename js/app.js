import { getSeries } from "./backend.js"

window.onload = () => {
  loadHome()
}


async function loadHome() {
  const res = await fetch("http://localhost:8080/series")
  const data = await res.json()

  render(data)
}
function render(series) {
  const tbody = document.getElementById("series-body")
  tbody.innerHTML = ""

  series.forEach(s => {

    const tr = document.createElement("tr")

    const remaining = s.total_episodes - s.current_episode

    tr.innerHTML = `
      <td>${s.name}</td>
      <td>${s.current_episode} / ${s.total_episodes}</td>
      <td>${remaining} left</td>
      <td>
        <button onclick="nextEpisode(${s.id})">Next</button>
      </td>
    `

    tbody.appendChild(tr)
  })
}


async function nextEpisode(id) {
  await fetch(`http://localhost:8080/update?id=${id}`, {
    method: "POST"
  })

  loadHome()
}
window.nextEpisode = nextEpisode


function showSection(sectionId) {
  document.querySelectorAll(".section")
    .forEach(sec => sec.classList.add("hidden"))

  document.getElementById(sectionId).classList.remove("hidden")

  if (sectionId === "ratings") {
    loadRatings()
  }
}
window.showSection = showSection


async function searchSeries() {
  const query = document.getElementById("search-input").value

  const res = await fetch(`http://localhost:8080/series?q=${query}`)
  const data = await res.json()

  const container = document.getElementById("search-results")
  container.innerHTML = ""

  data.forEach(s => {
    const div = document.createElement("div")

    div.classList.add("search-card")

    div.innerHTML = `
      <h3>${s.name}</h3>
      <p>${s.total_episodes} episodes</p>
      <button onclick="addSeries('${s.name}', ${s.total_episodes})">
        Add Series
      </button>
    `

    container.appendChild(div)
  })
}
window.searchSeries = searchSeries


async function addSeries(name, total) {
  await fetch("http://localhost:8080/series", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      current_episode: 1,
      total_episodes: total
    })
  })

  // volver a home y recargar
  showSection("home")
  loadHome()
}
window.addSeries = addSeries


async function loadRatings() {
  const res = await fetch("http://localhost:8080/ratings")
  const data = await res.json()

  const container = document.getElementById("ratings-list")
  container.innerHTML = ""

  data.forEach(r => {
    const div = document.createElement("div")

    div.classList.add("rating-row")

    div.innerHTML = `
      <span>${r.name}</span>
      <span class="rating">${r.rating}</span>
    `

    container.appendChild(div)
  })
}