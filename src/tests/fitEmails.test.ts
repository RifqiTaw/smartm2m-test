import { describe, it, expect } from "vitest";
import { fitEmails } from "../utils/fitEmails";

describe("fitEmails", () => {
  it("fits multiple emails if enough width", () => {
    const result = fitEmails(["a@test.com", "b@test.com"], 50);
    expect(result.fitCount).toBe(2);
  });

  it("fits only one when too narrow", () => {
    const result = fitEmails(["a@test.com", "b@test.com"], 5);
    expect(result.fitCount).toBe(1);
  });
});
