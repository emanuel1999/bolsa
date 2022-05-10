const server = require('../app');

const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsImlhdCI6MTY1MDI5ODcwOSwiZXhwIjoxNjUwMzEzMTA5fQ._1iUrT12-QZ2RoGa_hGYcVZNKTdm6OaCCCK8yYfVQcg'

describe('Testing categories router', () => {
    describe('Testing GET method on route /categories', () => {
        it('should get all categories', (done) => {
            chai.request(server)
                .get('/categories')
                .set('token', `${token}`)
                .end((err, res) => {
                    expect(res.body).to.be.a('object');
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('should get all categories with pagination', (done) => {
            chai.request(server)
                .get('/categories?page=2')
                .set('token', `${token}`)
                .end((err, res) => {
                    expect(res.body).to.be.a('object');
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('should not get all categories', (done) => {
            chai.request(server)
                .get('/categories?page=0')
                .set('token', `${token}`)
                .end((err, res) => {
                    expect(res.body).to.be.a('object');
                    expect(res).to.have.status(400);
                    done();
                });
        });
        it('should not get all categories', (done) => {
            chai.request(server)
                .get('/categories?page=a')
                .set('token', `${token}`)
                .end((err, res) => {
                    expect(res.body).to.be.a('object');
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });
    describe('Testing GET method on route /categories/:id', () => {
        it('should get a category', (done) => {
            chai.request(server)
                .get('/categories/44')
                .set('token', `${token}`)
                .end((err, res) => {
                    expect(res.body).to.be.a('object');
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('should return a 404 error', (done) => {
            chai.request(server)
                .get('/categories/100')
                .set('token', `${token}`)
                .end((err, res) => {
                    expect(res.body).to.be.a('object');
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });
    describe('Testing POST method on route /categories', () => {
        it('should create a category', (done) => {
            chai.request(server)
                .post('/categories')
                .set('token', `${token}`)
                .send({
                    name: 'test',
                    description: 'test',
                    image: 'test'
                })
                .end((err, res) => {
                    expect(res.body).to.be.a('object');
                    expect(res).to.have.status(201);
                    done();
                });
        });
        it('should create a category', (done) => {
            chai.request(server)
                .post('/categories')
                .set('token', `${token}`)
                .send({
                    name: 'test',
                    description: '',
                    image: ''
                })
                .end((err, res) => {
                    expect(res.body).to.be.a('object');
                    expect(res).to.have.status(201);
                    done();
                });
        })
        it('should return a 400 error', (done) => {
            chai.request(server)
                .post('/categories')
                .set('token', `${token}`)
                .send({
                    name: 'test',
                    description: 'test'
                })
                .end((err, res) => {
                    expect(res.body).to.be.a('object');
                    expect(res).to.have.status(400);
                    done();
                });
        });
    })
    describe('Testing PUT method on route /categories/:id', () => {
        it('should update a category', (done) => {
            chai.request(server)
                .put('/categories/44')
                .set('token', `${token}`)
                .send({
                    name: 'test',
                    description: 'test',
                    image: 'test'
                })
                .end((err, res) => {
                    expect(res.body).to.be.a('object');
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('should return a 404 error', (done) => {
            chai.request(server)
                .put('/categories/100')
                .set('token', `${token}`)
                .send({
                    name: 'test',
                    description: 'test',
                    image: 'test'
                })
                .end((err, res) => {
                    expect(res.body).to.be.a('object');
                    expect(res).to.have.status(404);
                    done();
                });
        });
        it('should return a 400 error', (done) => {
            chai.request(server)
                .put('/categories/48')
                .set('token', `${token}`)
                .send({
                    name: 'test',
                    description: 'test'
                })
                .end((err, res) => {
                    expect(res.body).to.be.a('object');
                    expect(res).to.have.status(400);
                    done();
                });
        });
        it('should return a 400 error', (done) => {
            chai.request(server)
                .put('/categories/1')
                .set('token', `${token}`)
                .send({
                    name: 12,
                    description: 'test',
                    image: ''
                })
                .end((err, res) => {
                    expect(res.body).to.be.a('object');
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });
    describe('Testing DELETE method on route /categories/:id', () => {
        it('should delete a category', (done) => {
            chai.request(server)
                .delete('/categories/50')
                .set('token', `${token}`)
                .end((err, res) => {
                    expect(res.body).to.be.a('object');
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('should return a 404 error', (done) => {
            chai.request(server)
                .delete('/categories/100')
                .set('token', `${token}`)
                .end((err, res) => {
                    expect(res.body).to.be.a('object');
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });
})

