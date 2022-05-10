'use stricts'
const server = require('../app');

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;


chai.use(chaiHttp);

const url = `http://localhost:${process.env.PORT}`;

describe('Testing routes off Activities', ()=>{
    describe('Testing GET method on route /activities',()=>{
        it('should get all activities',(done)=>{
            chai.request(server)
            .get('/activities')
            .end((err,res)=>{
                    console.log(res.body)
                    expect(res.body).to.be.a('array')
                    expect(res).to.have.status(200)
                    done();
                })
        })
    })
    describe('Testing PUT method on route /activities',()=>{
        it('should update an activity',(done)=>{
            const idToTest=2;
            chai.request(server)
            .put(`/activities/${idToTest}`)
            .send({name: "Activity updated test", content: 'Content updated test', image: 'Url image updated test'})
            .end((err,res)=>{                    
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('content')
                    expect(res.body).to.have.property('image')
                    expect(res).to.have.status(200)
                    if (err) done(err)
                    else done()                    
                })
        })
    })
    describe('Testing POST method on route /activities',()=>{
        it('should create a new activity',(done)=>{
            chai.request(server)
            .post('/activities')
            .send({name: "Activity test", content: 'Content test', image: 'Url image test'})
            .end((err,res)=>{
                    
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('content')
                    expect(res.body).to.have.property('image')
                    expect(res).to.have.status(200)
                    done();
                })
        })
    })
});

