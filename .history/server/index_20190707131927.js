
const express = require(`express`);
const app = express();
app.listen(5000);

app.get(`/maze`, (req, res) => {
    res.send(`hello`); 
});
