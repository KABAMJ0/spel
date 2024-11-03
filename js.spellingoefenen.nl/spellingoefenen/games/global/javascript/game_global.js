// *** Get Element
function ge(elementId)
{
	if(document.getElementById(elementId))
	{	
		return(document.getElementById(elementId));
	}
	else
	{
		console.warn("A div with id " + elementId + " could not be found!");
		return(false);
	}
}

function gec(elementId)
{
	if(document.getElementById(elementId))
	{	
		return(true);
	}
	else
	{
		return(false);
	}
}

// *** remove() a div
Element.prototype.remove = function()
{
	this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() 
{
	for(var i = this.length - 1; i >= 0; i--) 
	{
		if(this[i] && this[i].parentElement) { this[i].parentElement.removeChild(this[i]); }
	}
}


// *** Device checks and hacks
function deviceChecksPreInit()
{
	// *** Transfer portrait-specific specs to regular specs
	if(game["orientation"] == "portrait")
	{
		spot = transferPortraitSpecs(spot);
		keyboard = transferPortraitSpecs(keyboard);	
	}
	
	// *** Determine OS and device
	gameEngine["iOS"] = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;	
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) gameEngine["isIphone"] = true; else gameEngine["isIphone"] = false;
	ua = navigator.userAgent.toLowerCase(); 
	gameEngine["isAndroid"] = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
	gameEngine["isWindowsPhone"] = navigator.userAgent.match(/Windows Phone/i);
	if(!gameEngine["isWindowsPhone"]) gameEngine["isWindowsPhone"] = false;
	if(gameEngine["isWindowsPhone"]) { gameEngine["isAndroid"] = false; gameEngine["isIphone"] = false; }
	if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) gameEngine["isSmartphone"] = true; else gameEngine["isSmartphone"] = false;
	if(window.top == window.self) gameEngine["isTopWindow"] = true; else gameEngine["isTopWindow"] = false; 
	//isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

	if(navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) == null) gameEngine["isTabletSmartphone"] = false; else gameEngine["isTabletSmartphone"] = true;
	
	// *** Chromebook test
	var ua = window.navigator.userAgent;
	chromebook = ua.indexOf("CrOS");
	if(chromebook > 0) gameEngine["isTabletSmartphone"] = true;
		
	console.groupCollapsed("deviceChecksPreInit");
	console.log("iOS: " + gameEngine["iOS"]);
	console.log("isIphone: " + gameEngine["isIphone"]);
	console.log("isAndroid: " + gameEngine["isAndroid"]);
	console.log("isWindowsPhone: " + gameEngine["isWindowsPhone"]);
	console.log("isSmartphone: " + gameEngine["isSmartphone"]);
	console.log("isTopWindow: " + gameEngine["isTopWindow"] + " (width > 800 and height > 800 is treated as top window after bodyLoaded)");
	console.log("isTabletSmartphone: " + gameEngine["isTabletSmartphone"]);
	console.groupEnd();
	
	message = "";

	// *** Game needs to be in top window first
	if(gameEngine["isSmartphone"] && !gameEngine["isTopWindow"])
	{
		// gameEngine["globalAudioDisabled"] = true;
		// gameEngine["globalFullscreenDisabled"] = true;
	}
	else
	{	
		// *** Windows phone: no audio
		if(gameEngine["isWindowsPhone"])
		{
			gameEngine["globalAudio"] = false;
			gameEngine["globalAudioDisabled"] = true;
			message += "Voor prestatiedoeleinden, is geluid uitgeschakeld op Windows Phone.\n";
		}
		
		// *** Android tip
		// if(gameEngine["isAndroid"]) message += "Speel fullscreen voor een betere ervaring!\n";
	
		// *** iPhone tip: Add to homescreen for fullscreen
		if(gameEngine["iOS"])
		{
			// gameEngine["globalFullscreenDisabled"] = true;			
			//message += "Voeg het spel toe aan het startscherm en speel fullscreen!\n";
		}
	}

	
	//message += "Voor prestatiedoeleinden, is geluid uitgeschakeld op Windows Phone.\nSpeel fullscreen voor een betere ervaring!\nVoeg het spel toe aan het startscherm en speel fullscreen!\n";
	
	return(message);
}

function deviceChecksPostInit()
{
	gameEngine["globalFullscreen"] = checkFullscreen();
	
	// *** Scrolling for iPhones to scoll addressbars out of view (addressbars take up height)
	if(game["orientation"] == "landscape")
	{
		if(gameEngine["isIphone"])
		{
			if(window.navigator.standalone == true)
			{
				// *** Web app view on iPhone
			}
			else if(!gameEngine["isTopWindow"])
			{
				// *** Not yet in top window, so don't scale yet
			}
			else
			{
				// *** Browser view on iPhone
				if(game["orientation"] == "landscape")
				{				
					//percentage = 80;
					//console.log("iPhone downscaling percentage: " + percentage + " and vertical align applied");
					
					//ge("myCanvas").style.width = percentage + "%";					
					//ge("myCanvasTd").style.verticalAlign = "top";	
					
					//$('body,html').animate({"scrollTop": 0}, 100);		
					
					//document.documentElement.style.backgroundColor = "#FF0000";
		
					/*
					ge("scroll_phone").style.display = "table";			
					document.documentElement.style.overflow = "scroll";
					document.documentElement.style.paddingTop = "40px";					
					document.body.scrollTop = 0;
					*/
				}
			}
		}
	}	
}

function transferPortraitSpecs(thisArray)
{
	for(key in thisArray)
	{
		for(key2 in thisArray[key])
		{		
			if(key2.substr(key2.length - 8) == "Portrait")
			{
				//console.log("Transfering portrait sub-spec " + key + ">" + key2);
				newKey2 = key2.substr(0, key2.length - 8);				
				thisArray[key][newKey2] = thisArray[key][key2];				
			}	
		}
			
		if(key.substr(key.length - 8) == "Portrait")
		{
			//console.log("Transfering portrait spec " + key);
			newKey2 = key.substr(0, key.length - 8);				
			thisArray[newKey2] = thisArray[key];				
		}		
	}
	
	return(thisArray);
}

function checkFullscreen()
{
	return (document.fullScreenElement && document.fullScreenElement !== null) || document.mozFullScreen || document.webkitIsFullScreen;
}


