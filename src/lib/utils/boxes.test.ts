import { boxesIntersect } from "./boxes";

describe("boxesIntersect", () => {
  it("should return true if boxes overlap", () => {
    expect(
      boxesIntersect(
        {
          left: 0,
          top: 0,
          width: 20,
          height: 20
        },
        {
          left: 19,
          top: 0,
          width: 20,
          height: 20
        }
      )
    ).toBe(true);
  });

  it("should return false if boxes do not overlap", () => {
    expect(
      boxesIntersect(
        {
          left: 0,
          top: 0,
          width: 20,
          height: 20
        },
        {
          left: 30,
          top: 0,
          width: 20,
          height: 20
        }
      )
    ).toBe(false);
  });
});
