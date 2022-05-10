'use stricts'
const server = require('../app');

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;


chai.use(chaiHttp);

const url = `http://localhost:${process.env.PORT}`;

describe('Testing routes off Contacts', ()=>{
    describe('Testing GET method on route /contacts',()=>{
        it('should get all contacts',(done)=>{
            chai.request(server)
            .get('/contacts')
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTY1MDM5OTg2MCwiZXhwIjoxNjUwNDE0MjYwfQ.6q9Ri57DJq0wzRN8-sgZtXE3_iJz-PGY60aOI8DTFeg")
            .end((err,res)=>{
                    console.log(res.body)
                    expect(res.body).to.be.a('object')
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('success').to.equal(true)
                    done();
                })
        })
    })    
    describe('Testing POST method on route /contacts',()=>{
        it('should create a new contact',(done)=>{
            chai.request(server)
            .post('/contacts')
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTY1MDM5OTg2MCwiZXhwIjoxNjUwNDE0MjYwfQ.6q9Ri57DJq0wzRN8-sgZtXE3_iJz-PGY60aOI8DTFeg")
            .send({name: "Test Name", phone: 789654, email: 'test@gmail.com', message: "test Message"})
            .end((err,res)=>{                    
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('success').to.equal(true)
                    expect(res.body).to.have.property('data').to.be.a('object')                    
                    expect(res).to.have.status(200)
                    done();
                })
        })
    })
});