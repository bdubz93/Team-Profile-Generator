const Engineer = require("../lib/Engineer");

test("Can set GitHUb account via constructor", () => {
  const testValue = "Github";
  const e = new Engineer("Brandon", 1, "test@mail.com", testValue);
  expect(e.github).toBe(testValue);
});

test("getRole() should return \"Engineer\"", () => {
  const testValue = "Engineer";
  const e = new Engineer("Brandon", 1, "test@mail.com", "Github");
  expect(e.getRole()).toBe(testValue);
});

test("Can get GitHub username via getGithub()", () => {
  const testValue = "Github";
  const e = new Engineer("Brandon", 1, "test@mail.com", testValue);
  expect(e.getGithub()).toBe(testValue);
});
