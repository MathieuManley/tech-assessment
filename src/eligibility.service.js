
function eq(cartValue, criteriaValue) {
  if (Array.isArray(cartValue)) {
    return cartValue.some((cv) => cv == criteriaValue);
  }
  return cartValue == criteriaValue;
}

function gt(cartValue, criteriaValue) {
  return cartValue > criteriaValue;
}

function lt(cartValue, criteriaValue) {
  return cartValue < criteriaValue;
}

function gte(cartValue, criteriaValue) {
  return cartValue >= criteriaValue;
}

function lte(cartValue, criteriaValue) {
  return cartValue <= criteriaValue;
}

function inFunction(cartValue, criteriaValue) {
  if (Array.isArray(cartValue)) {
    return cartValue.some((cv) => criteriaValue.includes(cv));
  }
  return criteriaValue.includes(cartValue);
}

function andFunction(cartValue, values) {
  return Object.keys(values).every((key) => {
    const v = values[key];
    if (key in logicalConditions) {
      return logicalConditions[key](cartValue, v);
    } else {
      return eq(cartValue, v);
    }
  });
}

function orFunction(cartValue, values) {
  return Object.keys(values).some((key) => {
    const v = values[key];
    if (key in logicalConditions) {
      return logicalConditions[key](cartValue, v);
    } else {
      return eq(cartValue, v);
    }
  });
}

const logicalConditions = {
  gt: gt,
  lt: lt,
  gte: gte,
  lte: lte,
  and: andFunction,
  or: orFunction,
  in: inFunction,
};
class EligibilityService {
  /**
   * Compare cart data with criteria to compute eligibility.
   * If all criteria are fulfilled then the cart is eligible (return true).
   *
   * @param cart
   * @param criteria
   * @return {boolean}
   */
  getCartValue(key, cart) {
    let finalValue = cart;
    let count = 0;
    const keys = key.split(".").filter((e) => e);
    const keyArrayLength = keys.length;

    while (keyArrayLength > count) {
      const key = keys[count];
      if (Array.isArray(finalValue)) {
        finalValue = finalValue.map((e) => e[key]);
        break;
      }
      finalValue = finalValue[key];
      if (finalValue === undefined) {
        break;
      }
      count++;
    }

    return finalValue;
  }

  isEligible(cart, criteria) {
    const criteriaKeys = Object.keys(criteria);
    const criteriaKeysLength = criteriaKeys.length;

    if (!criteriaKeysLength) {
      return true;
    }

    let count = 0;
    while (criteriaKeysLength > count) {
      const key = criteriaKeys[count];
      const criterion = criteria[key];
      const cartValue = this.getCartValue(key, cart);
      if (cartValue === undefined) {
        return false;
      }

      let isCriteriaMet = false;
      if (typeof criterion === "object") {
        isCriteriaMet = Object.keys(criterion).every((k) => {
          if (k in logicalConditions) {
            return logicalConditions[k](cartValue, criterion[k]);
          }
          return false;
        });
      } else {
        isCriteriaMet = eq(cartValue, criterion);
      }
      if (!isCriteriaMet) {
        return false;
      }
      count++;
    }
    return true;
  }
}

module.exports = {
  EligibilityService,
};
