const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const GitHubApi = require('github')

const github = new GitHubApi({

})

github.authenticate({
    type: "basic",
    username: process.env.GH_USER,
    password: process.env.GH_PASS
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('./'))

app.listen(8080);

app.post('/issue', function (req, res) {
  github.issues.create({
    owner: 'DGiannaris',
    repo: 'switch',
    title: req.body.title,
    body: req.body.body,
    labels: [req.body.type]
  })

  console.log('Posted a: ' + req.body.type)
})
