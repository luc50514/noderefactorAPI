const { formatedStatements } = require("./Formatting.js");

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

	it("Returns the correctly formatted html and plaintext statements.", () => {
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

		const expectedOutputHTML =
			"<div><p>Statement for BigCo</p>\n" +
			"<p>Hamlet: $650.00 (55 seats)</p>\n" +
			"<p>As You Like It: $580.00 (35 seats)</p>\n" +
			"<p>Othello: $500.00 (40 seats)</p>\n" +
			"<p>Amount owed is $1,730.00</p>\n" +
			"<p>You earned 47 credits</p></div>";

		const expectedOutputPlain =
			"Statement for BigCo\n" +
			"Hamlet: $650.00 (55 seats)\n" +
			"As You Like It: $580.00 (35 seats)\n" +
			"Othello: $500.00 (40 seats)\n" +
			"Amount owed is $1,730.00\n" +
			"You earned 47 credits\n";

		expect(formatedStatements(invoices[0], plays).html).toEqual(expectedOutputHTML);
		expect(formatedStatements(invoices[0], plays).plainText).toEqual(expectedOutputPlain);
	});

	it("Returns daniel goes next.", () => {
		expect(false).toEqual(true);
	});
});