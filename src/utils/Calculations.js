function calcDollarAmount(amount) {
	return amount / 100;
}

function calcAmount(perf, play) {
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
	return calcDollarAmount(thisAmount);
}

function calcVolumeCredits(perf, play) {
	let volumeCredits = 0;
	if ("comedy" === play.type) {
		volumeCredits += Math.floor(perf.audience / 5);
	}
	return (volumeCredits += Math.max(perf.audience - 30, 0));
}

function calculatePlayObjects(performances, plays) {
	let totalAmount = 0;
	let volumeCredits = 0;
	let calculatedObjects = [];
	for (const perf of performances) {
		const play = plays[perf.playID];
		let thisAmount = calcAmount(perf, play);

		totalAmount += thisAmount;
		volumeCredits += calcVolumeCredits(perf, play);
		calculatedObjects.push({ id: perf.playID, totalAmount, volumeCredits, thisAmount, playName: play.name, audience: perf.audience });
	}
	return calculatedObjects;
}

module.exports = { calcDollarAmount, calcVolumeCredits,calcAmount, calculatePlayObjects };
