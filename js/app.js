
let currentPage = 1
let currentSort = "id"
let currentOrder = "asc"
window.currentPage = currentPage

window.onload = () => {
  loadHome()
}

async function loadHome(page = 1) {
  currentPage = Math.max(1, page)
  window.currentPage = currentPage

  const sort = currentSort || "id"
  const order = currentOrder || "asc"

  const res = await fetch(
    `/series?page=${currentPage}&limit=5&sort=${sort}&order=${order}`
  )
  const data = await res.json()

  render(data)
}
window.loadHome = loadHome

function sortBy(field) {
  if (currentSort === field) {
    currentOrder = currentOrder === "asc" ? "desc" : "asc"
  } else {
    currentSort = field
    currentOrder = "asc"
  }

  loadHome(1)
}
window.sortBy = sortBy

function render(series) {
  const tbody = document.getElementById("series-body")
  tbody.innerHTML = ""

  series.forEach(s => {

    const tr = document.createElement("tr")

    const remaining = s.total_episodes - s.current_episode

    tr.innerHTML = `
      <td>
        <img src="${s.image || 'https://picsum.photos/50'}" width="40">
      </td>
      <td>${s.name}</td>
      <td>${s.current_episode} / ${s.total_episodes}</td>
      <td>${remaining} left</td>
      <td>
        <button onclick="nextEpisode(${s.id})">Next</button>
      </td>
      <td>
        <button onclick="deleteSeries(${s.id})">Delete</button>
      </td>
    `

    tbody.appendChild(tr)
  })
}


async function nextEpisode(id) {
  await fetch(`/update?id=${id}`, {
    method: "POST"
  })

  loadHome(currentPage)
}
window.nextEpisode = nextEpisode


async function rateSeries(id) {
  const input = document.getElementById(`rating-${id}`)
  const rating = Number(input.value)

  if (Number.isNaN(rating) || rating < 0 || rating > 10) {
    alert("Please enter a rating between 0 and 10")
    return
  }

  await fetch(`/series/${id}/rating`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      rating: rating
    })
  })
}
window.rateSeries = rateSeries


function showSection(sectionId) {
  document.querySelectorAll(".section")
    .forEach(sec => sec.classList.add("hidden"))

  document.getElementById(sectionId).classList.remove("hidden")

  if (sectionId === "ratings") {
    loadRatingControls()
  }
}
window.showSection = showSection


async function searchSeries() {
  const query = document.getElementById("search-input").value

  const res = await fetch(`/series?q=${query}`)
  const data = await res.json()

  const container = document.getElementById("search-results")
  container.innerHTML = ""

  data.forEach(s => {
    const div = document.createElement("div")

    div.classList.add("search-card")

    div.innerHTML = `
      <h3>${s.name}</h3>
      <p>${s.total_episodes} episodes</p>
      <button onclick="addSeries(${s.id})">
        Add Series
      </button>
    `

    container.appendChild(div)
  })
}
window.searchSeries = searchSeries


async function addSeries(id) {
  await fetch("/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: id
    })
  })

  showSection("home")
  loadHome(1)
}
window.addSeries = addSeries

async function loadRatingControls() {
  const res = await fetch("/ratings")
  const data = await res.json()

  const container = document.getElementById("ratings-controls")
  container.innerHTML = ""

  data.forEach(s => {
    const div = document.createElement("div")

    div.classList.add("rating-row")

    div.innerHTML = `
      <span class="series-name">${s.name}</span>

      <div class="rating-actions">
        <input 
          type="number" 
          min="0" 
          max="10" 
          id="rating-${s.id}" 
          value="${s.rating ?? ""}"
        >
        <button onclick="rateSeries(${s.id})">Save</button>
      </div>
    `

    container.appendChild(div)
  })
}
window.loadRatingControls = loadRatingControls

function showCreateForm() {
  document.getElementById("create-form").classList.toggle("hidden")
}
window.showCreateForm = showCreateForm

async function createSeries() {
  const name = document.getElementById("new-name").value
  const total = Number(document.getElementById("new-total").value)
  const image = document.getElementById("new-image").value

  if (!name || total < 1) {
    alert("Invalid input")
    return
  }

  await fetch("/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      total_episodes: total,
      image: image
    })
  })

  loadHome(1)
}
window.createSeries = createSeries

async function deleteSeries(id) {
  await fetch(`/series/${id}`, {
    method: "DELETE"
  })

  loadHome(currentPage)
}
window.deleteSeries = deleteSeries