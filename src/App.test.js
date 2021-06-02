import { render, screen } from '@testing-library/react';
import App from './App';



test('To be assigned all sides', () => {
  expect(values.AB).toBeDefined();
  expect(values.BC).toBeDefined();
  expect(values.AC).toBeDefined();
});

test('All sides to be greater than 0', () => {
  expect(values.AB).toBeGreaterThan(0);
  expect(values.BC).toBeGreaterThan(0);
  expect(values.AC).toBeGreaterThan(0);
});


test('All side inputs do not contain any letter', () => {
  expect(values.AB).not.toMatch([A-Za-z]);
  expect(values.BC).not.toMatch([A-Za-z]);
  expect(values.AC).not.toMatch([A-Za-z]);
})