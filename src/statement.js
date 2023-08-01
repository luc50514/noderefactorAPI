function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;
  let playAmounts = [];
  for (const perf of invoice.performances) {
    const play = plays[perf.playID];

    let thisAmount = GetThisAmount(perf, play);

    volumeCredits = GetVolumeCredits(play, perf, volumeCredits);

    totalAmount += thisAmount;
    playAmounts.push({
      playname: play.name,
      playamount: thisAmount,
      playID: perf.playID,
      audience: perf.audience,
    });
  }
  for (const calculation of playAmounts) {
    result += ` ${calculation.playname}: ${format(
      calculation.thisAmount / 100
    )} (${calculation.audience} seats)\n`;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

function GetVolumeCredits(play, perf, volumeCredits) {
  let newVolumeCredits = volumeCredits;
  newVolumeCredits += Math.max(perf.audience - 30, 0);
  if ("comedy" === play.type) newVolumeCredits += Math.floor(perf.audience / 5);
  return newVolumeCredits;
}

function GetThisAmount(perf, play) {
  let thisAmount = 0;
  switch (play.type) {
    case "tragedy":
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy":
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error("unknown type: ${play.type}");
  }
  return thisAmount;
}
module.exports = statement;
