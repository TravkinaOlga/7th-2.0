const model = require('./model');
const express = require('express');
const router = express.Router();

let user = model.user;

router.use((req, res, next) => {
    let password = req.query['password'];
    if (password == model.adminKey) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
});

router.get('/', (req, res) => {
    showMessageRoot(req, res);
});

router.get('/stats', (req, res) => {
    showMessageStats(req, res);
});

router.post('/comments', (req, res) => {
    showMessagePOST(req, res);
});

function showMessagePOST(req, res) {
    switch (req.url) {
        case '/comments':
            showMessageComments(req, res)
            break;
        default:
            error(req, res)
            break;
    }
}

// function showMessage(req, res) {
//     switch (req.url) {
//         case "/":
//             showMessageRoot(req, res)
//             break
//         case "/stats":
//             showMessageStats(req, res)
//             break
//         default:
//             showError(req, res)
//             break
//     }
// }

function showMessageRoot(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Hello ^-^');
}

function showMessageStats(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    user.user_agent++;
    res.end(`<table>
<tr><td>User-agent:</td>
<td>Request:</td></tr>
<tr><td>${req.headers['user-agent']}</td><td>${user.user_agent}</td></tr>
</table>`);
}

function showMessageComments(req, res) {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    })
    req.on("end", () => {
        res.end(body);
    })
}

// function showError(req, res) {
//     res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
//     res.end('400 Bad Request');
// }

module.exports = router;