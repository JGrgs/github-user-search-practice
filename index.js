const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const httpClient = axios.create()
const PORT = 3000


app.get('/users/:username', (req, res) => {
    const options = {
        method: 'get',
        url: `https://api.github.com/users/${req.params.username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    }

    httpClient(options).then((apiResponse) => {
        const html = `
        <h1>${apiResponse.data.name}</h1>
        <ul>
            <li>${apiResponse.data.location}</li>
            <li>${apiResponse.data.public_repos}</li>
            <li>${apiResponse.data.bio}</li>
            <img src = ${apiResponse.data.avatar_url}/>
        </ul>
        `
        res.send(html)
    })
    
})

app.get('/repos/:owner/:repo', (req, res) => {
    const options = {
        method: 'get',
        url:`https://api.github.com/repos/${req.params.owner}/${req.params.repo}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    }

    httpClient(options).then((apiResponse) => {
        res.send("hi")
    })
    
})

app.listen(PORT, (err) => {
    console.log(err || `Server running on port ${PORT}`)
})