const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const request  = require('request');

transactionTemplate = [{ senderId: '122345',
 receiverId: '1',
 amount: '50',
 date: '2018-01-20T21:42:02.969Z',
 senderName: 'bob', 
 receiverName: 'alice' 
}];



function transactionsStringify(transactions, requestedUser) {
  let returnString = "";
  for (let i = 0; i < transactions.length; i++) {
    let curr = transactions[i];
    let dateString = curr.date.slice(0,10);
    returnString += curr.senderName + " sent $" + curr.amount + " to " 
    + curr.receiverName + " on " + dateString + "\n";
  }
  return returnString;  
};

/**
* /hello
*
*   Basic command that shows the user history
*   All Commands use this template, simply create additional files with
*   different names to add commands.
*
*   See https://api.slack.com/slash-commands for more details.
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/
module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {
  // request.get(`https://slack-pay-api.herokuapp.com/history?id=${text}`, (error, result)=> {
  //   if (error) {
  //     return callback(error)
  //   }

    let result = transactionTemplate;
    callback(null, {
      //text: `Hello, <@${user}>...\nYou said: ${text}`,
      //transactions = mongoDBgetTransactionsFunction(text?)
      text: `Below is the transaction history for user ${text}:\n` + transactionsStringify(result, text),
      attachments: [
        // You can customize your messages with attachments.
        // See https://api.slack.com/docs/message-attachments for more info.
      ]
    });
  // });
};