const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Asegúrate de que la ruta a tu app sea correcta

const { expect } = chai;
chai.use(chaiHttp);

describe('GET /', () => {
    it('should return 200 and render the homepage', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});