function deviceChecksScrolling()
{
	if(gameEngine["isIphone"] && gameEngine["initDone"] && game["orientation"] == "landscape")
	{
		if(window.innerHeight > gameEngine["iPhoneMaxScroll"]) gameEngine["iPhoneMaxScroll"] = window.innerHeight;
		
		if(window.innerHeight < gameEngine["iPhoneMaxScroll"] && game["orientation"] == "landscape")
		{
			gameEngine["iPhoneScrollCheck"] = false;
			ge("scroll_phone").style.display = "table";
			ge("scroll_phone_icon").src = "images/ui/scroll_phone.gif";
			document.body.scrollTop = 0;
			gameEngine["iPhoneMaxScroll"]	= window.innerHeight;		
		}
		
		if(!gameEngine["iPhoneScrollCheck"])
		{
			//console.log("scrolling: " + document.body.scrollTop);
			ge("scroll_phone").style.display = "table";
			
			if(document.body.scrollTop >= 40 || document.documentElement.scrollTop >= 40)
			{
				ge("scroll_phone_icon").src = "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/ui/scroll_phone_peace.gif";
				//ge("scroll_phone").style.display = "none";

				document.body.scrollTop = 40;
				document.documentElement.scrollTop = 40;
		
				gameEngine["iPhoneScrollCheck"] = true; 
			
				setTimeout(function(){ hideMe("scroll_phone"); }, 1000);			
			}
		}
		else
		{
			document.body.scrollTop = 40;
			document.documentElement.scrollTop = 40;
			//ge("scroll_phone").style.display = "none";			
		}		
	}
}


function deviceCheckResize()
{
	console.log("deviceCheckResize");
	
	if(game["orientation"] == "portrait")
	{
		w = window.innerWidth;
		h = window.innerHeight;
			
		newW = w;
		newH = Math.floor((game["height"]/game["width"]) * w);

		if(newH > h)
		{
			newW *= (h/newH);
			newH = h;
		}
		
		newW = Math.ceil(newW);
		newH = Math.ceil(newH);
		
		ge("myCanvas").style.width = newW + "px";
		ge("myCanvas").style.height = newH + "px";

		//console.log("deviceCheckResize: (" + w + " x " + h + ") -> (" + newW + " x " + newH + "). Game: (" + game["width"] + ", " + game["height"] + ")");
		
		
	}
	
	gameEngine["globalFullscreen"] = checkFullscreen();
}



function toggleFullScreen()
{
	if(gameEngine["globalFullscreen"]) gameEngine["globalFullscreen"] = false; else gameEngine["globalFullscreen"] = true;
	
	var doc = window.document;
	var docEl = doc.documentElement;
	
	var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
	
	if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement)
	{
		requestFullScreen.call(docEl);
	}
	else
	{
		cancelFullScreen.call(doc);
	}
}


// *** Sound playback and buffering / preloading images
function playSound(thisSound, thisLoop)
{
	if(typeof thisLoop === "undefined") thisLoop = false;
	
	if(gameEngine["globalAudio"])
	{
		if(thisLoop) game["loopingMusic"] = thisSound;
	
		if(!gameEngine["userInteractionOccured"] && gameEngine["iOS"])
		{
			alert("Could not play sound because no user interaction has yet occured on iOS");
		}
		else
		{
			if(typeof manifest[thisSound] != 'undefined')
			{
				if(!window.AudioContext || gameEngine["audioNoBuffer"])
				{
					//console.log("IE playSound: " + thisSound);
					if(manifest[thisSound].currentTime) manifest[thisSound].currentTime = 0;

					if(thisLoop) manifest[thisSound].loop = true;
					
					manifest[thisSound].play();
					return(manifest[thisSound]);
				}
				else
				{
					var source = soundContext.createBufferSource();
					source.buffer = soudBufferList[manifest[thisSound]];
					source.connect(soundContext.destination);
					
					if(thisLoop) source.loop = true;
					
					source.start(0);
					
					return(source);
				}
			}
			else
			{
				console.log("playSound: " + thisSound + " undefined!");
			}
		}
	}
}


function stopSound(thisSound)
{
	if(thisSound != "" && typeof thisSound !== "undefined")
	{
		if(!window.AudioContext || gameEngine["audioNoBuffer"])
		{
			console.log("stopSound: pause");
			thisSound.pause();
			//thisSound.currentTime = 0;
		}
		else
		{
			console.log("stopSound: stop");
			thisSound.stop();
			
			thisSound.loop = false;
		}
	}
}

function resumeSound(thisSound)
{
	if(!window.AudioContext || gameEngine["audioNoBuffer"])
	{
		console.log("resumeSound: play");
		thisSound.play();
	}
	else
	{
		console.log("resumeSound: start");
		thisSound.start(0);
	}
}

function switchSound()
{	
	if(gameEngine["globalAudio"])
	{				
		gameEngine["globalAudio"] = false;
		
		if(game["music"] != "") stopSound(game["music"]);
		
	}
	else
	{		
		gameEngine["globalAudio"] = true;
		playSound("sword");
		
		//console.log(game["music"]);
		if(game["music"] != "" && typeof game["loopingMusic"] !== "undefined") game["music"] = playSound(game["loopingMusic"], true);
	}
	
	console.log("switchSound to " + gameEngine["globalAudio"]);	
}


function manifestSound(soundName, soundFile)
{
	gameEngine["manifestTotal"]++;
	
	if(!window.AudioContext || gameEngine["audioNoBuffer"])
	{
		manifest[soundName] = new Audio();
		manifest[soundName].src = soundFile;

		manifest[soundName].onloadeddata = function() // onloadeddata
		{
			gameEngine["manifestCount"]++;
			updatePreloader();
		}		
	}
	else
	{
		//console.log("Adding to buffer: " + soundName + " -> " + soundFile);
		manifest[soundName] = "BUFFER:" + soundFile;
	}
}

function manifestImage(imageName, imageFile)
{
	gameEngine["manifestTotal"]++;

	manifest[imageName] = new Image(); 
	manifest[imageName].src = imageFile;
	
	manifest[imageName].onload = function()
	{
		gameEngine["manifestCount"]++;
		//console.log(gameEngine["manifestCount"] + " / " + gameEngine["manifestTotal"] + " loaded");

		updatePreloader();
	}	
}

function finishedLoading(bufferList)
{
	soudBufferList = bufferList;
	
	thisSoundCount = 0;
	
	for(key in manifest)
	{
		if(manifest[key].toString().substr(0, 7) == "BUFFER:")
		{
			//console.log(key + ": " + thisSoundCount);
			manifest[key] = thisSoundCount;
			thisSoundCount++;
		}
	}
}

