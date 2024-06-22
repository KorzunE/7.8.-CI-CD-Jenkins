const body = require("../fixtures/user.json");
const updateBody = require("../fixtures/userUpdate.json");

describe("API tests", () => {
    afterEach(() => {
        cy.deleteUser(body.username);
    });

    it("Add user", () => {
        cy.addUser(body)
            .then((response) => {
                expect(response.status).eq(200);
                expect(response.body.message).eq("666");
            });
    });

    it("Get user", () => {
        cy.addUser(body);
        cy.getUser(body.username)
            .then((response) => {
                expect(response.status).eq(200);
                expect(response.body.id).eq(body.id);
                expect(response.body).to.have.property("username", body.username);
                expect(response.body).to.have.property("firstName", body.firstName);
                expect(response.body).to.have.property("lastName", body.lastName);
            });
    });

    it("Update user", () => {
        cy.addUser(body);
        cy.updateUser(body.username, updateBody)
            .then((response) => {
                //cy.log(JSON.stringify(response.body));
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
                //cy.log(JSON.stringify(response.body));
                expect(response.status).eq(200);
                expect(response.body.message).eq(body.username);
            });
    });
});