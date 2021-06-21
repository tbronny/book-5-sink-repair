const applicationState = {
    requests: [],
    completions: [],
    plumbers: [],
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

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then((response) => response.json())
        .then((serviceCompletions) => {
            // Store the external state in application state
            applicationState.completions = serviceCompletions
        })
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then((response) => response.json())
        .then((servicePlumbers) => {
            // Store the external state in application state
            applicationState.plumbers = servicePlumbers
        })
}

export const getRequests = () => [...applicationState.requests]
export const getCompletions = () => [...applicationState.completions]
export const getPlumbers = () => [...applicationState.plumbers]

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

export const sendCompletions = (serviceCompletions) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceCompletions),
    }
    // Add this...
    const mainContainer = document.querySelector("#container")

    return fetch(`${API}/completions`, fetchOptions)
        .then((response) => response.json())
        .then(() => {
            // do something after the POST is finished. Stay tuned for what to put here!
            // ...and this
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