// *** Sound bufferloader class
function bufferSound()
{
	if(!window.AudioContext || gameEngine["audioNoBuffer"])
	{
		console.log("bufferSound: webAudioAPI is not supported by your browser (buffering not possible on IE / local)");
	}
	else
	{
		console.log("bufferSound: Buffering sound...");
			
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		soundContext = new AudioContext();
		
		tempSoundArray = new Array();
		
		for(key in manifest)
		{
			if(manifest[key].toString().substr(0, 7) == "BUFFER:")
			{
				source = manifest[key].toString().substr(7);
				tempSoundArray.push(source);
			}
		}
				
		soundBufferLoader = new BufferLoader(
		soundContext,
		tempSoundArray,
		finishedLoading
		);
		
		soundBufferLoader.load();	
	}
}

function BufferLoader(soundContext, urlList, callback)
{
	this.soundContext = soundContext;
	this.urlList = urlList;
	this.onload = callback;
	this.bufferList = new Array();
	this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) 
{
	// Load buffer asynchronously
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.responseType = "arraybuffer";
	
	var loader = this;
	
	request.onload = function()
	{
		// Asynchronously decode the audio file data in request.response
		//alert(gameEngine["manifestCount"] + " / " + gameEngine["manifestTotal"] + " loaded");
		
		loader.soundContext.decodeAudioData(
		
		request.response,
		
		function(buffer) 
		{
			if (!buffer) 
			{
				alert('error decoding file data: ' + url);
				return;
			}
			
			loader.bufferList[index] = buffer;
			
			if (++loader.loadCount == loader.urlList.length) loader.onload(loader.bufferList);
		
			gameEngine["manifestCount"]++;
			updatePreloader();		
		},
		
		function(error)
		{
			console.error('decodeAudioData error', error);
		}
		
		);
	
	}
	
	request.onerror = function()
	{
		alert('BufferLoader: XHR error');
	}
	
	request.send();
}

BufferLoader.prototype.load = function()
{
	for (var i = 0; i < this.urlList.length; ++i)
	{
		this.loadBuffer(this.urlList[i], i);
	}
}




// *** Start a potential drag in game (mouse position must move a certain distance before actual drag starts)
function startDrag(thisX, thisY)
{
	//console.log("----startDrag: " + thisX + ", " + thisY);

	if(!isNaN(thisX) && !isNaN(thisY) && thisX != 0 && thisY != 0)
	{
		thisX = scaleX(thisX);
		thisY = scaleY(thisY);
		
		//console.log("startDrag: " + thisX + ", " + thisY + " | " + game["draggingX"] + "," + game["draggingY"]);
		
		if(game["draggingX"] == 0 && game["draggingY"] == 0)
		{
			//console.log("startDrag: dragging anticipated at " + thisX + ", " + thisY);
			
			game["draggingX"] = thisX;
			game["draggingY"] = thisY;
			
			game["draggingCheck"] = true;
		}
	}	
}

function getMousePos(canvas, evt)
{
	var rect = canvas.getBoundingClientRect();

	if(evt.type == 'touchstart' || evt.type == 'touchmove' || evt.type == 'touchend' || evt.type == 'touchcancel')
	{
        	var touch = evt.touches[0] || evt.changedTouches[0];
        
		game["mouseX"] = touch.pageX - rect.left;
		game["mouseY"] = touch.pageY - rect.top - document.body.scrollTop;
		
		//console.log("TOUCH: touch.pageY:" + touch.pageY + " / scrollTop: " + document.body.scrollTop);
        }
        else
        {
		game["mouseX"] = evt.clientX - rect.left;
		game["mouseY"] = evt.clientY - rect.top - document.body.scrollTop;

		//console.log("EVT: evt.clientY:" + evt.clientY + " / scrollTop: " + document.body.scrollTop);
	}
	
	game["mouseX"] = scaleX(game["mouseX"]);
	game["mouseY"] = scaleY(game["mouseY"]);
	
	//console.log("getMousePos: " + Math.ceil(game["mouseX"]) + "," + Math.ceil(game["mouseY"]));

	if(game["draggingCheck"])
	{				
		snapArea = 10;
		
		if(game["mouseX"] > game["draggingX"] - snapArea && game["mouseX"] < game["draggingX"] + snapArea && game["mouseY"] > game["draggingY"] - snapArea && game["mouseY"] < game["draggingY"] + snapArea)
		{
			
		}
		else
		{
			//console.log("getMousePos: Drag snap area reached: " + game["mouseX"] + " / " + game["draggingX"]);
			
			drag(game["draggingX"], game["draggingY"]);
			game["draggingCheck"] = false;		
			game["dragging"] = true;
		}
	}
}

