const body = require("../fixtures/user.json");
const updateBody = require("../fixtures/userUpdate.json");

describe("API tests", () => {

    let body;
    beforeEach(() => {
        const randomId = Math.floor(Math.random() * 10000);
        body = {
            id: randomId
        };
    });
    it("Add user", () => {
        cy.addUser(body)
            .then((response) => {
                expect(response.status).eq(200);
                expect(response.body.message).eq(String(body.id));
            });
    });

    it("Get user", () => {
        cy.getUser(body.username)
        cy.addUser(body)
            .then((response) => {
                expect(response.status).eq(200);
                expect(response.body.message).eq(String(body.id));
                expect(response.body).hasOwnProperty("username", body.username);
                expect(response.body).hasOwnProperty("firstName", body.firstName);
                expect(response.body).hasOwnProperty("lastName", body.lastName);
            });
    });

    it("Update user", () => {
        cy.addUser(body);
        cy.updateUser(body.username, updateBody)
            .then((response) => {
                expect(response.status).eq(200);
                expect(response.body.message).eq("999");
                cy.getUser(updateBody.username)
                    .then((response) => {
                        expect(response.status).eq(200);
                        expect(response.body).to.have.property("username", updateBody.username);
                        expect(response.body).to.have.property("firstName", updateBody.firstName);
                        expect(response.body).to.have.property("lastName", updateBody.lastName);
                    });
            });
    });
});
describe("Delete user", () => {
    it("Delete user", () => {
        cy.addUser(body);
        cy.deleteUser(body.username)
            .then((response) => {
                expect(response.status).eq(200);
                expect(response.body.message).eq(body.username);
            });
    });
});