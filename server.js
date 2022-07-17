const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', //samme som localhost
      port: '5432',
      user : 'postgres',
      password : 'test',
      database : 'smartbrain'
    }
  });



app.use(express.json());
app.use(cors()); //forteller browser at serveren din er trygg. hvis ikke man bruker dette får man error. 



app.get('/', (req, res) =>{
    res.send('success');
})

app.post('/signin', 
    signin.handleSignin(db, bcrypt) //kan også skrives slik.. 
)                                   //må da ta to funksjoner i signin.js

app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt )}) //HandleRegister tar imot req og res

app.get('/profile/:id', (req, res) => { 
    profile.handleProfileGet(req, res, db)
})

app.put('/image', (req, res) => {
    image.handleImage(req, res, db)
})

app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res)
})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})

/* Plan:

/--> res = this io working
/signin --> Post = success/fail .. Bruker post her fordi å sende en querystring
gjør det enklere for man in the middle attacks.
/register --> post = user
/profile/:userId --> Get = user
/image --> put --> user rank/count.

*/

/* bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
}); */