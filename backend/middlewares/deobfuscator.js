const fetch = require('node-fetch');
const https = require('https');





async function deobfuscate(url){
    

    /*
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });
    const data = await fetch('https://' + url, {
        agent: httpsAgent
    });

    var html = await data.text();
    console.log(html);
    //var parser = new DOMParser();
	//var doc = parser.parseFromString(html, 'text/html');
    return html;
    */
}

module.exports = { deobfuscate };