const inquirer = require("inquirer")
const axios = require("axios")
const request = require("request")
const fs = require("fs")
const token ="FLCRGLYUT0bohJIhy0k7gkJ3YUMNphZyUF1EPJP9Xm6swhgv	"
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "userName",
            message: "What is your user name?"
        },
        {
            type: "input",
            name: "favoriteColor",
            message: "What is Lyour favorite Color?"
        }
    ])
}
function htmlTemplate(resp, favoriteColor) {
    return `<!doctype html>
<html>
<head>
<title>
testing
</title>
<meta charset="utf-8">
</head>
<body style="background-color:${favoriteColor}">
<div>
<img src="${resp.data.avatar_url}" alt="user picture" ></img>
<h2>User Name:${resp.data.login}</h2>
<ul>
<li><a href="https://github.com/${resp.data.login}">${resp.data.login}</a></li>
<li><a href="https://github.com/${resp.data.blog}">Blog</a></li>
<li><a href="https://github.com/${resp.data.location}">${resp.data.location}</a></li>
</ul>
<h2>Bio</h2>
<p>${resp.data.bio}</p>
<h2>Public Repositories</h2>
<p>${resp.data.public_repos}</p>
<h2>Followers</h2>
<p>${resp.data.followers}</p>
<h2>Following</h2>
<p>${resp.data.following}</p>
<h2>>Git Hub Stars</h2>
<p>${resp.data.public_gists}</p>
</div>
</body>
</html>
`
}
promptUser().then(({ userName, favoriteColor }) => {
    const queryUrl = `https://api.github.com/users/${userName}`
    axios.get(queryUrl).then((resp) => {
        console.log(resp)
        fs.writeFile("hello.html", htmlTemplate(resp, favoriteColor), (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("success")
            }
        })
    })
})

