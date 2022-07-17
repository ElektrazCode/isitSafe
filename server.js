const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const connectionString ='mongodb+srv://moi:tusaisquoi@cluster0.nphvezo.mongodb.net/?retryWrites=true&w=majority'
const app = express();


MongoClient.connect(connectionString, {useUnifiedtopology: true})
    .then(client => {
        console.log('Connected to Database');
        const db = client.db('IsItSafeDB');
        const allergiesCollection = db.collection('allergies');
        const safeFoodCollection = db.collection('safeFood');
        
        app.set('view engine', 'ejs');

        app.use(bodyParser.urlencoded({extended:true}));
        app.use(express.static('public'));

        app.get('/', (req, res) => {
            db.collection('allergies').find().toArray()
                .then(results => {
                    res.render('index.ejs', {allergies: results});
                })
                .catch(error => console.error(error))
        });
        app.post('/allergies', (req, res) => {
            allergiesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/');
                })
                .catch(error => console.error(error))
        });
        // app.post('/safeFood', (req, res) => {
        //     console.log(req.body);
        // });

        app.listen(3000,() => console.log('listening to 3000'));

    })
    .catch(error => console.error(error));

