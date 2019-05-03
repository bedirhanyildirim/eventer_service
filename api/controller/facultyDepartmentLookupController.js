const FacultyDepartmentLookup = require('../models/facultyDepartmentLookup');
const Faculty = require('../models/faculty');
const Department = require('../models/department');

const ObjectId = require('mongoose').Types.ObjectId;

const Response = require('../util/response')

exports.find = (req, res, next) => {
    const id = req.body.universityNumber;
    const universityId = req.params.uniId;

    function parse(id) {
        return {
            year: id.substring(0,2),
            faculty_identifier: id.substring(2,4),
            department_identifier: id.substring(4,6),
            no: id.substring(6,10)
        };
    };

    let parsed_id = parse(id);

    FacultyDepartmentLookup
    .findOne( {'kind': "faculty", "code": parsed_id.faculty_identifier})
    .exec()
    .then( lookupFaculty => {

        FacultyDepartmentLookup
        .findOne( {'kind': "department", "code": parsed_id.department_identifier})
        .exec()
        .then( lookupDepartment => {

            Faculty
            .find( { '_id': new ObjectId(lookupFaculty.lookup_id), 'universityId': universityId })
            .select('_id universityId name detail dean website')
            .exec()
            .then(faculty => {

                Department
                .find( { '_id': new ObjectId(lookupDepartment.lookup_id), 'universityId': universityId })
                .select('_id universityId name detail headOfDepartment website')
                .exec()
                .then(department => {
                    let response = new Response( {'department' : department, "faculty": faculty}, `OK`);
                    res.status(200).json(response);
                })
                .catch(err => {
                    let response = new Response(err.toString(), `Failure on querying department ${lookupDepartment.lookup_id}`);
                    res.status(500).json(response);
                });

            })
            .catch(err => {
                let response = new Response(err.toString(), `Failure on querying lookup department ${lookupDepartment.lookup_id}`);
                res.status(500).json(response);
            });

        })
        .catch(err => {
            let response = new Response(err.toString(), `Failure on querying lookup facuty ${lookupFaculty.lookup_id}`);
            res.status(500).json(response);
        });

    }).catch(err => {
        let response = new Response(err.toString(), `Failure on querying faculty ${lookupFaculty.lookup_id}`);
        res.status(500).json(response);
    });

};

exports.insert = (req, res, next) => {
    const uniId = req.params.uniId;


    const lookup = new FacultyDepartmentLookup({
        universityId: uniId,
        kind: req.body.kind,
        code: req.body.code,
        lookup_id: req.body.lookup_id
    });

    lookup
    .save()
    .then(result => {
        res.status(201).send("OK");
    })
    .catch(err => {
        let response = new Response(err.toString(), `Not created !!!`);
        res.status(500).json(response);
    });

}