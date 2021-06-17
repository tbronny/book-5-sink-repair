import { getRequests, deleteRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", (click) => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

export const Requests = () => {
    const requests = getRequests() // grab the local state of the requests data

    const newRequest = (request) => {
        return `<li>  
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
        ${request.description}
        </li>`
    }

    let html = `
        <ul>
            ${requests.map(newRequest).join("")} 
        </ul>
    `

    return html
}
