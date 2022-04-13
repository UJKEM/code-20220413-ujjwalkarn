const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("BMI Calculator", () => {
  describe("GET /", () => {
    // Test to get all human record
    it("should get all human record", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.should.have.property("error").eql("false");
          done();
        });
    });

    it("should get a overweight human record", (done) => {
      chai
        .request(app)
        .get(`/overweight`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.should.have.property("TotalOverweight");
          res.body.should.have.property("error").eql("false");
          done();
        });
    });
  });

  describe("/POST Calculate BMI on body parameters", () => {
    it("it should not POST a book without pages field", (done) => {
      let human = { Gender: "Female", HeightCm: 167, WeightKg: 82 };
      chai
        .request(server)
        .post("/")
        .send(human)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.should.have.property("error").eql("false");

          done();
        });
    });
  });
});
