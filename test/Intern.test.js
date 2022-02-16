const Intern = require("../lib/Intern");

test("Can set school via constructor", () => {
  const testValue = "School";
  const e = new Intern("Brandon", 1, "test@mail.com", testValue);
  expect(e.school).toBe(testValue);
});

test("getRole() should return \"Intern\"", () => {
  const testValue = "Intern";
  const e = new Intern("Brandon", 1, "test@mail.com", "School");
  expect(e.getRole()).toBe(testValue);
});

test("Can get school via getSchool()", () => {
  const testValue = "School";
  const e = new Intern("Brandon", 1, "test@mail.com", testValue);
  expect(e.getSchool()).toBe(testValue);
});
