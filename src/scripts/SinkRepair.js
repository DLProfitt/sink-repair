import { getRequests } from "./dataAccess.js"
import { ServiceForm } from "./ServiceForm.js"
import { Requests } from "./Requests.js"


export const SinkRepair = () => {
    const requests = getRequests()
    if (requests.length >= 1) {
        return `
            <div class="formArea">
                <h2 id="repairForm">Schedule Your Repair</h2>
                <section class="serviceForm">
                    ${ServiceForm()}
                </section>
            </div>

            <section class="serviceRequests">
                ${Requests()}
            </section>
        `
    } else {
        return `
            <div class="formArea">
                <h2 id="repairForm">Schedule Your Repair</h2>
                <section class="serviceForm">
                    ${ServiceForm()}
                </section>
            </div>
        `
    }
}