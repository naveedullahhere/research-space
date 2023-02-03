import React from 'react'

const Subscription = () => {

    const handleSubscriptions = () => {
        console.log("Senddd!!!");
        postData(`https://eliteblue.net/research-space/api/webs/subscription`, { email: "emailD", password: "passwordD", _token: "pasdasdasswordD" })
            .then(data => {
                console.log(data)
            }).catch((err) => {
                console.log(err);
            })

    }


    async function postData(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    return (
        <>
            <div>Subscription</div>
            <button className="btn bg-danger text-white" onClick={handleSubscriptions}>Send</button>
        </>
    )
}

export default Subscription