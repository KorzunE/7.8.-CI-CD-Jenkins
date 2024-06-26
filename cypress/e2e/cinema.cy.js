describe('Cinema', () => {
    beforeEach(() => {
        cy.visit('https://qamid.tmweb.ru/client/index.php')
    })
    it('Chech start page', () => {
        cy.contains("Унесенные ветром").should("be.visible");
        cy.get(".page-nav__day").should("have.length", 7);
    })
})
describe("Valid log in", () => {
    beforeEach(() => {
        cy.visit("https://qamid.tmweb.ru/admin/");
    });
    const login = require("../fixtures/login.json");
    it("Should successfully log in with", () => {
        cy.login(login.validEmail, login.validPassword);
        cy.contains("Управление залами").should("be.visible");
    });
});
describe("Invalid log in", () => {
    beforeEach(() => {
        cy.visit("https://qamid.tmweb.ru/admin/");
    });
    const login = require("../fixtures/login.json");
    it("Log in with incorrect login and password", () => {
        cy.login(login.invalidEmail, login.invalidPassword);
        cy.contains("Ошибка авторизации!").should("be.visible");
    });

    it("Log in with empty email", () => {
        cy.login(login.null, login.validPassword);
        cy.contains("Авторизоваться").should("be.visible");
    })
    it("Log in with empty pass", () => {
        cy.login(login.validEmail, login.null);
        cy.contains("Авторизоваться").should("be.visible");
    })
    it("Log in with empty email and pass", () => {
        cy.login(login.null, login.null);
        cy.contains("Авторизоваться").should("be.visible");
    })
});
describe("Booking tickets tests", () => {
    it("Check hall from admin and book tickets", () => {
        const selector = require("../fixtures/booking.json");
        const login = require("../fixtures/login.json");

        cy.visit("https://qamid.tmweb.ru/admin/");
        cy.login(login.validEmail, login.validPassword);
        cy.get(selector.Hall4).click();
        cy.get(selector.openButton).click();
        cy.get(selector.openMessage).should(
            "have.text",
            "Продажа билетов открыта!!!"
        );
        cy.get(selector.openButton).click();
        cy.get(selector.Hall4Config).click();
        const seats = require("../fixtures/seats.json");
        seats.forEach((seat) => {
            cy.get(
                `.conf-step__hall-wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
            ).click();
        });
        cy.get(selector.book).click();
        cy.get(selector.success).should("be.visible").and("not.be.disabled");
        cy.visit("https://qamid.tmweb.ru/client/index.php");
        cy.get(selector.acess).click();
        cy.get(selector.timeSelect).click();
        const seats2 = require("../fixtures/seats2.json");
        seats2.forEach((seat) => {
            cy.get(
                `:nth-child(${seat.row}) > :nth-child(${seat.seat})`
            ).click();
        });
        cy.get(selector.accept).click();
        cy.contains('Вы выбрали билеты:');
    });
});