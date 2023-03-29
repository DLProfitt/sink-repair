import { getRequests, getPlumbers, deleteRequest, sendCompletion } from "./dataAccess.js"

const toLi = (objectOrArray) => {
  const plumbers = getPlumbers()
  let listItems = []
  let idValue = (objectOrArray.id)
  let newId = `<div class="serviceRequestList"><li>Order ID: ${idValue}</li>`
  listItems.push(newId)
  for (let indexValue of objectOrArray.description) {
    let value = `Description: ${indexValue}<br>`
    listItems.push(value)
  }
  for (let indexValue of objectOrArray.address) {
    let value = `Address: ${indexValue}<br>`
    listItems.push(value)
  }
  for (let indexValue of objectOrArray.budget) {
    let value = `Budget: $${indexValue}<br>`
    listItems.push(value)
  }
  for (let indexValue of objectOrArray.neededBy) {
    let value = `Repair Date: ${indexValue}</div>`
    listItems.push(value)
  }
  let dropdown = 
    `<select class="plumbers" id="plumbers">
      <option value="Choose">Choose Plumber</option>
      ${
          plumbers.map(
              plumber => {
                  return `<option value="${objectOrArray.id}--${plumber.id}" class="plumbers" id="options">${plumber.name}</option>`
              }
          ).join("")
      }
    </select>`
  listItems.push(dropdown)
  listItems.push(`<div class="deleteButton">
  <button class="request__delete"
          id="request--${objectOrArray.id}">
      Delete
  </button></div>`)
  return listItems.join('')
}

export const Requests = () => {
    const requests = getRequests()

    if (requests.length >= 1) {
      let html = `
          <h2>Service Requests</h2>
          <ul>
              ${
                  requests.map(toLi).join("")
                }
          </ul>
      `
      return html
    } else {
      return ""
    }
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
  "change",
  (event) => {
      if (event.target.id === "plumbers") {
          const [requestId, plumberId] = event.target.value.split("--")
          const completion = { 
            requestId: requestId,
            plumberId: plumberId,
            dateCreated: new Date()
          }
          sendCompletion(completion)
      }
  }
)