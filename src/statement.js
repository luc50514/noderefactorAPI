const { calcAmount } = require("./utils/Calculations.js");

function statement(invoice, plays) {
	let result = `Statement for ${invoice.customer}\n`;
	const format = formatAmount();
	let totalAmount = 0;
	let volumeCredits = 0;
	const calcObj = calculatePlayObjects(invoice.performances, plays);
	for (const perf of calcObj) {
		totalAmount = perf.totalAmount;
		volumeCredits = perf.volumeCredits;
		result += `${perf.playName}: ${format(perf.thisAmount)} (${perf.audience} seats)\n`;
	}

	result += `Amount owed is ${format(totalAmount)}\n`;
	result += `You earned ${volumeCredits} credits\n`;
	return result;
}

function statementHTML(invoice, plays) {
	let result = statement(invoice, plays);
	let resultHTML = "";
	let lines = result.split(/\r?\n|\r|\n/g);

	for (let i = 0; i < lines.length; i++) {
		if (i < lines.length - 2) {
			resultHTML += "<p>" + lines[i] + "</p>\n";
		} else if (i < lines.length - 1) {
			resultHTML += "<p>" + lines[i] + "</p>";
		}
	}

	return `<div>${resultHTML}</div>`;
}

function formatedStatements(invoice, plays) {
	return {
		html: statementHTML(invoice, plays),
		plainText: statement(invoice, plays),
	};
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

function calcVolumeCredits(perf, play) {
	let volumeCredits = 0;
	if ("comedy" === play.type) {
		volumeCredits += Math.floor(perf.audience / 5);
	}
	return (volumeCredits += Math.max(perf.audience - 30, 0));
}

function formatAmount() {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	}).format;
}
module.exports = { statement, calcAmount, calcVolumeCredits, calculatePlayObjects, statementHTML, formatedStatements };
