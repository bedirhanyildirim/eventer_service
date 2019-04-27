const University = require('../models/university');
const Department = require('../models/department');
const Response = require('../util/response')

exports.findAll = (req,res, next) => {
    const uniId = req.params.uniId;

    University
    .findById(uniId)
    .select('name')
    .exec()
    .then( uni => {
        Department
        .find()
        .select('_id universityId name detail headOfDepartment website')
        .exec()
        .then(departments => {
            let response = new Response(departments, `All departments of university ${uni.name}`);
            res.status(200).json(response);
        })
        .catch(err => {
            let response = new Response(err.toString(), `Department not found`);
            res.status(500).json(response);
        });
    })
    .catch( err => {
        let response = new Response(err.toString(), `University not found by id: ${uniId}`);
        res.status(500).json(response);
    })
};

exports.find = (req,res,next) => {
    const uniId = req.params.uniId;

    University
    .findById(uniId)
    .select('name')
    .exec()
    .then( uni => {
        const departmentId = req.params.departmentId;

        Department
        .findById(departmentId)
        .select('_id universityId name detail headOfDepartment website')
        .exec()
        .then(department => {
            let response = new Response(department, `Department ${department.name} found`);
            res.status(200).json(response);
        })
        .catch(err => {
            let response = new Response(err.toString(), `Failure on querying departments of university ${uni.name}`);
            res.status(500).json(response);
        });
    })
    .catch( err => {
        let response = new Response(err.toString(), `University not found by id: ${uniId}`);
        res.status(500).json(response);
    });
}

exports.insert = (req, res, next) => {
    const uniId = req.params.uniId;

    University
    .findById(uniId)
    .select('name')
    .exec()
    .then( uni => {
        const department = new Department({
            universityId: uniId,
            name: req.body.name,
            detail: req.body.detail,
            headOfDepartment: req.body.headOfDepartment,
            website: req.body.website,
        });

        department
        .save()
        .then(result => {
            res.status(201).send("OK");
        })
        .catch(err => {
            let response = new Response(err.toString(), `Department ${department.name} could not be created`);
            res.status(500).json(response);
        });
    })
    .catch( err => {
        let response = new Response(err.toString(), `University not found by id: ${uniId}`);
        res.status(500).json(response);
    });
}

exports.update = (req, res, next) => {
    const uniId = req.params.uniId;

    University
    .findById(uniId)
    .select('name')
    .exec()
    .then( uni => {
        const departmentId = req.params.departmentId;

        Department
        .updateOne({_id: departmentId}, {
          $set: req.body
        })
        .exec()
        .then(result => {
            res.status(201).send("OK");
        })
        .catch(err => {
            let response = new Response(err.toString(), `Deparment ${name} could not be updated`);
            res.status(500).json(response);
        });

    })
    .catch( err => {
        let response = new Response(err.toString(), `University not found by id: ${uniId}`);
        res.status(500).json(response);
    });
}

exports.delete = (req, res, next) => {
    const uniId = req.params.uniId;

    University
    .findById(uniId)
    .select('name')
    .exec()
    .then( uni => {
        const departmentId = req.params.departmentId;

        Department
        .deleteOne({_id: departmentId})
        .exec()
        .then(result => {
            res.status(200).send('OK');
        })
        .catch(err => {
            let response = new Response(err.toString(), `Department ${id} could not be deleted`);
            res.status(500).json(response);
        });

    })
    .catch( err => {
        let response = new Response(err.toString(), `University not found by id: ${uniId}`);
        res.status(500).json(response);
    });
};