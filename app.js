const express = require("express");
const app = express();
const port = 3000;
const { statement, formatedStatements } = require("./src/statement");

app.get("/", (req, res) => {
  let plays = {
    hamlet: { name: "Hamlet", type: "tragedy" },
    "as-like": { name: "As You Like It", type: "comedy" },
    othello: { name: "Othello", type: "tragedy" },
  };
  let invoices = [
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
  res.send(formatedStatements(invoices[0], plays).html);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
