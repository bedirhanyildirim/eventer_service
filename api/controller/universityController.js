const University = require('../models/university');

const Response = require('../util/response')

exports.findAll = (req,res, next) => {
    University
    .find()
    .select('_id name detail contact logo rector website facebook twitter instagram youtube')
    .exec()
    .then(docs => {
        let response = new Response(docs, "All universities");
        res.status(200).json(response);
    })
    .catch(err => {
        let response = new Response(err, "Failure on querying universities");
        res.status(500).json(response);
    });
};

exports.find = (req,res,next) => {
    const id = req.params.universityId;
    
    University
    .findById(id)
    .select('_id name detail contact logo rector website facebook twitter instagram youtube')
    .exec()
    .then(doc => {
        let response = new Response(docs, "University found");
        res.status(200).json(response);
    })
    .catch(err => {
        let response = new Response(err, `University not found by id: ${id}`);
        res.status(500).json(response);
    });
}

exports.insert = (req, res, next) => {
    const uni = new University({
        name: req.body.name,
        detail: req.body.detail,
        contact: req.body.contact,
        logo: req.body.logo,
        rector: req.body.rector,
        website: req.body.website,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        youtube: req.body.youtube
    });

    uni
    .save()
    .then(result => {
        res.status(201).send("OK");
    })
    .catch(err => {
        let response = new Response(err, `Couldn't created`);
        res.status(500).json(response);
    });
}

exports.update = (req, res, next) => {
    const id = req.params.uniId;
    
    University.
    updateOne({_id: id}, {
      $set: req.body
    })
    .exec()
    .then(result => {
        res.status(201).send("OK");
    })
    .catch(err => {
        let response = new Response(err, `Couldn't update`);
        res.status(500).json(response);
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.uniId;
    
    University
    .deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).send('OK');
    })
    .catch(err => {
        let response = new Response(err, `Couldn't deleted`);
        res.status(500).json(response);
    });
};