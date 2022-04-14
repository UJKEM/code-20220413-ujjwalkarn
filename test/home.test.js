const { expect } = require("chai");
const chai = require("chai");
const request = require("request");
const port = process.env.PORT || 3000;

// Configure chai
chai.should();

describe("BMI Calculator", () => {
  describe("GET /", () => {
    // Test to get all human record
    it("should get all human record", (done) => {
      request(`http://localhost:${port}`, function (error, response, body) {
        console.log(response.body);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.not.be.empty;
        expect(response.body.error).to.eq(false);
        expect(response.body.data).to.not.be.empty;
      });
      done();
    });

    it("should get a overweight human record", (done) => {
      request(
        `http://localhost:${port}/overweight`,
        function (error, response, body) {
          console.log(response.body);

          expect(response.statusCode).to.equal(200);
          expect(response.body).to.not.be.empty;
          expect(response.body.error).to.eq(false);
          expect(response.body.data).to.not.be.empty;
          expect(response.body.TotalOverweight).to.not.eq(0);
        }
      );
      done();
    });
  });
  describe("POST / Calculate BMI on body parameters", () => {
    it("it should add a new human BMI record", (done) => {
      let human = { Gender: "Female", HeightCm: 167, WeightKg: 82 };
      request(
        `http://localhost:${port}`,
        {
          method: "POST",
          body: JSON.stringify(human),
        },
        (error, response, body) => {
          console.log(response.body);

          expect(response.statusCode).to.equal(201);
          expect(response.body).to.not.be.empty;
          expect(response.body.error).to.eq(false);
          expect(response.body.data).to.not.be.empty;
        }
      );
      done();
    });
  });
});
