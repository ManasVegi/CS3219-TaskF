const express = require('express')
const axios = require('axios');
const cors = require('cors');

const redis = require('redis');
const client = redis.createClient()

const DEFAULT_EXPIRATION = 60;


const PORT = 8887;
const app = express()
app.use(cors());

app.get('/nasa_images', async (req, res) => {
    const params = {
        q: 'q'
    }
    client.get("nasa_images", (err, nasa_images) => {
        if (err) {
            console.error(err)
        }

        if (nasa_images !== null) {
            console.log("Cache Hit");
            return res.send(JSON.parse(nasa_images));
        } else {
            console.log("Cache Miss");
            axios.get(
                "https://images-api.nasa.gov/search",
                { params }
            ).then((response) => {
                const data = response.data;
        
                client.setex("nasa_images", DEFAULT_EXPIRATION, JSON.stringify(data));
        
                res.send(data);
            });
        }
    });
})

app.listen(PORT, () => {
    console.log(`Express app listening at http://localhost:${PORT}`);
});

