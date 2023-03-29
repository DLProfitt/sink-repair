import { applicationState, fetchRequests, sendRequest } from "./dataAccess.js"

export const ServiceForm = () => {
    let html = `
        <div class="field">
            <label id="description" for="serviceDescription">Description</label>
            <input type="text" name="serviceDescription" class="input" id="descriptionValue"placeholder="Place your repair needs here"/>
        </div>
        <div class="field">
            <label class="label" for="serviceAddress">Address</label>
            <input type="text" name="serviceAddress" class="input" placeholder="city, state, zip"/>
        </div>
        <div class="field">
            <label class="label" for="serviceBudget">Budget</label>
            <input type="number" name="serviceBudget" class="input" placeholder="Budget dollar value goes here"/>
        </div>
        <div class="field">
            <label class="label" for="serviceDate">Date needed</label>
            <input type="date" name="serviceDate" class="input" />
        </div>
        <div id="button">
            <button type="submit" class="button" id="submitRequest">Submit Request</button>
        </div>
    `

    return html
}

document.addEventListener(
    'click',
    (event) => {
        if (event.target.id === "submitRequest") {
            fetchRequests()
            const requestId = (applicationState.requests.length + 1)
            const userDescription = document.querySelector("input[name='serviceDescription']").value
            const userAddress = document.querySelector("input[name='serviceAddress']").value
            const userBudget = document.querySelector("input[name='serviceBudget']").value
            const userDate = document.querySelector("input[name='serviceDate']").value

            let dataToSendToAPI = {
                id: [requestId],
                description: [userDescription],
                address: [userAddress],
                budget: [userBudget],
                neededBy: [userDate]
            }
            sendRequest(dataToSendToAPI)
        }
    }
)