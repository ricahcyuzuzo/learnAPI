const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const {expect} = chai;
const should = chai.should();

chai.use(chaiHttp);

describe('Testing the Whole App API', () => {
    describe('Testing the GET Routes', () => {
        it('It has to get all Users', (done) =>{
            chai.request(app)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

        it('It has to get one User', (done) => {
            chai.request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                })
            done();
        });
    })

    describe('Testing the POST routes', () => {
        it('It has to Create a new User', (done) => {
            const newUser = {id: 2, name: "Richard"};
            chai.request(app)
                .post('/users')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object'); 
                    res.body.should.have.property('status').eql(201);
                    res.body.should.have.property('message').eql('User Created!!');
                    res.body.should.have.property('data').eql(newUser);
                    expect(res.body).to.have.property('status').eql(201);
                    done();
                })
        });
    });


    describe('Testing the PUT routes', () => {
        it('It has to update One user', (done) => {
            const user = {id:1, name:"Richard"};
            chai.request(app)
                .put('/users/1')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User Updated!!');
                    res.body.should.have.property('data').eql(user);
                    done();
                })
        });
    });

    describe('Testing the Delete routes', () => {
        it('It has to delete one user', (done) => {
            chai.request(app)
                .delete('/users/2')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User Deleted!!');
                    done();
                })
        });
    });

});