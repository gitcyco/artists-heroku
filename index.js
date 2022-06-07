const express = require('express');
const app = express();

let data = [
    { 
        "id": 1,
        "name": "Black Sabbath", 
        "song": "Paranoid"
    },
    { 
        "id": 2,
        "name": "Tool", 
        "song": "Sober"
    },
    { 
        "id": 3,
        "name": "Butthole Surfers", 
        "song": "Sweet Loaf"
    },
    { 
        "id": 4,
        "name": "Slayer", 
        "song": "Reign In Blood"
    },
    { 
        "id": 4,
        "name": "Slayer", 
        "song": "Reign In Blood"
    },
    { 
        "id": 5,
        "name": "Iron Maiden", 
        "song": "Aces High"
    },
]


app.use(express.json());

app.get('/', (request, response) => {
    response.end('Nothing to see here!');
})

app.get('/api/artist', (request, response) => {
    response.json(data);
})

app.get('/api/artist/:id', (request, response) => {
    const id = +request.params.id;
    const artist = data.find(p => p.id === id);
    if(artist) {
        response.json(artist);
    } else {
        response.status(404).end();
    }
})

app.get('/info', (request, response) => {
    let date = new Date();
    let output = `<h3>Database has info for ${data.length} arists.</h3>
    <h1>${date.toLocaleString()}</h1>`;
    // response.send('<h1>Hello Dude!</h1>');
    response.send(output);
    response.end();
})

app.delete('/api/artist/:id', (request, response) => {
    const id = +request.params.id;
    data = data.filter(p=>p.id !== id);
    response.status(204).end();
})

app.post('/api/artist', (request, response) => { 
    const body = request.body;

    if(!body.name || !body.song) {
        return response.status(400).json({
            error: 'name or song missing'
        })
    }
    
    if(data.find(p => p.song === body.song)) {
        return response.status(400).json({
            error: 'song exists'
        })
    }

    const artist = {
        id: getID(),
        name: body.name,
        number: body.number,
    }

    data = data.concat(artist);
    console.log(data);
    response.json(data);
})



const PORT = 3001;
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${process.env.PORT || PORT}`);
});


// Utility functions

function getID() {
    let id = Math.floor(Math.random() * 20000);
    while (id === data.find(p => p.id === id)) {
        id = Math.floor(Math.random() * 20000);
    }
    console.log("ID: ", id);
    return id;
}