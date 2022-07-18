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
            let results1, results2; 
            db.collection('allergies').find().toArray()
                .then(results => {
                    results1 = results;
                })
            db.collection('safeFood').find().toArray()
                .then(results => {
                    results2 = results;
                    res.render('index.ejs', {allergies: results1, safeFood: results2});   
                })          
                .catch(error => console.error(error))     
        });
        
        app.post('/allergies', (req, res) => {
            console.log(req.body);
            allergiesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/');
                })
                .catch(error => console.error(error))
        });
        app.post('/safeFood', (req, res) => {
            console.log(req.body);
            safeFoodCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/');
                })
                .catch(error => console.error(error))
        });
        app.put('/allergies', (req, res) => {
            allergiesCollection.findOneAndUpdate(
                {
                    allergy: req.body.allergy
                },
                {
                    $set: {
                        allergy: req.body.value
                    }
                }
            )
                .then(result => {
                    console.log(result);
                    res.redirect('/');
                })
                .catch(error => console.error(error))
        });
        app.listen(3000,() => console.log('listening to 3000'));

    })
    .catch(error => console.error(error));

