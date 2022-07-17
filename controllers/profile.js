const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})  //skal være id = id hvis ikke ES6, men kan skrive det slik siden property og value er den samme.
      .then(user => { //user aka response
        if (user.length) {
            res.json(user[0])
        } else {
            throw new Error('Could not find that user')
        }
      })
      .catch(err=> {
        res.status(404).json(err.message)
      })
}

module.exports = {
    handleProfileGet: handleProfileGet
}