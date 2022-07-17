const clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: '3fa4cc3fba364c65bf97b2219415db4f'
})

const handleApiCall = (req, res) => {
app.models.predict(
        Clarifai.FACE_DETECT_MODEL ,
        req.body.input//Hvis man skriver imageUrl istedenfor input her får man error.
      )
      .then(data => {
        res.json(data);
    })
      .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => { {/* Put her fordi vi oppdaterer */} // HUSK BREAKING ENTRIES!!!!!
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall //kan også være bare handleApiCall
                                 //siden property og value er den samme
}