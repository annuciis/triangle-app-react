import { render, screen } from '@testing-library/react';
import triangleType from "../triangleType"



test('Similar sides to be "Equilateral"', () => {
  expect(triangleType(1,1,1)).toBe("Equilateral")
  expect(triangleType(2,3,2)).not.toBe("Equilateral")
}) 

test('Non existing triangle to be "Non existing"', () => {
  expect(triangleType(10,2,1)).toBe("Non existing")
  expect(triangleType(1,1,9)).toBe("Non existing")
  expect(triangleType(1,5,1)).toBe("Non existing")
}) 

test('2 sides with the same length to be "Isosceles"', () => {
  expect(triangleType(2,2,1)).toBe("Isosceles")
  expect(triangleType(5,4,5)).toBe("Isosceles")
  expect(triangleType(3,4,4)).toBe("Isosceles")
})

test('Different all 3 sides(but exists) to be "Scalene"', () => {
  expect(triangleType(5,2,4)).toBe("Scalene")
})