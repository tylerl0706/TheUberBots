var newrelic = require('newrelic');  //require for pinging
var twit = require('twit');          //Twitter require

//Twitter Access
var twitter = new twit({
    consumer_key: 'Df9w73YbAhP3NFz1dVYDWIig9',
    consumer_secret: 'kjU5dWLkxhwNw6AtHP2gNHuPus67mCuOaI1j8SFmZVFm0hMWox',
    access_token: '2571622638-J4LLmwJMScRzaU8ztUakG92ZPS49i6FTqXgGQMJ',
    access_token_secret: 'KjOyamQSfW75fygc89EGrU1JBiZYqIuhplCOxy3Zu8vQ4'
});

/****************************************************/
/*                     WOLFRAM                      */
/****************************************************/

var wr = require('node-wolfram');   //Wolfram require
var wolfram = new wr('4QQH9G-K8A2R2WAL3');  //Wolfram Access

var wolframStr = ""; //String to be tweeted

//Twitter Steam for Wolfram
var wolframStream = twitter.stream('statuses/filter', {
    'track': '#UtilityBotsCompute'
});
//The Twitter Stream
wolframStream.on('tweet', function (tweet) {
    wolframStr = "" + tweet.text;
    var temp = "";
    for (var i = 0; i < wolframStr.length; i++) {
        if (wolframStr.charAt(i) === "#") break;
        temp = temp + wolframStr.charAt(i);
    }
    wolframStr = temp;
    console.log("before query " + wolframStr);
    Wolfram.query(wolframStr, function (err, result) {
        if (err)
            console.log(err);
        else {
            console.log("before store " + wolframStr);
            wolframStr = result.queryresult.pod[1].subpod[0].plaintext[0];
            console.log(wolframStr);
            wolframStr = wolframStr + " @" + tweet.user.screen_name;
            twit.post('statuses/update', {
                status: wolframStr
            }, function (err, data, response) {
                console.log(data);
            });

        }
    });
});

/****************************************************/
/*                                                  */
/****************************************************/