const { statement, statementHTML } = require("../statement.js");

function formatedStatements(invoice, plays) {
	return {
		html: statementHTML(invoice, plays),
		plainText: statement(invoice, plays),
	};
}

module.exports = { formatedStatements };
