'use strict'
const api = require('express').Router()
const csv = require('csvtojson');

const score_records = './data/score-records.csv'; 
const score_records_headers = ['candidate_id', 'communication_score', 'coding_score', 'title', 'company_id']
const score_records_data = [];

const companies = './data/companies.csv'
const companies_headers = ['company_id', 'fractal_index']
const companies_data = [];

//API Routes
// Convert score-records.csv, companies.csv to json Objects
// + Serve resulting json objects

//score-records.csv -> json -> api/candidates
api.get('/candidates', function(req, res, next) {
    let data = [];
    csv({noheader: false, headers: score_records_headers})
        .fromFile(score_records)
        .on('json',(jsonObj) => {
            data.push(jsonObj)
        })
        .on('done', (error)=>{
            res.send(data)
            console.log('end', error)
        })
})

//companies.csv -> json -> api/companies
api.get('/companies', function(req, res, next) {
    let data = [];
    csv({noheader: false, headers: companies_headers})
    .fromFile(companies)
    .on('json',(jsonObj) => {
        data.push(jsonObj)
    })
    .on('done', (error) => {
        res.send(data)
        console.log('end', error)
    })
    
})

module.exports = api