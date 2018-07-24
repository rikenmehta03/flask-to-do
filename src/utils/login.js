export const auth = ({ username, password } = data) => {
    opt = {
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            username,
            password
        })
    }
    return fetch('/auth', opt)
        .then(result => result.json())
        .then(data => {
            if (data.ok) {
                localStorage.setItem('todo-app-user', data.data);
                return data.data;
            }
        });
};