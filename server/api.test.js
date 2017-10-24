const {expect} = require('chai')
const app = require('./index')
const request = require('supertest')
const agent = request.agent(app);

describe('API Routes', () => {
    describe('/api/candidates/', () => {
        it('responds with a Json array of candidate objects', function () {
            return request(app)
            .get('/api/candidates')
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body[0]).to.be.an.instanceof(Object)
                expect(res.body).to.be.an.instanceOf(Array);
            });
        });
        it('array is populated with candidates', () => {
            return request(app)
            .get('/api/candidates')
            .then(res => {
                console.log(res.body[4])
                expect(res.body[0].title).to.be.equal('Engineer')
                expect(res.body[0].candidate_id).to.be.equal('889')
                expect(res.body[0].communication_score).to.be.equal('114028')
                expect(res.body[0].coding_score).to.be.equal('180944')
                expect(res.body[0].company_id).to.be.equal('2')

                expect(res.body[4].title).to.be.equal('Engineer')
                expect(res.body[4].candidate_id).to.be.equal('893')
                expect(res.body[4].communication_score).to.be.equal('109561')
                expect(res.body[4].coding_score).to.be.equal('137014')
                expect(res.body[4].company_id).to.be.equal('2')
            })
        })
    }) 
    describe('/api/companies/', () => {
        it('responds with a Json array of company objects', function () {
            return request(app)
            .get('/api/candidates')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body[0]).to.be.an.instanceof(Object)
                expect(res.body).to.be.an.instanceOf(Array);
            });
        });
        it('array is populated with companies', () => {
            return request(app)
            .get('/api/companies')
            .expect(200)
            .then(res => {
                expect(res.body[0].company_id).to.be.equal('1')
                expect(res.body[0].fractal_index).to.be.equal('0.678')
                expect(res.body[1].company_id).to.be.equal('2')
                expect(res.body[1].fractal_index).to.be.equal('0.782')
            })
        })
    }) 
})
