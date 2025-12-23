import { type } from "@testing-library/user-event/dist/cjs/utility/type.js";

describe("Pizza Siparis Formu - isim input testi",()=>{

    beforeEach(()=>{
        cy.visit("http://localhost:5173/");
        cy.get("[data-testid='order-button'").click();
    });
    it("İsim inputuna metin girilebilmeli",()=>{
        cy.get('[data-testid="name-input"]')
        .type("Ali")
        .should("have.value","Ali");
    }) 

});

describe("Malzeme seçimi testleri", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/formPage");
  });

  it("Birden fazla malzeme seçilebilmeli", () => {

    cy.get('[data-testid="topping-checkbox"]')
      .should("have.length", 14); // malzemeListesi uzunluğu

    cy.get('[data-testid="topping-checkbox"]').eq(0).check();
    cy.get('[data-testid="topping-checkbox"]').eq(2).check();
    cy.get('[data-testid="topping-checkbox"]').eq(4).check();

    cy.get('[data-testid="topping-checkbox"]:checked')
      .should("have.length", 3);
  });

});


describe("Pizza Sipariş Formu - Submit Testi", () => {

  beforeEach(() => {
    // POST isteğini yakala
    cy.intercept("POST", "https://reqres.in/api/pizza", {
      statusCode: 201,
      body: { id: 1 },
    }).as("submitOrder");

    // Doğrudan form sayfasına git
    cy.visit("http://localhost:5173/formPage");
  });

  it("Form başarıyla gönderilebilmeli ve success sayfasına yönlenmeli", () => {

    //  İsim gir
    cy.get('[data-testid="name-input"]').type("Ali");

    //  Boyut seç
    cy.get('input[type="radio"][value="orta"]').check();

    //  Hamur seç
    cy.get('select[name="hamur"]').select("İnce Hamur");

    //  En az 4 malzeme seç
    cy.get('[data-testid="topping-checkbox"]').eq(0).check();
    cy.get('[data-testid="topping-checkbox"]').eq(1).check();
    cy.get('[data-testid="topping-checkbox"]').eq(2).check();
    cy.get('[data-testid="topping-checkbox"]').eq(3).check();

    //  Submit
    cy.get('button[type="submit"]')
      .should("not.be.disabled")
      .click();

    //  POST isteği atıldı mı?
    cy.wait("@submitOrder").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);

      // Payload kontrolü (çok artı puan)
      expect(interception.request.body).to.have.property("isim", "Ali");
      expect(interception.request.body.malzemeler).to.have.length.at.least(4);
      expect(interception.request.body).to.have.property("toplam");
    });

    //  SUCCESS PAGE KONTROLLERİ
    cy.url().should("include", "/successPage");

    cy.contains("TEBRİKLER!")
      .should("be.visible");

    cy.contains("SİPARİŞİNİZ")
      .should("be.visible");

    cy.contains("ALINDI!")
      .should("be.visible");
  });

});