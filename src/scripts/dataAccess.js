const applicationState = {
    requests: [],
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then((response) => response.json())
        .then((serviceRequests) => {
            // Store the external state in application state
            applicationState.requests = serviceRequests
        })
}

export const getRequests = () => [...applicationState.requests]

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userServiceRequest),
    }
    // Add this...
    const mainContainer = document.querySelector("#container")

    return fetch(`${API}/requests`, fetchOptions)
        .then((response) => response.json())
        .then(() => {
            // do something after the POST is finished. Stay tuned for what to put here!
            // ...and this
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (id) => {
    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/requests/${id}`, { method: "DELETE" }).then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}
