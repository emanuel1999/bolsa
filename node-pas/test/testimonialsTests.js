'use stricts'
const server = require('../app');

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;


chai.use(chaiHttp);

const url = `http://localhost:${process.env.PORT}`;

describe('Testing routes off Testimonials', ()=>{
    describe('Testing GET method on route /testimonials',()=>{
        it('should get all testimonials',(done)=>{
            chai.request(server)
            .get('/testimonials')
            .end((err,res)=>{
                    console.log(res.body)
                    expect(res.body).to.be.a('object')
                    expect(res).to.have.status(200)
                    done();
                })
        })
    })
    describe('Testing POST method on route /testimonials',()=>{
        it('should create a new testimonial',(done)=>{
            chai.request(server)
            .post('/testimonials')
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwLCJpYXQiOjE2NTA2ODI1MjUsImV4cCI6MTY1MDY5NjkyNX0.tKaG8zUnr-QDN9FpVrFJdvKRZaeWn86-3Qh9RxYsTtU")
            .send({
                name:"TestimonioPruebaMocha",
                image:"testimonioPrueba.jpg",
                content:"Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto."
            })
            .end((err,res)=>{
                    
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('meta')
                    expect(res).to.have.status(200)

                    done();
                })
        })
    })
    describe('Testing PUT method on route /testimonials',()=>{
        it('should update an testimonial',(done)=>{
            const idToTest=69;
            chai.request(server)
            .put(`/testimonials/${idToTest}`)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwLCJpYXQiOjE2NTA2ODI1MjUsImV4cCI6MTY1MDY5NjkyNX0.tKaG8zUnr-QDN9FpVrFJdvKRZaeWn86-3Qh9RxYsTtU")
            .send({
                name:"TestimonioPruebaMocha nuevamente Modificado",
                image:"testimonioPrueba.jpg",
                content:"Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto."
            })
            .end((err,res)=>{                    
                    expect(res.body).to.be.a('object')
                    expect(res).to.have.status(200)
                    if (err) done(err)
                    else done()                    
                })
        })
    })
    describe('Testing PUT method on route /testimonials',()=>{
        it('should update an testimonial',(done)=>{
            const idToTest=1;
            chai.request(server)
            .put(`/testimonials/${idToTest}`)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwLCJpYXQiOjE2NTA2ODI1MjUsImV4cCI6MTY1MDY5NjkyNX0.tKaG8zUnr-QDN9FpVrFJdvKRZaeWn86-3Qh9RxYsTtU")
            .send({
                name:"TestimonioPruebaMochaModificado",
                image:"testimonioPrueba.jpg",
                content:"Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto."
            })
            .end((err,res)=>{                    
                    expect(res.body).to.be.a('object')
                    expect(res).to.have.status(200)
                    if (err) done(err)
                    else done()                    
                })
        })
    })
});


