export const updateState = (id, status) => {
    var opt = {
        headers: {
            "content-type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
            id,
            payload: {
                status
            }
        })
    };
    fetch('/task', opt)
        .then(results => results.json())
        .then(data => {
            console.log(data);
        });
}