const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n3x89.mongodb.net/burjAlArab?retryWrites=true&w=majority`;

const port = 5000

const app = express()

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("burjAlArab").collection("bookings");

  app.post('/addBooking', (req,res) => {
      const newBooking = req.body;
      collection.insertOne(newBooking)
      .then(result => {
        res.send(result.insertedCount > 0);
      })
  })

  app.get('/bookings', (req,res) => {
      //console.log(req.query.email);
      collection.find({email: req.query.email})
      .toArray((err, documents) => {
          res.send(documents);
      })
  })

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)