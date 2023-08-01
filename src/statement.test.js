const {
  statement,
  calcAmount,
  calcVolumeCredits,
  calculatePlayObjects,
} = require("./statement");
const plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
  RomeoAndJuliet: { name: "RomeoAndJuliet", type: "tragedy" },
};

describe("Statement Test", () => {
  it("should test statement returns values", () => {
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
    const expectedOutput =
      "Statement for BigCo\n" +
      " Hamlet: $650.00 (55 seats)\n" +
      " As You Like It: $580.00 (35 seats)\n" +
      " Othello: $500.00 (40 seats)\n" +
      "Amount owed is $1,730.00\n" +
      "You earned 47 credits\n";
    expect(statement(invoices[0], plays)).toEqual(expectedOutput);
  });

  it("should calculate correct amount for tragedy plays", () => {
    expect(
      calcAmount(
        {
          playID: "hamlet",
          audience: 55,
        },
        { name: "Hamlet", type: "tragedy" }
      )
    ).toEqual(650.0);
  });

  it("should calculate correct volume credits for comedy play", () => {
    expect(
      calcVolumeCredits(
        {
          playID: "hamlet",
          audience: 55,
        },
        { name: "Hamlet", type: "comedy" }
      )
    ).toEqual(36);
  });

  it("should return an array of play calculation objects", () => {
    expect(
      calculatePlayObjects(
        [
          {
            playID: "hamlet",
            audience: 55,
          },
        ],
        plays
      )
    ).toEqual([
      {
        id: "hamlet",
        totalAmount: 650,
        volumeCredits: 25,
        thisAmount: 650,
        playName: "Hamlet",
        audience: 55,
      },
    ]);
  });

  it("Add a play", () => {
    expect(
      calculatePlayObjects(
        [
          {
            playID: "RomeoAndJuliet",
            audience: 65,
          },
        ],
        plays
      )
    ).toEqual([
      {
        id: "RomeoAndJuliet",
        totalAmount: 750,
        volumeCredits: 35,
        thisAmount: 750,
        playName: "RomeoAndJuliet",
        audience: 65,
      },
    ]);
  });

  it("Should return an html list of the statement", () => {
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
		const expectedOutput =
		  "<div><p>Statement for BigCo</p>" +
		  " <p>Hamlet: $650.00 (55 seats)</p>" +
		  " <p>As You Like It: $580.00 (35 seats)</p>" +
		  " <p>Othello: $500.00 (40 seats)</p>" +
		  "<p>Amount owed is $1,730.00</p>" +
		  "<p>You earned 47 credits</p></div>";
		expect(statement(invoices[0], plays)).toEqual(expectedOutput);
	  });
});
