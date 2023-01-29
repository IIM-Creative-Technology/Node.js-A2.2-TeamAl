import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err) {
            res.json({
                error: err
            })
        }
    })

    let user = new User ({
        name: req.body.name,
        mail: req.body.mail,
        password: hashedPass
    })
    user.save()
    .then(user => {
        res.json({
            message: 'User added successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'error'
        })
    })
}

const login = (req, res, next) => {
    let username = req.body.username
    let password = req.body.password

    User.findOne({email:username})
    .then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    })
                }

                if (result) {
                    res.json({
                        message: "Connexion réussie"
                    })
                } else {
                    res.json({
                        message: 'Mot de passe incorrect'
                    })
                }
            })
        } else {
            res.json({
                message:'Mail incorrect'
            })
        }
        
    })
}

const deletee = (req, res, next) => {
    User.findOne({email:username})
    .then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    })
                }

                if (result) {
                    User.findOneAndDelete({email:username})
                    .then(result => {
                        res.json({
                            message: 'Compte supprimé'
                        })
                    })
                } else {
                    res.json({
                        message: 'Mot de passe incorrect'
                    })
                }
            })
        } else {
            res.json({
                message:'Mail incorrect'
            })
        }
        
    })
}

module.exports = {
    register,
    deletee,
    login
}