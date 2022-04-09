chrome.storage.local.get(['data'], async result => {
	try {
		console.log(result.data.website_path);
    let response = await fetch(`http://localhost:3001/obfuscated/${result.data.website_path}`, {
	  method: 'POST',
	  headers: {
	    'Accept': 'application/json, text/plain, */*',
	    'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({cookie: 'cookie'})
	}); // Gets a promise

	console.log(response);
	document.open();
	document.write(await response.text());
	document.close();

  } catch (err) {
    console.log('Fetch error:' + err); // Error handling
  }
})

