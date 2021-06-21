import {
    getRequests,
    getPlumbers,
    deleteRequest,
    sendCompletions,
} from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", (click) => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener("change", (event) => {
    if (event.target.id === "plumbers") {
        const [requestString, plumberString] = event.target.value.split("--")
        const request = parseInt(requestString)
        const plumber = parseInt(plumberString)
        /*
            This object should have 3 properties
                1. requestId
                2. plumberId
                3. date_created
        */
        const completion = {
            requestId: request,
            plumberId: plumber,
            dateCreated: Date.now(),
        }

        sendCompletions(completion)

        /*
            Invoke the function that performs the POST request
            to the `completions` resource for your API. Send the
            completion object as a parameter.
        */
    }
})

export const Requests = () => {
    const requests = getRequests() // grab the local state of the requests data
    const plumbers = getPlumbers()

    const newRequest = (request) => {
        return `<li>
        ${request.description}
        <select class="plumbers" id="plumbers">
            <option value="">Choose</option>
            ${plumbers
                .map((plumber) => {
                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                })
                .join("")}
        </select>
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
