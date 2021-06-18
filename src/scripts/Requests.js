import { getRequests, deleteRequest, saveCompletions } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", (click) => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

// mainContainer.addEventListener("change", (event) => {
//     if (event.target.id === "plumbers") {
//         const [requestId, plumberId] = event.target.value.split("--")
//         saveCompletions(requestId, plumberId)

//         const selectedPlumber = document.querySelector(
//             "option[value='']"
//         ).value
//         const
//         /*
//             This object should have 3 properties
//                 1. requestId
//                 2. plumberId
//                 3. date_created
//         */
//         const completion = {
//             requestId: selectedRequest,
//             plumberId: selectedPlumber,
//             dateCreated: selected,
//         }

//         /*
//             Invoke the function that performs the POST request
//             to the `completions` resource for your API. Send the
//             completion object as a parameter.
//         */
//     }
// })

export const Requests = () => {
    const requests = getRequests() // grab the local state of the requests data

    const newRequest = (request) => {
        return `<li>
        <select class="plumbers" id="plumbers">
            <option value="">Choose</option>
            <option value="maude">Buttons</option>
            <option value="merle">Merle</option>
        </select>
        ${request.description}
        <button class="request__delete" id="request--${request.id}">
            Delete
        </button>
        </li>`
    }

    let html = `
        <ul>
            ${requests.map(newRequest).join("")} 
        </ul>
    `

    return html
}
