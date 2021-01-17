export default {
    register: user => {
        return fetch('http://localhost:5000/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json()).then(data => data);
    }
}