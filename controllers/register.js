const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body //destructure 
    if (!email || !name || !password) {
        return res.status(400).json('Fill in your personalia')
    }
    const hash = bcrypt.hashSync(password);
        db.transaction(trx => { //transaction: når man må gjøre emer enn to ting på en gang
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                email: loginEmail[0].email,  //ha med [0], hvis ikke havner email i brackets i db..
                name: name,
                joined: new Date()
            })
                .then(user=> {
                res.json(user[0]); 
            })
          })
          .then(trx.commit)
          .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister: handleRegister
}