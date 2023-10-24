const express = require('express');
const app = express();
const gsmarena = require('gsmarena-api');
const { get } = require('http');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    top = await gsmarena.top.get();
    topList = top[0].list.slice(0, 3);
    for (let i = 0; i < topList.length; i++) {
        getDevice = await gsmarena.catalog.getDevice(topList[i].id);
        topList[i].img = getDevice.img;
        topList[i].quickSpec = getDevice.quickSpec;
    }
    console.log(topList);
    res.render('index.ejs', { top: topList });
});

app.post('/search', (req, res) => {
    console.log(req.body);
    searched = req.body.search;
    if (searched === '') {
        return res.redirect('/');
    }
    res.redirect('/search/' + searched);
});

app.get('/search/:name', async (req, res) => {
    const name = req.params.name;
    const results = await gsmarena.search.search(name);
    res.render('search.ejs', { results: results, name: name });
    console.log(name);
})

app.get('/result/:id', async (req, res) => {
    const id = req.params.id;
    const result = await gsmarena.catalog.getDevice(id);
    res.render('result.ejs', { result: result });
    for(i = 0; i < result.detailSpec.length; i++) {
        console.log('\n', result.detailSpec[i].category);
        for(j = 0; j < result.detailSpec[i].specifications.length; j++) {
            console.log(result.detailSpec[i].specifications[j]);
        }
    }
    console.log(id);
})

app.post('/searchAutoComplete', async (req, res) => {
    console.log(req.body.search);
    const term = req.body.search;
    results = await gsmarena.search.search(term)
    return res.json(results)
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
