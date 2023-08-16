const { calcDollarAmount,calcVolumeCredits, calcAmount } = require("./Calculations.js");

describe("Calc dollar amount", () => {
	const invoices = [
		{
			customer: "BigCo",
			performances: [
				{
					playID: "hamlet",
					audience: 55,
				},
				{
					playID: "as-like",
					audience: 35,
				},
				{
					playID: "othello",
					audience: 40,
				},
			],
		},
	];

	const plays = {
		hamlet: { name: "Hamlet", type: "tragedy" },
		"as-like": { name: "As You Like It", type: "comedy" },
		othello: { name: "Othello", type: "tragedy" },
		RomeoAndJuliet: { name: "RomeoAndJuliet", type: "tragedy" },
	};

	it("should divide amount by 100", () => {
		expect(calcDollarAmount(100)).toEqual(1);
	});

	it("calculates play values based on play type", () => {
		

		expect(calcAmount(invoices[0].performances[0],plays.hamlet)).toEqual(650.0);
	});

	it("calculates VolumCredits refactor", () => {		

		expect(calcVolumeCredits(invoices[0].performances[0],plays.hamlet)).toEqual(25);
	});
});