// *** Doubleclick in game (no use is preferable)
function doubleClick(thisX, thisY)
{
	thisX = scaleX(thisX);
	thisY = scaleY(thisY);
	
	console.log("doubleClick: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));

	// *** Game actions here

	endDrag();
}

function scaleX(x)
{
	scale = game["width"] / canvas.offsetWidth;
	x *= scale;
	return(x);
}

function scaleY(y)
{
	scale = game["height"] / canvas.offsetHeight;
	y *= scale;
	return(y);
}

function setPlay(thisPlay)
{
	gameEngine["play"] = thisPlay;
}

function dump(thisDump)
{
	console.log("DUMPING \"" + thisDump.toUpperCase() + "\":");
	
	if(thisDump == "spot")
	{
		for(key in spot)
		{
			console.log(key + ": " + spot[key].x + ", " + spot[key].y + " (rotation: " + spot[key].r + ")");
		}
	}	
}

function getParameterByName(name, url) 
{
	if (!url) url = window.location.href;
	url = url; // This is just to avoid case sensitiveness  
	name = name.replace(/[\[\]]/g, "\\$&");// This is just to avoid case sensitiveness for query parameter name
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function currency_noentities(amount)
{
	amount = currency(amount);
	amount = amount.split("&nbsp;").join(" ");
	amount = amount.split("&euro;").join("€");

	return(amount);
}

function setFramerate(thisFramerate)
{
	gameEngine["framerate"] = thisFramerate; // *** 40/1000 sec
	gameEngine["framerateRecalculations"] = Math.ceil(gameEngine["framerate"] / 40); // *** Hercalculaties per frame

	x_per_sec = (1000 / gameEngine["framerate"]) * 10; // *** 10 sec
	player_progressbar_speed = (1 / x_per_sec) * 100; // *** 100 procent
	
	//console.log("Animation speed: " + gameEngine["framerate"]);
}

function drawTextarea(tempText, tempSpot, tempX, tempY, tempAlt)
{
	tempText = "" + tempText;
	
	if(typeof tempY === "undefined") tempY = spot[tempSpot].y;

	// *** maxWidth
	if(typeof spot[tempSpot].maxWidth !== "undefined" && spot[tempSpot].maxWidth > 0)
	{
		context.font = spot[tempSpot].font;
		
		//tempText = spot[tempSpot].maxWidth + ":" + tempText;
		
		newTempText = "";
		tempWord = tempText.split(" ");
		tempTextline = "";
		tempTextlinePrev = "";
		
		for(i = 0; i < tempWord.length; i++)
		{
			
			tempTextlinePrev = tempTextline;
			tempTextline += tempWord[i] + " ";

			//console.log("- " + tempTextline + ": " + context.measureText(tempTextline).width);
			
			if(context.measureText(tempTextline).width > spot[tempSpot].maxWidth)
			{
				newTempText += tempTextlinePrev + "\n";				
				tempTextline = tempWord[i] + " ";
			}
		}
		
		newTempText += tempTextline;
		newTempText = newTempText.split(" \n").join("\n");
		
		tempText = newTempText;
	}
		
	tempTextline = tempText.split("\n");
	
	for(ii = 0; ii < tempTextline.length; ii++)
	{
		drawText(tempTextline[ii], tempSpot, tempX, tempY, tempAlt);
		tempY += spot[tempSpot].lineHeight;
	}
}

function drawText(tempText, tempSpot, tempX, tempY, tempAlt, tempMeasureText)
{
	context.save(); 

	if(typeof tempX === "undefined") tempX = spot[tempSpot].x;
	if(typeof tempY === "undefined") tempY = spot[tempSpot].y;
	if(typeof tempAlt === "undefined") tempAlt = false;
	if(typeof tempMeasureText === "undefined") tempMeasureText = false;
	
	if(typeof spot[tempSpot].font === "undefined") context.font = "Arial 18px";	else context.font = spot[tempSpot].font;

	if(typeof spot[tempSpot].maxWidth !== "undefined")
	{		
		while(context.measureText(tempText).width > spot[tempSpot].maxWidth)
		{			
			tempFont = context.font.split("px");
			tempSizeParts = tempFont[0].split(" ");
			tempSize = parseInt(tempSizeParts[tempSizeParts.length-1]);
			tempSize-=1;
			tempSizeParts[tempSizeParts.length-1] = tempSize;
			tempFont[0] = tempSizeParts.join(" ");
			context.font = tempFont.join("px");
			//console.log(context.font);
		}
	}
					
	if(typeof spot[tempSpot].textAlign === "undefined")
	{
		context.textAlign = "left";
	}
	else
	{
	
		if(spot[tempSpot].textAlign == "monocenter")
		{
			if(typeof spot[tempSpot].monocenterPaddingLeft === "undefined" || spot[tempSpot].monocenterStrlen != tempText.length)
			{
				spot[tempSpot].monocenterPaddingLeft = Math.ceil(context.measureText(tempText).width/2);
				spot[tempSpot].monocenterStrlen = tempText.length;
				
				//console.log("drawText monocenter recalculate: " + spot[tempSpot].monocenterPaddingLeft + " / " + spot[tempSpot].monocenterStrlen);
			}
			
			context.textAlign = "left";
			tempX -= spot[tempSpot].monocenterPaddingLeft;
		}
		else
		{
			context.textAlign = spot[tempSpot].textAlign;
		}
	}
	
	if(typeof spot[tempSpot].color === "undefined") context.fillStyle = "#FFFFFF"; 	else context.fillStyle = spot[tempSpot].color;
	if(tempAlt && typeof spot[tempSpot].colorAlt !== "undefined") context.fillStyle = spot[tempSpot].colorAlt;

	if(spot[tempSpot].shadow) applyShadow();
	
	if(tempMeasureText)
	{
		tempX = Math.round(context.measureText(tempText).width);
	}
	else
	{
		context.fillText(tempText, tempX, tempY);	
	}
	
	context.restore(); 
	
	return(tempX);
}

function drawImage(img, x, y, width, height, deg, flip, flop, center)
{
	if(typeof img === "undefined")
	{
		console.log("drawImage img not found! ");
	}
	else
	{
		context.save();
	
		if(width == true && typeof height === "undefined" && typeof deg === "undefined" && typeof flip === "undefined" && typeof flop === "undefined" && typeof center === "undefined")
		{
			// *** center is desired, a width was not given!
			width = img.width;
			height = img.height;
			deg = false;
			flip = false;
			flop = false;
			center = true;
		}
		
		
		//console.log("drawImage width:" + width);
		if(typeof width === "undefined" || width == true) width = img.width;
		if(typeof height === "undefined" || height == true) height = img.height;
		if(typeof deg === "undefined") deg = false;
		if(typeof flip === "undefined") flip = false;
		if(typeof flop === "undefined") flop = false;
		if(typeof center === "undefined") center = false;
	
		// Set rotation point to center of image, instead of top/left
		if(center)
		{
			x -= width/2;
			y -= height/2;
		}
		
		// Set the origin to the center of the image
		context.translate(x + width/2, y + height/2);
	
		if(deg != 0 && deg != true && deg != false)
		{		
			// Rotate the canvas around the origin
			var rad = 2 * Math.PI - deg * Math.PI / 180;	
			context.rotate(rad);
		}
			
		// Flip/flop the canvas
		if(flip) flipScale = -1; else flipScale = 1;
		if(flop) flopScale = -1; else flopScale = 1;
		if(flip || flop) context.scale(flipScale, flopScale);
		
		// Draw the image    
		context.drawImage(img, -width/2, -height/2, width, height);
		
		context.restore();
	}
}

function updatePreloader(thisBody)
{
	//console.log("updatePreloader: " + gameEngine["manifestCount"] + " / " + gameEngine["manifestTotal"] + " (" + gameEngine["preloadStarted"] + ")");
	
	if(gameEngine["preloadStarted"])
	{
		if(game["status"] == "PRELOAD")
		{

		}
		
		if(gameEngine["manifestCount"] >= gameEngine["manifestTotal"])
		{
			if(game["status"] == "PRELOAD_PRELOADER")
			{
				gameEngine["preloadPreloadManifestCount"] = gameEngine["manifestTotal"];

				showPlaybutton();
								
				setFramerate(gameEngine["framerate"]);
				animateAll();
				
				
			}
			else if(game["status"] == "PRELOAD")
			{	
				init();
			}
			
			gameEngine["preloadStarted"] = false;
		}
	}
}

function bodyLoaded()
{
	tempW = ge("myCanvas").getBoundingClientRect().width;
	tempH = ge("myCanvas").getBoundingClientRect().height;
	console.log("bodyLoaded (width: " + tempW + ", height: " + tempH + ") window.devicePixelRatio: " + window.devicePixelRatio);
	if((tempW >= 800 || tempH > 800) && window.devicePixelRatio == 1) gameEngine["isTopWindow"] = true;
	
	game["status"] = "PRELOAD_PRELOADER";					

	deviceCheckResize();	

	loadPreloadManifest();	
}

function startPreload()
{
	gameEngine["preloadStarted"] = true;
}

function ellipse(context, cx, cy, rx, ry, fillColor)
{
	context.save(); // save state
	context.beginPath();
	
	
	context.translate(cx-rx, cy-ry);
	context.scale(rx, ry);
	context.arc(1, 1, 1, 0, 2 * Math.PI, false);
	context.fillStyle = fillColor;
	context.fill();
	
	context.restore(); // restore to original state
	// context.stroke();
}

function hitO(thisX, thisY, thisO)
{
	if(thisX > o[thisO].x - manifest[o[thisO].manifest].width/2 && thisX < o[thisO].x + manifest[o[thisO].manifest].width/2 && thisY > o[thisO].y - manifest[o[thisO].manifest].height/2 && thisY < o[thisO].y + manifest[o[thisO].manifest].height/2) return(true); else return(false);
}

function hitTest(thisX, thisY, thisSpot, thisManifest)
{
	if(thisX >= spot[thisSpot].x && thisY >= spot[thisSpot].y && thisX <= spot[thisSpot].x + manifest[thisManifest].width && thisY <= spot[thisSpot].y + manifest[thisManifest].height) return(true); else return(false);
}

function hitSpot(thisX, thisY, thisSpot)
{
	if(thisX >= spot[thisSpot].x && thisY >= spot[thisSpot].y && thisX <= spot[thisSpot].x + spot[thisSpot].width && thisY <= spot[thisSpot].y + spot[thisSpot].height) return(true); else return(false);
}

function drawSpot(thisSpot)
{
	context.strokeStyle="red";
	context.rect(spot[thisSpot].x, spot[thisSpot].y, spot[thisSpot].width, spot[thisSpot].height);
	context.stroke();
}

function hoverSpot(thisSpot)
{	
	if(typeof spot[thisSpot].width  === "undefined") { thisWidth  = 10; console.warning("hoverSpot: Width of " + thisSpot + " not defined and as test set to 10px. Please define this value asap!"); } else thisWidth = spot[thisSpot].width;
	if(typeof spot[thisSpot].height === "undefined") { thisHeight = 10; console.warning("hoverSpot: Height of " + thisSpot + " not defined and as test set to 10px. Please define this value asap!"); } else thisHeight = spot[thisSpot].height;
	
	if(game["mouseX"] >= spot[thisSpot].x && game["mouseX"] < spot[thisSpot].x + thisWidth && game["mouseY"] > spot[thisSpot].y && game["mouseY"] < spot[thisSpot].y + thisHeight)
	{	
		return(true);
	}
	else
	{
		return(false);
	}
}

function drawButton(thisSpotKey, thisText, thisCustomButton)
{
	if(typeof thisCustomButton === "undefined") thisCustomButton = false;
	
	thisSpot = spot[thisSpotKey];
	if(!thisCustomButton) thisButtonImg = "button"; else thisButtonImg = thisCustomButton;

	context.save(); 
	
	context.textAlign = "center"; 	
	
	if(game["mouseX"] > thisSpot.x && game["mouseX"] < thisSpot.x + manifest[thisButtonImg].width && game["mouseY"] > thisSpot.y && game["mouseY"] < thisSpot.y + manifest[thisButtonImg].height)
	{
		// *** Hover
		if(typeof manifest[thisButtonImg + "_hover"] !== "undefined") thisButton = manifest[thisButtonImg + "_hover"]; else thisButton = manifest[thisButtonImg];

		drawImage(thisButton, thisSpot.x, thisSpot.y);

		context.font = spot["BUTTON"].fontHover;
		context.fillStyle = spot["BUTTON"].colorHover;
	
		if(spot["BUTTON"].shadowHover)
		{
			context.shadowColor = "#000000";
			context.shadowOffsetX = 1;
			context.shadowOffsetY = 1;
			context.shadowBlur = 5;
		}
		
		thisPaddingBottom = spot["BUTTON"].paddingBottomHover;
	}
	else
	{
		// *** Normal (non-hover)
		thisButton = manifest[thisButtonImg];
	
		drawImage(thisButton, thisSpot.x, thisSpot.y);
			
		context.font = spot["BUTTON"].font;
		context.fillStyle = spot["BUTTON"].color;
	
		if(spot["BUTTON"].shadow)
		{
			context.shadowColor = "#000000";
			context.shadowOffsetX = 1;
			context.shadowOffsetY = 1;
			context.shadowBlur = 5;
		}

		thisPaddingBottom = spot["BUTTON"].paddingBottom;
	}
	

	// *** Button text		
	if(thisText != "") context.fillText(thisText, thisSpot.x + manifest["button"].width / 2, thisSpot.y + manifest["button"].height - thisPaddingBottom);	
	
	context.restore(); 
}

// *** Converts seconds to a 0:00 format
function stopwatch(thisSeconds)
{
	var minutes = Math.floor(thisSeconds / 60);
	var seconds = thisSeconds - minutes * 60;
	
	if(seconds < 10) extraZero = "0"; else extraZero = "";
	
	timerShow = minutes + ":" + extraZero + seconds;
	
	return(timerShow);
}


function textMultipleLines(thisText, thisTextX, thisTextY, thisTextLineheight)
{
	temp = thisText.split("/");

	
	for(ii = 0; ii < temp.length; ii++)
	{
		context.fillText(temp[ii], thisTextX, thisTextY);
		thisTextY += thisTextLineheight;
	}
}


// *** Sha1 encryption
function sha1 (str)
{
  var hash
  try { var crypto = require('crypto'); var sha1sum = crypto.createHash('sha1'); sha1sum.update(str); hash = sha1sum.digest('hex'); } catch (e) { hash = undefined }
  if (hash !== undefined) { return hash }
  var _rotLeft = function (n, s) { var t4 = (n << s) | (n >>> (32 - s)); return t4 }
  var _cvtHex = function (val) { var str = ''; var i; var v; for (i = 7; i >= 0; i--) { v = (val >>> (i * 4)) & 0x0f; str += v.toString(16) } return str }
  var blockstart; var i, j; var W = new Array(80); var H0 = 0x67452301; var H1 = 0xEFCDAB89; var H2 = 0x98BADCFE; var H3 = 0x10325476; var H4 = 0xC3D2E1F0; var A, B, C, D, E; var temp;
  str = unescape(encodeURIComponent(str)); var strLen = str.length; var wordArray = []
  for (i = 0; i < strLen - 3; i += 4) { j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3); wordArray.push(j) }
  switch (strLen % 4) { case 0: i = 0x080000000; break
    case 1: i = str.charCodeAt(strLen - 1) << 24 | 0x0800000; break
    case 2: i = str.charCodeAt(strLen - 2) << 24 | str.charCodeAt(strLen - 1) << 16 | 0x08000; break
    case 3: i = str.charCodeAt(strLen - 3) << 24 | str.charCodeAt(strLen - 2) << 16 | str.charCodeAt(strLen - 1) << 8 | 0x80; break }
  wordArray.push(i)
  while ((wordArray.length % 16) !== 14) { wordArray.push(0) }
  wordArray.push(strLen >>> 29); wordArray.push((strLen << 3) & 0x0ffffffff)
  for (blockstart = 0; blockstart < wordArray.length; blockstart += 16) {
    for (i = 0; i < 16; i++) { W[i] = wordArray[blockstart + i] }
    for (i = 16; i <= 79; i++) { W[i] = _rotLeft(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1) }
    A = H0; B = H1; C = H2; D = H3; E = H4;
    for (i = 0; i <= 19; i++) { temp = (_rotLeft(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff; E = D; D = C; C = _rotLeft(B, 30); B = A; A = temp; }
    for (i = 20; i <= 39; i++) { temp = (_rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff; E = D; D = C; C = _rotLeft(B, 30); B = A; A = temp; }
    for (i = 40; i <= 59; i++) { temp = (_rotLeft(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff; E = D; D = C; C = _rotLeft(B, 30); B = A; A = temp; }
    for (i = 60; i <= 79; i++) { temp = (_rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff; E = D; D = C; C = _rotLeft(B, 30); B = A; A = temp; }
    H0 = (H0 + A) & 0x0ffffffff; H1 = (H1 + B) & 0x0ffffffff; H2 = (H2 + C) & 0x0ffffffff; H3 = (H3 + D) & 0x0ffffffff; H4 = (H4 + E) & 0x0ffffffff
  }
  temp = _cvtHex(H0) + _cvtHex(H1) + _cvtHex(H2) + _cvtHex(H3) + _cvtHex(H4)
  return temp.toLowerCase()
}

// *** jQuery show/hide/toggle
function hideMe(id) { $("#" + id).fadeOut(250); }
function showMe(id) { $("#" + id).fadeIn(250); }
function toggleMe(id) { $("#" + id).fadeToggle(250); }


function validateEmail(email)
{
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function logGamePlay(thisGamePlay)
{
	var currentdate = new Date();
	var datetime = currentdate.getFullYear() + "-" + (((currentdate.getMonth()+1) < 10)?"0":"") + (currentdate.getMonth()+1) + "-" + ((currentdate.getDate() < 10)?"0":"") + currentdate.getDate() + " " + currentdate.getHours() + ":" + ((currentdate.getMinutes() < 10)?"0":"") + currentdate.getMinutes() + ":" + ((currentdate.getSeconds() < 10)?"0":"") + currentdate.getSeconds();

	game["highscoreGamePlay"] += datetime + ": " + thisGamePlay + "\n";
	
	//console.log(game["highscoreGamePlay"]);
}

// *** Highscore related functions
function highscoreOpen()
{
	console.log("highscoreOpen");
	
	ge("submit_highscore_naam").value = game["highscoreName"];
	ge("submit_highscore_email").value = game["highscoreEmail"];
	if(game["highscoreAgreedTerms"] == 1) ge("submit_highscore_algemene_voorwaarden").checked = true; else ge("submit_highscore_algemene_voorwaarden").checked = false;
	if(game["highscoreNewsletter"] == 1) ge("submit_highscore_nieuwsbrief").checked = true; else ge("submit_highscore_nieuwsbrief").checked = false;
	
	showMe("popup_submit_highscore");
}


function highscoreSubmitForm()
{		
	game["highscoreAgreedTerms"] = 0;	
	if(document.getElementById("submit_highscore_algemene_voorwaarden")) { if(ge("submit_highscore_algemene_voorwaarden").checked) game["highscoreAgreedTerms"] = 1; }

	game["highscoreNewsletter"] = 0;	
	if(document.getElementById("submit_highscore_nieuwsbrief")) { if(ge("submit_highscore_nieuwsbrief").checked) game["highscoreNewsletter"] = 1; }

	game["highscoreName"] = ge("submit_highscore_naam").value;
	game["highscoreEmail"] = ge("submit_highscore_email").value;
	
	hideMe("popup_share");
	
	highscoreSubmit();
	
}

function highscoreSubmit()
{
	this_score = ajaxSanitize(game["score"]);
	game["highscoreName"] = ajaxSanitize(game["highscoreName"]);
	
	sha_js = sha1(this_score + "a" + gameEngine["shaPW"] + "bc" + game["highscoreName"]);
	
	setCookie("highscoreName", game["highscoreName"]);
	setCookie("highscoreEmail", game["highscoreEmail"]);
	setCookie("highscoreAgreedTerms", game["highscoreAgreedTerms"]);
	setCookie("highscoreNewsletter", game["highscoreNewsletter"]);

	console.log(document.getElementById("submit_highscore_extra_2"));
	
	extra1 = ""; if(typeof document.getElementById("submit_highscore_extra_1") !== "undefined") extra1 = ajaxSanitize(ge("submit_highscore_extra_1").value);
	extra2 = ""; if(typeof document.getElementById("submit_highscore_extra_2") !== "undefined") extra2 = ajaxSanitize(ge("submit_highscore_extra_2").value);
	extra3 = ""; if(typeof document.getElementById("submit_highscore_extra_3") !== "undefined") extra3 = ajaxSanitize(ge("submit_highscore_extra_3").value);
		
	ajaxUpdate("a=highscoreSubmit&name=" + game["highscoreName"] + "&email=" + ajaxSanitize(game["highscoreEmail"]) + "&agreed_terms=" + ajaxSanitize(game["highscoreAgreedTerms"]) + "&newsletter=" + ajaxSanitize(game["highscoreNewsletter"]) + "&score=" + this_score + "&sha=" + sha_js + "&extra_1=" + extra1 + "&extra_2=" + extra2 + "&extra_3=" + extra3 + "&game_play=" + ajaxSanitize(game["highscoreGamePlay"]));

	game["highscoreGamePlay"] = "";
	game["preHighscoreScreen"] = false;
	game["submitted"] = true; 
	
}

function ajaxSanitize(thisVal)
{
	if(typeof thisVal === "undefined")
	{
		return("");
	}
	else if(typeof thisVal !== "string")
	{
		return(thisVal);
	}
	else
	{
		console.log(thisVal);
		thisVal = thisVal.split("&").join("");
		thisVal = thisVal.split("?").join("");
		thisVal = thisVal.split("  ").join(" ");
		thisVal = thisVal.split("  ").join(" ");
		thisVal = thisVal.split("  ").join(" ");
		
		return(thisVal);
	}
}


function highscoreView()
{
	console.log("highscoreView: " + game["highscoreEmail"] + " / score: " + game["score"]);
	
	game["status"] = "HIGHSCORES";
	game["highscoreListBusy"] = true;
	
	//game["highscoreEmail"] = ""; game["score"] = 78;
	
	ajaxUpdate("a=highscoreView&email=" + game["highscoreEmail"] + "&score=" + game["score"] + "&highscore_list_size=" + game["highscoreListSize"] + "&highscore_list_scroll=" + game["highscoreListScroll"]); 
	
}

function ajaxReturn(data)
{
	var answer = $.parseJSON(data);
	
	console.log("ajaxReturn: " + answer["a"]);
	console.log(answer);
	
	if(answer["a"] == "highscoreView" && answer["status"] == "OK")
	{
		highscore_list = answer;
	}
	
	if(answer["a"] == "highscoreSubmit" && answer["status"] == "OK")
	{
		highscoreView();
	}


	if(answer["a"] == "getTaak" && answer["status"] == "OK")
	{
		console.log("ajaxReturn>getTaak");
		startWLTaakReturn(answer);
	}	
}

function highscoreScroll(thisDir)
{
	playSound("sword");
	
	if(thisDir == "TOP") game["highscoreListScroll"] = -10000;
	if(thisDir == "UP") game["highscoreListScroll"]--;
	if(thisDir == "USER") game["highscoreListScroll"] = 0;
	if(thisDir == "DOWN") game["highscoreListScroll"]++;
	if(thisDir == "BOTTOM") game["highscoreListScroll"] = 10000;
	
	console.log("highscoreScroll: " + thisDir + " (" + game["highscoreListScroll"] + ")");
	
	highscoreView();
}


// *** Ajax comm
function ajaxUpdate(dataString)
{
	console.log("ajaxUpdate: " + dataString);

	$.ajax({

		type: 'POST',
		data: dataString,
		url: gameEngine["ajaxComm"],
	
		success:function(data){ ajaxReturn(data); }
		
	});
}




function setCookie(cname, cvalue, exdays) {

	if(typeof exdays === "undefined") exdays = 30;
	
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


// *** Keyboard
function showKeyboard(thisView, thisForceViewing)
{
	if(typeof thisView === "undefined") thisView = "";
	if(typeof thisForceViewing === "undefined") thisForceViewing = false;
	
	if(!keyboard["forceHiding"] || thisForceViewing)
	{
		keyboard["view"] = thisView;
		keyboard["status"] = "show";
		keyboard["y"] = game["height"];
		
		keyboard["forceHiding"] = false;
	}
}

function hideKeyboard(thisForceHiding)
{
	if(typeof thisForceHiding === "undefined") thisForceHiding = false;
	if(thisForceHiding) keyboard["forceHiding"] = true;
	
	keyboard["status"] = "hide";	
}

function clickKeyboard(thisX, thisY)
{
	thisKey = "";
	
	for(key in keyboard["keys"])
	{
		if(thisX >= keyboard["keys"][key].actual_x && thisX <= keyboard["keys"][key].actual_x + keyboard["keys"][key].actual_w && thisY >= keyboard["keys"][key].actual_y && thisY <= keyboard["keys"][key].actual_y + keyboard["keys"][key].actual_h)
		{
			thisKey = key;
		}
	}	

	//console.log("clickKeyboard: " + thisX + ", " + thisY + ": " + thisKey);
	
	pressKeyboard(thisKey, true);
}

function pressKeyboard(thisKey, thisKeyClicked)
{
	if(typeof thisKeyClicked === "undefined") thisKeyClicked = false;

	if(thisKey == "CAPSLOCK")
	{
	
	}
	
	//console.log("pressKeyboard: " + thisKey + "");
	
	if(thisKey == "Shift" && !thisKeyClicked)
	{
		//console.log("pressKeyboard: " + thisKey + " on physical keyboard");
	}
	else
	{	
		//thisKey = thisKey.toUpperCase();
	
		if(thisKey.toUpperCase() == "BACKSPACE") { thisKey = "<<"; }
		if(thisKey.toUpperCase() == "ENTER") { thisKey = "OK"; }
		if(thisKey.toUpperCase() == "DEAD") { thisKey = "`"; }
		
		
		if(typeof keyboard["keys"][thisKey.toUpperCase()] === "undefined") 
		{
			console.log("pressKeyboard: key " + thisKey + " not visible on keyboard, so input skipped!");
		}
		else
		{
			if(keyboard["view"] == "" || keyboard["keys"][thisKey.toUpperCase()].type == "system" || keyboard["view"].indexOf(keyboard["keys"][thisKey.toUpperCase()].type) >= 0)
			{
				keyboard["keys"][thisKey.toUpperCase()].pushed = 1;
				
				if(thisKeyClicked && keyboard["keys"][thisKey.toUpperCase()].type == "letter")
				{
					if(keyboard["shift"]) thisKey = thisKey.toUpperCase(); else thisKey = thisKey.toLowerCase();
				}
				
				if(thisKeyClicked && keyboard["shift"] && thisKey != "SHIFT") keyboard["shift"] = false;
				
				keyboardKeyPressed(thisKey);
			}
			else
			{
				console.log("pressKeyboard: key " + thisKey + " not allowed (disabled by keyboard view)!");
			}
		}
	}
}


function drawKeyboard()
{
	context.save();
	
	if(keyboard["status"] == "show") tempDest = keyboard["yDest"];
	if(keyboard["status"] == "hide") tempDest = game["height"];

	if((keyboard["status"] == "show" || keyboard["status"] == "hide") && keyboard["y"] != tempDest)
	{	
		keyboard["y"] += (tempDest - keyboard["y"]) * 0.3;		
		if(keyboard["y"] > tempDest - 2 && keyboard["y"] < tempDest + 2) keyboard["y"] = tempDest;
	}
	
	if(keyboard["status"] == "hide" && keyboard["y"] == tempDest) keyboard["status"] = "hidden";
	
	context.globalAlpha = keyboard["opacity"];
	
	context.fillStyle = keyboard["backgroundcolor"];
	context.fillRect(keyboard["x"], keyboard["y"], keyboard["x"] + 1400, keyboard["y"] + 300);
	
	//context.globalAlpha = 1;

	context.lineWidth = 2;
	context.font = keyboard["font"];
	context.textAlign = "center"; 

	xInner = keyboard["x"] + keyboard["xInner"];
	yInner = keyboard["y"] + keyboard["yInner"];
	
	for(key in keyboard["keys"])
	{
		
		
		// *** Precalculate positions and dimensions
		tempX = keyboard["keys"][key].x * (keyboard["keyWidth"] + keyboard["keyPadding"]);
		tempY = keyboard["keys"][key].y * (keyboard["keyHeight"] + keyboard["keyPadding"]);
		
		tempWidth = keyboard["keyWidth"];		
		if(typeof keyboard["keys"][key].extraLength !== "undefined") tempWidth = (keyboard["keyWidth"] + keyboard["keyPadding"]) * keyboard["keys"][key].extraLength - keyboard["keyPadding"];

		// *** Add position and dimensions to keyboard array for future click detection
		keyboard["keys"][key].actual_x = xInner + tempX;
		keyboard["keys"][key].actual_y = yInner + tempY;
		keyboard["keys"][key].actual_w = tempWidth;
		keyboard["keys"][key].actual_h = keyboard["keyHeight"];		

		if(keyboard["view"] == "" || keyboard["keys"][key].type == "system" || keyboard["view"].indexOf(keyboard["keys"][key].type) >= 0)
		{
			if(game["mouseX"] >= keyboard["keys"][key].actual_x && game["mouseX"] <= keyboard["keys"][key].actual_x + keyboard["keys"][key].actual_w && game["mouseY"] >= keyboard["keys"][key].actual_y && game["mouseY"] <= keyboard["keys"][key].actual_y + keyboard["keys"][key].actual_h)
			{
				context.strokeStyle = keyboard["hovercolor"];
				context.fillStyle = keyboard["hovercolor"];		
			}
			else
			{		
				context.strokeStyle = keyboard["foregroundcolor"];
				context.fillStyle = keyboard["foregroundcolor"];		
			}
		}
		else
		{		
			context.strokeStyle = keyboard["disabledcolor"];
			context.fillStyle = keyboard["disabledcolor"];
		}
			
		if(keyboard["keys"][key].pushed > 0)
		{
			//context.globalAlpha = keyboard["keys"][key].pushed;
			keyboard["keys"][key].pushed -= 0.1;
			
			//context.fillRect(xInner + tempX, yInner + tempY, tempWidth, keyboard["keyHeight"]); 
		}
		
		/*
		if(typeof keyboard["keys"][key].opacity !== "undefined") context.globalAlpha = keyboard["keys"][key].opacity; else context.globalAlpha = 1;

		context.beginPath();
		context.rect(xInner + tempX, yInner + tempY, tempWidth, keyboard["keyHeight"]); 
		context.stroke();
		*/
		
		drawKey = key;
		
		if(typeof keyboard.shift !== "undefined")
		{	
			if(keyboard["keys"][key].type == "letter")
			{
				if(!keyboard.shift) drawKey = drawKey.toLowerCase(); else drawKey = drawKey.toUpperCase();
			}			
		}
		
		if(drawKey == "SHIFT") drawKey = "Shift";
		
		thisManifest = "keyboard_key";
		tempPushed = 0;
		
		if(keyboard["keys"][key].extraLength == 2) thisManifest = "keyboard_key_long";


		if(typeof keyboard["keys"][key].opacity !== "undefined" && keyboard["keys"][key].opacity != 1) thisManifest += "_alt";
		
		if(keyboard["keys"][key].pushed > 0)
		{
			thisManifest += "_pushed";
			tempPushed = 3;
		}
		
		context.globalAlpha = 1;
		drawImage(manifest[thisManifest], xInner + tempX, yInner + tempY);
				
		if(context.fillStyle == keyboard["hovercolor"]) drawImage(manifest[thisManifest.split("_pushed").join("").split("_alt").join("") + "_hover"], xInner + tempX, yInner + tempY); 
		
		context.fillText(drawKey, xInner + tempX + tempWidth / 2, yInner + tempY + keyboard["keyLineheight"] + tempPushed);

	}
		
	context.restore();
}



function myEventHandler(e)
{
	if (!e) e = window.event;
	
	if (e.stopPropagation) 
	{
		e.stopPropagation(); //IE9 & Other Browsers
	}
	else 
	{
		e.cancelBubble = true; //IE8 and Lower
	}
}

function toDegrees (angle) { return angle * (180 / Math.PI); }
function toRadians (angle) { return angle * (Math.PI / 180); }

function deleteAllO()
{
	for(key in o)
	{
		delete o[key];
	}
}

function checkOrientation()
{
	if(window.innerHeight > window.innerWidth) return("portrait"); else return("landscape");
}


function roundRect(x, y, width, height, radius, fill, stroke)
{
	if(typeof fill === 'undefined') fill = true;
	if(typeof stroke === 'undefined') stroke = false;
	if(typeof radius === 'undefined') radius = 5;
	if(typeof radius === 'number') { radius = {tl: radius, tr: radius, br: radius, bl: radius}; } else { var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0}; for (var side in defaultRadius) { radius[side] = radius[side] || defaultRadius[side]; } }
	
	context.beginPath();
	context.moveTo(x + radius.tl, y);
	context.lineTo(x + width - radius.tr, y);
	context.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	context.lineTo(x + width, y + height - radius.br);
	context.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
	context.lineTo(x + radius.bl, y + height);
	context.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	context.lineTo(x, y + radius.tl);
	context.quadraticCurveTo(x, y, x + radius.tl, y);
	context.closePath();
	
	if(fill) context.fill();
	if(stroke) context.stroke();
}
