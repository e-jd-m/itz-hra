const express = require(`express`);
const app = express();
app.listen(5000);

app.use(express.static(`../public`));

app.get(`/maze`, (req, res) => {
    

    res.send({
        resp: cells
    });
});