'use strict'
const api = require('express').Router()
const csv = require('csvtojson');

const score_records = './data/score-records.csv'; 
const score_records_headers = ['candidate_id', 'communication_score', 'coding_score', 'title', 'company_id']
const score_records_data = [];

const companies = './data/companies.csv'
const companies_headers = ['company_id', 'fractal_index']
const companies_data = [];

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