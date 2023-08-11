const { calcDollarAmount, calcAmount } = require("./calcDollarAmount.js");

describe("Calc dollar amount", () => {
	it("should divide amount by 100", () => {
		expect(calcDollarAmount(100)).toEqual(1);
	});

	it("calculates play values based on play type", () => {
		expect(calcAmount().toEqual(1));
	});
});
