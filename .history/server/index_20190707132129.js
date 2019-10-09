
const express = require(`express`);
const app = express();
app.listen(5000);

app.use(static())

app.get(`/maze`, (req, res) => {
    res.send(`hello`); 
});
