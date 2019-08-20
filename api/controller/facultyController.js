const University = require('../models/university');
const Faculty = require('../models/faculty');
const Department = require('../models/department');
const Response = require('../util/response');

exports.findAll = (req,res, next) => {

    Faculty
    .find()
    .select('_id universityId facLookUpCode name detail dean website')
    .exec()
    .then(faculties => {
        let response = new Response(faculties, "All faculties");
        res.status(200).json(response);
    })
    .catch(err => {
        let response = new Response(err, `Faculty not found`);
        res.status(500).json(response);
    });
};

exports.find = (req,res,next) => {
    const facultyId = req.params.facultyId;

    Faculty
    .findById(facultyId)
    .select('_id universityId facLookUpCode name detail dean website')
    .exec()
    .then(faculty => {
        let response = new Response(faculty, "Faculty found");
        res.status(200).json(response);
    })
    .catch(err => {
        let response = new Response(err, `Failure on querying faculties of university`);
        res.status(500).json(response);
    });
};

exports.findDepartments = (req,res,next) => {
    console.log("you are here!")
    const facultyId = req.params.facultyId;

    Faculty
    .findById(facultyId)
    .select('name')
    .exec()
    .then( fac => {

        Department
        .find({'facultyId' : facultyId})
        .select('_id universityId facultyId depLookUpCode name detail headOfDepartment website')
        .exec()
        .then(department => {
            let response = new Response(department, "All departments of faculty");
            res.status(200).json(response);
        })
        .catch(err => {
            let response = new Response(err.toString(), `Failure on querying departments of faculty ${fac.name}`);
            res.status(500).json(response);
        });
    })
    .catch( err => {
        let response = new Response(err.toString(), `Faculty not found by id: ${facultyId}`);
        res.status(500).json(response);
    });
};

exports.insert = (req, res, next) => {
    const universityId = req.body.universityId;

    University
    .findById(universityId)
    .select('name')
    .exec()
    .then( uni => {
        const faculty = new Faculty({
            universityId: universityId,
            facLookUpCode: req.body.facLookUpCode,
            name: req.body.name,
            detail: req.body.detail,
            dean: req.body.dean,
            website: req.body.website,
        });
    
        faculty
        .save()
        .then(result => {
            res.status(201).send("OK");
        })
        .catch(err => {
            let response = new Response(err.toString(), `Faculty ${faculty.name} could not be created`);
            res.status(500).json(response);
        });
    })
    .catch( err => {
        let response = new Response(err.toString(), `University not found by id: ${uniId}`);
        res.status(500).json(response);
    });
}

exports.update = (req, res, next) => {
    const facultyId = req.params.facultyId;

    Faculty.
    updateOne({_id: facultyId}, {
        $set: req.body
    })
    .exec()
    .then(result => {
        res.status(201).send("OK");
    })
    .catch(err => {
        let response = new Response(err, `Faculty ${name} could not be updated`);
        res.status(500).json(response);
    });
}

exports.delete = (req, res, next) => {
    const facultyId = req.params.facultyId;

    Faculty
    .deleteOne({_id: facultyId})
    .exec()
    .then(result => {
        res.status(200).send('OK');
    })
    .catch(err => {
        let response = new Response(err, `Faculty ${id} could not be deleted`);
        res.status(500).json(response);
    });
};