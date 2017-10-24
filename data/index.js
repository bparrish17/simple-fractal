const csv = require('csvtojson');

const score_records = './data/score-records.csv'; 
const score_records_headers = ['candidate_id', 'communication_score', 'coding_score', 'title', 'company_id']
const score_records_data = [];

const companies = './data/companies.csv'
const companies_headers = ['company_id', 'fractal_index']
const companies_data = [];


//Convert Score Records to Json Object
const read_scores = new Promise((resolve, reject) => {
    const data = [];
    csv({noheader: false, headers: score_records_headers})
        .fromFile(score_records)
        .on('json',(jsonObj)=>{
            data.push(jsonObj)
            resolve(data)
        })
        .on('done',(error)=>{
            console.log('end', error)
        })
  })

//Convert Companies to Json Object
const read_companies = new Promise((resolve, reject) => {
    const data = [];
    csv({noheader: false, headers: companies_headers})
        .fromFile(companies)
        .on('json',(jsonObj)=>{
            data.push(jsonObj)
            resolve(data);
        })
        .on('done',(error)=>{
            console.log('end', error)
        })
})

module.exports = {
    read_scores, 
    read_companies
}
