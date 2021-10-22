const {EligibilityService} = require('../src/eligibility.service');
const should = require('should');

describe('Eligibility', () => {

  describe('No condition', () => {
    it('should be eligible with no condition', () => {
      const cart = {};
      const profile = {};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.true();
    });
  });

  describe('Basic condition', () => {
    it('should not be eligible when basic integer condition is not fulfilled (does not exist)', () => {
      const cart = {};
      const profile = {total: 20};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should not be eligible when basic integer condition is not fulfilled (wrong value)', () => {
      const cart = {total: 30};
      const profile = {total: 20};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should be eligible when basic integer condition is fulfilled', () => {
      const cart = {total: 20};
      const profile = {total: 20};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.true();
    });
    it('should not be eligible when basic string condition is not fulfilled (does not exist)', () => {
      const cart = {};
      const profile = {shopperId: 'shopper-id'};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should not be eligible when basic string condition is not fulfilled (wrong value)', () => {
      const cart = {shopperId: 'other-shopper-id'};
      const profile = {shopperId: 'shopper-id'};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should be eligible when basic string condition is fulfilled', () => {
      const cart = {shopperId: 'shopper-id'};
      const profile = {shopperId: 'shopper-id'};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.true();
    });
    it('should be eligible when basic integer condition is fulfilled with string value', () => {
      const cart = {total: "20"};
      const profile = {total: 20};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.true();
    });
    it('should be eligible when basic string condition is fulfilled with integer value', () => {
      const cart = {total: 20};
      const profile = {total: "20"};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.true();
    });
  });

  describe('Gt condition', () => {
    it('should not be eligible when gt condition is not fulfilled', () => {
      const cart = {total: 10};
      const profile = {total: {gt: 20}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should not be eligible when gt condition is not fulfilled (equal)', () => {
      const cart = {total: 20};
      const profile = {total: {gt: 20}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should be eligible when gt condition is fulfilled', () => {
      const cart = {total: 30};
      const profile = {total: {gt: 20}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.true();
    });
  });
  describe('Lt condition', () => {
    it('should not be eligible when lt condition is not fulfilled', () => {
      const cart = {total: 30};
      const profile = {total: {lt: 20}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should not be eligible when lt condition is not fulfilled (equal)', () => {
      const cart = {total: 20};
      const profile = {total: {lt: 20}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should be eligible when lt condition is fulfilled', () => {
      const cart = {total: 10};
      const profile = {total: {lt: 20}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.true();
    });
  });

  describe('Gte condition', () => {
    it('should not be eligible when gte condition is not fulfilled', () => {
      const cart = {total: 10};
      const profile = {total: {gte: 20}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should be eligible when gte condition is fulfilled (equal)', () => {
      const cart = {total: 20};
      const profile = {total: {gte: 20}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.true();
    });
    it('should be eligible when gte condition is fulfilled', () => {
      const cart = {total: 30};
      const profile = {total: {gte: 20}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.true();
    });
  });

  describe('Lte condition', () => {
    it('should not be eligible when lt condition is not fulfilled', () => {
      const cart = {total: 30};
      const profile = {total: {lte: 20}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should be eligible when lt condition is fulfilled (equal)', () => {
      const cart = {total: 20};
      const profile = {total: {lte: 20}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.true();
    });
    it('should be eligible when lt condition is fulfilled', () => {
      const cart = {total: 10};
      const profile = {total: {lte: 20}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.true();
    });
  });

  describe('In condition', () => {
    it('should not be eligible when in condition is not fulfilled', () => {
      const cart = {shopperId: 'shopper-id0'};
      const profile = {shopperId: {in: ['shopper-id1', 'shopper-id2']}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should be eligible when in condition is fulfilled', () => {
      const cart = {shopperId: 'shopper-id1'};
      const profile = {shopperId: {in: ['shopper-id1', 'shopper-id2']}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.true();
    });
  });

  describe('And condition', () => {
    it('should not be eligible when and condition is not fulfilled (none)', () => {
      const cart = {total: 0};
      const profile = {total: {and: {gt: 10, gt: 20}}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should not be eligible when and condition is not fulfilled (only one)', () => {
      const cart = {total: 30};
      const profile = {total: {and: {gt: 10, lt: 20}}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should be eligible when and condition is fulfilled', () => {
      const cart = { total: 20};
      const profile = {total: {and: {gt: 10, lt: 30}}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.true();
    });
  });

  describe('Or condition', () => {
    it('should not be eligible when or condition is not fulfilled', () => {
      const cart = {total: 0};
      const profile = {total: {or: {gt: 10, gt: 20}}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should be eligible when or condition is fulfilled', () => {
      const cart = {total: 0};
      const profile = {total: {or: {gt: 10, lt: 20}}};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.true();
    });
  });

  describe('Sub-object condition', () => {
    it('should not be eligible when sub object condition is not fulfilled (first level field does not exist)', () => {
      const cart = {};
      const profile = {'products.quantity': 1};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should not be eligible when sub object condition is not fulfilled (second level field does not exist)', () => {
      const cart = {products:{}};
      const profile = {'products.quantity': 1};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should not be eligible when sub object condition is not fulfilled (wrong value)', () => {
      const cart = {products:{quantity:2}};
      const profile = {'products.quantity': 1};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should be eligible when sub object condition is fulfilled', () => {
      const cart = {products:{quantity:1}};
      const profile = {'products.quantity': 1};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.true();
    });
    it('should not be eligible when array sub object condition is not fulfilled', () => {
      const cart = {products:[{quantity:2}]};
      const profile = {'products.quantity': 1};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.false();
    });
    it('should be eligible when array sub object condition is fulfilled', () => {
      const cart = {products:[{quantity:1}]};
      const profile = {'products.quantity': 1};
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.true();
    });
  });

  describe('Complex cases', () => {
    it('should be eligible with example values', () => {
      const cart = {
        "cartId": "cart-id",
        "shopperId": "shopper-id",
        "date": "2021-10-06T18:35:42.000Z",
        "totalAti": 99.80,
        "promoCode": "voucher-42",
        "products": [
          {
            "productId": "5449000054227",
            "quantity": 20,
            "unitPriceAti": 2.5,
            "totalPriceAti": 50
          },
          {
            "productId": "3099873045369",
            "quantity": 2,
            "unitPriceAti": 24.90,
            "totalPriceAti": 49.80
          }
        ]
      }
      const profile = {
        "shopperId": "shopper-id",
        "totalAti": {
          "gt": 50
        },
        "products.productId": {
          "in": ["5449000054227"]
        },
        "date": {
          "and": {
            "gt": "2021-01-01T00:00:00.000Z",
            "lt": "2021-12-31T23:59:59.000Z"
          }
        }
      };
      const eligibilityService = new EligibilityService();
      const actualEligibility = eligibilityService.isEligible(cart, profile);
      should(actualEligibility).be.true();
    });
  });
});