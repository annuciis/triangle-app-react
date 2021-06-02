const triangleType = (side1, side2, side3) => {
    //check, if exists
    if (
      side1 + side2 <= side3 ||
      side1 + side3 <= side2 ||
      side2 + side3 <= side1
    ) {
      return "Non existing";
    }

    if (side1 === side2 && side2 === side3) {
      return "Equilateral";
    }

    if (side1 === side2 || side1 === side3 || side2 === side3) {
      return "Isosceles";
    }

    return "Scalene";
  };

  export default triangleType;