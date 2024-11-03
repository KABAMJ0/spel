// *** GAME FLOW

// *** Show playbutton and afterwards the preload bar
function showPlaybutton()
{	
	game["status"] = "PLAYBUTTON";
	// addSunbeam(700, 350, 1, "BETWEEN");
}

// *** Show preload bar
function showPreloader()
{
	/*
	if(!gameEngine["isTopWindow"])
	{
		window.top.location = window.location.pathname + "?backbutton=1";
	}
	else 
	*/
	
	if(versionHTML != gameEngine["version"])
	{
		alert("Je hebt een verouderde versie (" + gameEngine["version"] + ") in je cache staan terwijl het spel aangeeft dat er een nieuwere is (" + versionHTML + "). Verwijder je cache of druk SHIFT+F5.");
	}
	else
	{
		// *** Android must be in fullscreen as navigation bars are too big
		if(gameEngine["isAndroid"] && gameEngine["isTopWindow"])
		{
			gameEngine["globalFullscreen"] = checkFullscreen(); // does not work in all browsers
			console.log("globalFullscreen: " + gameEngine["globalFullscreen"]);
			if(!gameEngine["globalFullscreen"]) toggleFullScreen();
		}
			
		showPreloaderProceed();
	}
}

function showPreloaderProceed()
{
	game["status"] = "PRELOAD";
	loadManifest();
}

// *** Show intro screen
function showIntro()
{
	deleteAllO();
	game["status"] = "INTRO";
	if(!gameEngine["iOS"]) showIntroProceed();
}

function showIntroProceed()
{	
	gameEngine["playButtonIntroMessage"] = false;
}

// *** Start game (start playing)
function startGame()
{
	console.log("--- startGame ---");
	console.log("klas_wachtwoord: " + klas_wachtwoord);
	console.log("taak: " + taak);
	console.log("leerling: " + leerling);
	console.log("taakNaam: " + taakNaam);
	
	/*
	completeWL = {
	
	0 : { question : "Alle mensen ... (vinden v.t.) dat de minister-president moest aftreden", answer : "vonden", done : false },
	1 : { question : "We ... (ontmoeten v.t.) gisteren de president.", answer : "ontmoetten", done : false },
	2 : { question : "De meester ... (wijzen v.t.) mij aan.", answer : "wees", done : false },
	3 : { question : "Pieter ... (snijden v.t.) het brood in stukken.", answer : "sneed", done : false },
	4 : { question : "Wij ... (bieden v.t.) iets meer geld voor het huis.", answer : "boden", done : false },
	5 : { question : "Die hond ... (bijten v.t.) in mijn been.", answer : "beet", done : false },
	6 : { question : "De man ... (binden v.t.) zijn paard aan een boom.", answer : "bond", done : false },
	7 : { question : "We ... (begraven v.t.) het konijn in onze tuin", answer : "begroeven", done : false },
	
	8 : { question : "Alle mensen ... (vinden v.t.) dat de minister-president moest aftreden", answer : "vonden", done : false },
	9 : { question : "We ... (ontmoeten v.t.) gisteren de president.", answer : "ontmoetten", done : false },
	10 : { question : "De meester ... (wijzen v.t.) mij aan.", answer : "wees", done : false },
	11 : { question : "Pieter ... (snijden v.t.) het brood in stukken.", answer : "sneed", done : false },
	12 : { question : "Wij ... (bieden v.t.) iets meer geld voor het huis.", answer : "boden", done : false },
	13 : { question : "Die hond ... (bijten v.t.) in mijn been.", answer : "beet", done : false },
	14 : { question : "De man ... (binden v.t.) zijn paard aan een boom.", answer : "bond", done : false },
	15 : { question : "We ... (begraven v.t.) het konijn in onze tuin", answer : "begroeven", done : false },

	16 : { question : "Alle mensen ... (vinden v.t.) dat de minister-president moest aftreden", answer : "vonden", done : false },
	17 : { question : "We ... (ontmoeten v.t.) gisteren de president.", answer : "ontmoetten", done : false },
		
	};
	*/
	
	// completeWL = "a,b"; // Alle mensen ... (vinden v.t.) dat de minister-president moest aftreden
		
	for(key in o) delete o[key];
	for(key in particle) delete particle[key];

	wlAjaxGet();
	
				
	//myGlitterbox = addGlitterbox(350, 250, 250, 150)
	//myGlittercircle = addGlittercircle(475, 325, 75);
	//if(!gameEngine["isTabletSmartphone"]) mySunbeam = addSunbeam(1200, 500, 0.5, "BEHIND");
}


// *** End game
function endGame()
{
	console.log("endGame");
	
	if(game["highscoreEmail"] != "")
	{
		highscoreSubmit();	
	}
	else
	{
		highscoreView();
	}
}

function turtleRun()
{
	game["turtleStatus"] = "RUN";
	game["turtleCount"] = 1;
	game["turtleCountFrame"] = 0;
	
}

function checkAnswer(thisAnswer)
{
	

	thisAnswer = thisAnswer.trim();
	thisAnswer = thisAnswer.toLowerCase();
	delete o[game["sentenceGlitterBox"]];
	
	if(game["statusAni"] != "COLLECTABLE" && game["statusAni"] != "COLLECTABLE_WAIT" && game["statusAni"] != "RESULT")
	{
		console.log("checkAnswer: " + game["wl"]);
		console.log(game["answer"]);
		
		game["answer"][game["round"]][game["question"]].answer = thisAnswer;
		game["answer"][game["round"]][game["question"]].correctAnswer = wl[game["wl"]].answer;
		
		
		if(thisAnswer == wl[game["wl"]].answer)
		{
			console.log("checkAnswer: Correct!");
			playSound("start_game");
			
			if(game["try"] > 0) game["answer"][game["round"]][game["question"]].correct = 3; else game["answer"][game["round"]][game["question"]].correct = 1;
			
			for(i = 1; i <= 40; i++) addParticle(9, spot["PROGRESS"].x + (game["question"]-1)*90 + Math.random()*38 + 20, spot["PROGRESS"].y + Math.random()*38, "BEHIND_TURTLE");
	
			nextQuestion();
		}
		else
		{
			playSound("wrong");
			
			if(game["question"] != 0 && klas_wachtwoord != "")//Toegevoegd door Frank om te voorkomen dat leerligen herladen bij een fout en opnieuw kunnen proberen.
			{
				ajaxUpdate("a=progressTaak&klas_wachtwoord=" + klas_wachtwoord + "&taak=" + taak + "&leerling=" + leerling + "&voortgang=" + (game["wl"]+2) + "&woord=" + wl[game["wl"]].answer + "&poging_1=" + game["answer"][game["round"]][game["question"]].answer + "&poging_2=" + wl[game["wl"]].cat + "&poging_3=" + ((game["round"]-1)*15 + game["question"]) + "");
			} 

			for(i = 1; i <= 40; i++) addParticle(2, spot["PROGRESS"].x + (game["question"]-1)*90 + Math.random()*38 + 20, spot["PROGRESS"].y + Math.random()*38, "BEHIND_TURTLE");

			// *** Red progress
			game["answer"][game["round"]][game["question"]].correct = 2;
			
			game["FeedbackText"]= FeedbackText();
			
			game["statusAni"] = "EXPLANATION";
			game["count"] = 0;
			
			if(keyboard["status"] == "show")
			{
				game["reshowKeyboard"] = true;
				hideKeyboard();
			}
			
		}
	}
}

function FeedbackText()
{
	
if(game["wordTyped"]=="collect"){game["collectable"]+=8;}


var FeedbackText = "";
	
if (wl[game["wl"]].cat=="1000000000"){FeedbackText = "Deze zin staat in de; tegenwoordige tijd; en het onderwerp = ;ik.;Je gebruikt dus de ;ik-vorm; van het werkwoord."}
if (wl[game["wl"]].cat=="1000000000" && game["wordTyped"].slice(-2)=="dt") {FeedbackText = "Het onderwerp = ;ik ; Dan gebruik je de ;ik-vorm; en niet de ;@ik-vorm + t"}
if (wl[game["wl"]].cat=="1000000000" && game["wordTyped"].slice(-1)=="v" && wl[game["wl"]].answer.slice(-1)=="f") {FeedbackText = "Je gebruikt hier de ;ik-vorm.;Die eindigt nooit op een ;@v.;De ;@v; wordt een ;f"}
if (wl[game["wl"]].cat=="1000000000" && game["wordTyped"].slice(-1)=="z" && wl[game["wl"]].answer.slice(-1)=="s") {FeedbackText = "Je gebruikt hier de ;ik-vorm.;Die eindigt nooit op een ;@z.;De ;@z; wordt een ;s"}
if (wl[game["wl"]].cat=="1000000000" && game["wordTyped"].slice(-1)=="t" && wl[game["wl"]].answer.slice(-1)=="d") {FeedbackText = "Je gebruikt hier de ;ik-vorm. ;Aan het ;hele werkwoord ;kun je zien of de laatste letter een ;d; of ;@t; moet zijn."}
if (wl[game["wl"]].cat=="1000000000" && game["wordTyped"].slice(-1)=="d" && wl[game["wl"]].answer.slice(-1)=="t") {FeedbackText = "Je gebruikt hier de ;ik-vorm. ;Aan het ;hele werkwoord ;kun je zien of de laatste letter een ;@d; of ;t; moet zijn."}
	
if (wl[game["wl"]].cat=="0010000000") {FeedbackText = "Deze zin staat in de; tegenwoordige tijd; en het onderwerp is iemand ;anders dan ik.;Je gebruikt dan de ;ik-vorm + t.;De ik-vorm is hier: ;"+wl[game["wl"]].answer.slice(0, -1)+";, met een ;t; erachter is dit ;" + wl[game["wl"]].answer; }
if (wl[game["wl"]].cat=="0010000000" && wl[game["wl"]].answer.slice(-2)=="en") {FeedbackText = "Deze zin staat in de; tegenwoordige tijd; en het onderwerp is iemand ;anders dan ik.;Daarbij is het ook ;meervoud;, je gebruikt dan het ;hele werkwoord.;"}
	
if (wl[game["wl"]].cat=="0100000000" && wl[game["wl"]].question.includes("je")){FeedbackText = "Direct na de persoonsvorm staat het woord ;je.;Je kunt hier ook ;jij; voor in de plaats invullen, je gebruikt dan de ;ik-vorm; " }
if (wl[game["wl"]].cat=="0100000000" && wl[game["wl"]].question.includes("jij")){FeedbackText = "Direct na de persoonsvorm staat het woord ;jij.;Je gebruikt dan de ;ik-vorm; " }
if (wl[game["wl"]].cat=="0100000000" && wl[game["wl"]].answer.slice(-2)=="dt"){FeedbackText = "Direct na de persoonsvorm staat het woord ;je.;Je kunt deze alleen ;@niet veranderen in jij;, daarom gebruik je toch gewoon ;ik-vorm + t" }
	
	
if (wl[game["wl"]].cat=="0001000000"){FeedbackText = "Deze zin staat in de ;gebiedende wijs;, je gebruikt dan de ;ik-vorm"}

if (wl[game["wl"]].cat=="0000100000"){FeedbackText = "Deze zin staat in de ;verleden tijd; en dit is een ;sterk werkwoord.;Hij ;verandert van klank; in de verleden tijd. Je gebruikt dan alleen de gewone spellingregels!"}
	
if (wl[game["wl"]].cat=="0000010000"){FeedbackText = "Deze zin staat in de ;verleden tijd; en dit is een ;sterk werkwoord.;Hij ;verandert van klank; in de verleden tijd. Je gebruikt dan alleen de gewone spellingregels!"}

if (wl[game["wl"]].cat=="0000001000"){FeedbackText = "Deze zin staat in de ;verleden tijd; en dit is een ;zwak werkwoord;.(geen klankverandering) Je neemt dan de ;ik-vorm; en daar plak je ;de; of ;te; achter, de ik-vorm is hier: ;"+wl[game["wl"]].answer.slice(0, -2)+"; met; " + wl[game["wl"]].answer.slice(-2) +" ;erachter is dit; " +  wl[game["wl"]].answer }

if (wl[game["wl"]].cat=="0000001000" && wl[game["wl"]].answer.split("d").join("t") == game["wordTyped"]||wl[game["wl"]].cat=="0000001000" && wl[game["wl"]].answer.split("t").join("d") == game["wordTyped"]){FeedbackText = "Om deze foute te voorkomen kun je ;'t X-KoFSCHiP; gebruiken, je neemt het ;hele werkwoord.; Dat is hier: ;"+ wl[game["wl"]].question.split('(').pop().split(')')[0].slice(0, -5) +"; Dan haal je ;en; er vanaf dan heb je dus: ;"+ wl[game["wl"]].question.split('(').pop().split(')')[0].slice(0, -7) + ".; Zit de laatste letter in de medeklinkers van 't X-KoFSCHiP? Dan gebruikt je ;te;, anders gebruik je ;de"}
	
if (wl[game["wl"]].cat=="0000001000" && wl[game["wl"]].answer + "n" == game["wordTyped"]){FeedbackText = "Deze zin staat het in ;enkelvoud; en niet in het ;@meervoud.;Het onderwerp van de zin is maar ;1 persoon/ dier/ ding" }
	
if (wl[game["wl"]].cat=="0000001000" &&  game["wordTyped"].slice(-3)=="dte" && wl[game["wl"]].answer.slice(-3)=="dde"){FeedbackText = "Wanner de ;ik-vorm; eindigt met een ;d; komt er altijd ;de; achter de ik-vorm en geen ;@ te" }
if (wl[game["wl"]].cat=="0000001000" &&  game["wordTyped"].slice(-3)=="tde" && wl[game["wl"]].answer.slice(-3)=="ttee"){FeedbackText = "Wanner de ;ik-vorm; eindigt met een ;t; komt er altijd ;te; achter de ik-vorm en geen ;@ de" }
	
if (wl[game["wl"]].cat=="0000001000" && wl[game["wl"]].answer + "n" == game["wordTyped"]){FeedbackText = "Deze zin staat het in ;enkelvoud; en niet in het ;@meervoud.;Het onderwerp van de zin is maar ;1 persoon/ dier/ ding" }	

if (wl[game["wl"]].cat=="0000000100"){FeedbackText = "Deze zin staat in de ;verleden tijd; en dit is een ;zwak werkwoord;.(geen klankverandering) Je neemt dan de ;ik-vorm; en daar plak je ;den; of ;ten; achter, de ik-vorm is hier: ;"+wl[game["wl"]].answer.slice(0, -3)+"; met; " + wl[game["wl"]].answer.slice(-3) +" ;erachter is dit; " +  wl[game["wl"]].answer }
	
if (wl[game["wl"]].cat=="0000000100" && wl[game["wl"]].answer.split("d").join("t") == game["wordTyped"]||wl[game["wl"]].cat=="0000000100" && wl[game["wl"]].answer.split("t").join("d") == game["wordTyped"]){FeedbackText = "Om deze foute te voorkomen kun je ;'t X-KoFSCHiP; gebruiken, je neemt het ;hele werkwoord.; Dat is hier: ;"+ wl[game["wl"]].question.split('(').pop().split(')')[0].slice(0, -5) +"; Dan haal je ;en; er vanaf dan heb je dus: ;"+ wl[game["wl"]].question.split('(').pop().split(')')[0].slice(0, -7) + ".; Zit de laatste letter in de medeklinkers van 't X-KoFSCHiP? Dan gebruikt je ;ten;, anders gebruik je ;den"}

if (wl[game["wl"]].cat=="0000000100" && wl[game["wl"]].answer.slice(0, -1) == game["wordTyped"]){FeedbackText = "Deze zin staat het in ;meervoud; en niet in het ;@enkelvoud.;Het onderwerp van de zin zijn ;meerdere personen/ dieren/ dingen" }

if (wl[game["wl"]].cat=="0000000010"){FeedbackText = "Dit is geen ;@persoonsvorm; maar een ;voltooid deelwoord.;Je gebruikt bij een voltooid deelwoord de ;gewone spellingregels." }
	
if (wl[game["wl"]].cat=="0000000010" && wl[game["wl"]].answer.slice(-1)=="d"||wl[game["wl"]].cat=="0000000010" && wl[game["wl"]].answer.slice(-1)=="t"){FeedbackText = "Dit is geen ;@persoonsvorm; maar een ;voltooid deelwoord.;Als je twijfelt tussen een ;d; en een ;t; aan het eind maak je het woord langer, dan hoor je de ;d; of ;t." }

if (wl[game["wl"]].cat=="0000000001"){FeedbackText = "Dit is geen ;@persoonsvorm; maar een ;bijvoeglijk gebruikt voltooid deelwoord.;Als je twijfelt tussen een ;d; en een ;t; aan het eind maak je het woord langer, dan hoor je de ;d; of ;t.;Verder gebruik je de ;gewone spellingregels;, en ;zo kort mogelijk" }
	
	
return(FeedbackText)	
	
	
}

function nextQuestion(thisFast)
{
	if(typeof thisFast === "undefined") thisFast = false;
	
	console.log("nextQuestion: " + game["question"] + " / " + game["wl"] + " done");
	
	if(game["question"] != 0 && klas_wachtwoord != "")
	{
		if(!thisFast) ajaxUpdate("a=progressTaak&klas_wachtwoord=" + klas_wachtwoord + "&taak=" + taak + "&leerling=" + leerling + "&voortgang=" + (game["wl"]+2) + "&woord=" + wl[game["wl"]].answer + "&poging_1=" + game["answer"][game["round"]][game["question"]].answer + "&poging_2=" + wl[game["wl"]].cat + "&poging_3=" + ((game["round"]-1)*15 + game["question"]) + ""); 
	} 
		
	game["statusAni"] = "";
	
	if(game["question"] >= game["questions"])
	{
		//if(game["collectable"] == 10){game["collectable"] = 1;}
		console.log ("Game Collectable is nu:" + game["collectable"]);
		
		console.log("Next round");
		if(!thisFast) playSound("whoop");
		if(!thisFast) playSound("bottle");
		
		delete o[game["sentenceGlitterBox"]];
		
		game["count"] = 0;
		game["statusAni"] = "COLLECTABLE";
		game["collectableX"] = spot["PROGRESS"].x + (game["questions"]-1)*90 + 40;
		game["collectableY"] = spot["PROGRESS"].y + 12;

		game["collectableYjump"] = 0;
		game["collectableYjumpGravity"] = -60+3;
		
		game["collectableXspeed"] = (spot["COLLECTABLE_" + game["collectable"]].x - game["collectableX"]) / 20;
		game["collectableYspeed"] = (spot["COLLECTABLE_" + game["collectable"]].y - game["collectableY"]) / 20;
		
		if(thisFast)
		{
			game["collectable"]++;
			
			wlNextRound();
		}
	}
	else
	{
		if(game["reshowKeyboard"])
		{
			showKeyboard();
			game["reshowKeyboard"] = false;
		}
		
		game["question"]++;
		game["try"] = 0;
		
		wlGet();
		
		wl[game["wl"]].question = wl[game["wl"]].question.split("@").join("'");
		
		
		tempLength = drawText(wl[game["wl"]].question, "SENTENCE", 700, 150, false, true);
		
		if (tempLength>1250){ spot["SENTENCE"].font = "bold 32px Arial";};
		
		tempLength = drawText(wl[game["wl"]].question, "SENTENCE", 700, 150, false, true);
		
		
		delete o[game["sentenceGlitterBox"]];
		game["sentenceGlitterBox"] = addGlitterbox(spot["SENTENCE"].x - tempLength/2 - 30, spot["SENTENCE"].y - 50, tempLength + 60, 75);
		
		if(game["turtleStatus"] == "RUN") game["turtleX"] += 90;
		
		turtleRun();
	}
}

function showScore()
{
	game["statusAni"] = "SCORE";
	playSound("start_game");
	
	tempCorrect = 0;
	tempTotal = 0;
	
	for(i = 1; i <= game["answer"][game["round"]].questions; i++)
	{
		tempTotal++;
		if(game["answer"][game["round"]][i].correct == 1) tempCorrect++;
	}
	
	tempCorrect = tempCorrect+((tempTotal-tempCorrect)/3)
	console.log("Correct:" + tempCorrect+"FDSFSDFSFD"+(tempTotal-tempCorrect)/2);
	game["answer"][game["round"]].score = Math.round((tempCorrect / tempTotal)*100)/10;
	
	if(game["answer"][game["round"]].score >= 10) playSound("woohoo");
	if(game["answer"][game["round"]].score <= 5) playSound("oops");
}


// *** Click in game
function click(thisX, thisY, scale)
{
	gameEngine["userInteractionOccured"] = true;
	
	if(!game["dragging"])
	{
		if(typeof scale === "undefined") scale = true;
		if(scale) { thisX = scaleX(thisX); thisY = scaleY(thisY); }
			
		console.log("click: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
		// logGamePlay("click: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));

		if(hitSpot(thisX, thisY, "CLOSE_ICON")) { if(confirm("Wil je het spel verlaten en terugkeren naar Spellingoefenen.nl?")) top.location = "https://www.spellingoefenen.nl/spelletjes.html"; }
		else if(!gameEngine["globalFullscreenDisabled"] && hitSpot(thisX, thisY, "FULLSCREEN_ICON")) toggleFullScreen();
		else if(!gameEngine["globalAudioDisabled"] && hitSpot(thisX, thisY, "SOUND_ICON")) switchSound();
		else if(hitSpot(thisX, thisY, "KEYBOARD_ICON") && game["status"] != "PLAYBUTTON") { if(keyboard["status"] == "hidden") showKeyboard("", true); else hideKeyboard(true); }		
		else if(hitSpot(thisX, thisY, "MAIN_MENU_ICON") && game["status"] != "PLAYBUTTON" && klas_wachtwoord == "") { if(confirm("Wil je terugkeren naar het selectie menu?")) { game["status"] = "PLAYBUTTON"; stopSound(game["music"]); delete o[game["sentenceGlitterBox"]]; }}
		else if(keyboard["status"] == "show" && thisY > keyboard["yDest"]) clickKeyboard(thisX, thisY);		
		else if(game["status"] == "PLAYBUTTON")
		{
			if(((hitTest(thisX, thisY, "INTRO_PLAYBUTTON", "button") && klas_wachtwoord == "") || (hitTest(thisX, thisY, "INTRO_PLAYBUTTON_2", "button") && klas_wachtwoord != "")) && gameEngine["playButtonStatus"] == "PLAY") wlCheckSelection(); 
			
			else if(hitSpot(thisX, thisY, "INTRO_CHECKBOX_1") && klas_wachtwoord == "") wlToggleCheckbox(1);
			else if(hitSpot(thisX, thisY, "INTRO_CHECKBOX_2") && klas_wachtwoord == "") wlToggleCheckbox(2);
			else if(hitSpot(thisX, thisY, "INTRO_CHECKBOX_3") && klas_wachtwoord == "") wlToggleCheckbox(3);
			else if(hitSpot(thisX, thisY, "INTRO_CHECKBOX_4") && klas_wachtwoord == "") wlToggleCheckbox(4);
			else if(hitSpot(thisX, thisY, "INTRO_CHECKBOX_5") && klas_wachtwoord == "") wlToggleCheckbox(5);
			else if(hitSpot(thisX, thisY, "INTRO_CHECKBOX_6") && klas_wachtwoord == "") wlToggleCheckbox(6);
			else if(hitSpot(thisX, thisY, "INTRO_CHECKBOX_7") && klas_wachtwoord == "") wlToggleCheckbox(7);
			else if(hitSpot(thisX, thisY, "INTRO_CHECKBOX_8") && klas_wachtwoord == "") wlToggleCheckbox(8);
			else if(hitSpot(thisX, thisY, "INTRO_CHECKBOX_9") && klas_wachtwoord == "") wlToggleCheckbox(9);
			else if(hitSpot(thisX, thisY, "INTRO_CHECKBOX_10") && klas_wachtwoord == "") wlToggleCheckbox(10);
			else if(hitSpot(thisX, thisY, "INTRO_CHECKBOX_11") && klas_wachtwoord == "") wlToggleCheckbox(11);
		}
		else if(game["status"] == "INTRO")
		{
			if(hitTest(thisX, thisY, "INTRO_IOS_BUTTON", "button") && gameEngine["playButtonIntroMessage"]) showIntroProceed();
			else if(hitTest(thisX, thisY, "INTRO_PLAY_BUTTON", "button")) startGame();
			else if(hitTest(thisX, thisY, "INTRO_HIGHSCORE_BUTTON", "button")) endGame();
		}			
		else if(game["status"] == "")
		{
			if(game["statusAni"] == "EXPLANATION")
			{
				if(hitTest(thisX, thisY, "EXPLANATION_BUTTON", "button")) { playSound("start_game"); nextQuestion(true); }
			}		
			else if(game["statusAni"] == "RESULT")
			{
				if(hitTest(thisX, thisY, "RESULT_BUTTON", "button")) showScore();
			}
			else if(game["statusAni"] == "SCORE")
			{
				if(hitTest(thisX, thisY, "SCORE_BUTTON", "button")) { playSound("start_game"); wlNextRound(); }
			}
			
		}
		else if(game["status"] == "HIGHSCORES")
		{
			if(hitTest(thisX, thisY, "HIGHSCORE_SUBMIT", "button")) { if(game["score"] > 0) highscoreOpen(); }
			else if(hitTest(thisX, thisY, "HIGHSCORE_PLAY", "button")) { document.location = document.location; /* startGame(); */ }
			else if(hitSpot(thisX, thisY, "HIGHSCORE_SCROLL_TOP")) highscoreScroll("TOP");
			else if(hitSpot(thisX, thisY, "HIGHSCORE_SCROLL_UP")) highscoreScroll("UP");
			else if(hitSpot(thisX, thisY, "HIGHSCORE_SCROLL_USER")) highscoreScroll("USER");
			else if(hitSpot(thisX, thisY, "HIGHSCORE_SCROLL_DOWN")) highscoreScroll("DOWN");
			else if(hitSpot(thisX, thisY, "HIGHSCORE_SCROLL_BOTTOM")) highscoreScroll("BOTTOM");
		}		
	}
				
	endDrag();			
}

// *** Dragging starts
function drag(thisX, thisY)
{
	console.log("drag: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
}

// *** Dragging ends
function endDrag()
{
	gameEngine["userInteractionOccured"] = true;
	
	thisX = game["mouseX"];
	thisY = game["mouseY"];
		
	if(game["dragging"])
	{
		// *** At the end of a drag invoce a click (when playing an intended click can accidentally easily become a short drag)
		console.log("endDrag results in click: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
		game["dragging"] = false;
		click(thisX, thisY, false);
	}

	game["draggingX"] = 0;
	game["draggingY"] = 0;
	game["dragging"] = false;
	game["draggingCheck"] = false;
}


// *** (custom) Keyboard key pressed
function keyboardKeyPressed(thisKey)
{
	
    if(game["statusAni"] != "EXPLANATION")
    {
        delete o[game["sentenceGlitterBox"]];

        if(thisKey == "<<")
        {
            game["wordTyped"] = game["wordTyped"].substr(0, game["wordTyped"].length-1);
        }
        else if(thisKey == "SHIFT")
        {
            if(keyboard.shift) keyboard.shift = false; else keyboard.shift = true;
        }	
        else if(thisKey == "OK")
        {
            if(game["status"] == "" && game["statusAni"] == "")
            {
                if(game["wordTyped"] == "")
                {
                    if(keyboard["status"] == "hidden" || keyboard["status"] == "hide") showKeyboard(); else hideKeyboard();
                }
                else
                {
                    console.log("keyboardKeyPressed checkAnswer");
                    checkAnswer(game["wordTyped"]);
                }			
            }
            else hideKeyboard();
        }		
        else
        {
            game["wordTyped"] += thisKey;
        }

        console.log("keyboardKeyPressed \"" + thisKey + "\": " + game["wordTyped"]);
    }
}

function keyPress(e)
{
	e = e || window.event;
	
	if(game["statusAni"] == "RESULT" && e.keyCode == '13') showScore();
	else if(game["statusAni"] == "SCORE" && e.keyCode == '13') { playSound("start_game"); wlNextRound(); }
	else if(game["statusAni"] == "EXPLANATION" && e.keyCode == '13') { playSound("start_game"); nextQuestion(true); }
	else pressKeyboard(e.key);
	
	/*
	if(keyboard["status"] != "hidden")
	{
		pressKeyboard(e.key);
	}
	else
	{		
		if 	(e.keyCode == '38' || e.keyCode == '87') 	{ console.log("keyPress UP"); }
		else if (e.keyCode == '40' || e.keyCode == '83') 	{ console.log("keyPress DOWN"); }
		else if (e.keyCode == '37' || e.keyCode == '65') 	{ console.log("keyPress LEFT"); }
		else if (e.keyCode == '39' || e.keyCode == '68') 	{ console.log("keyPress RIGHT"); }
		else if (e.keyCode == '13') 				{ console.log("keyPress ENTER"); }
	}
	*/
}

// *** Answer returns from AJAX request
function ajaxReturn(data)
{
	var answer = $.parseJSON(data);
	
	console.log("ajaxReturn: " + answer["a"]);
	console.log(answer);
	
	if(answer["a"] == "highscoreView" && answer["status"] == "OK")
	{
		game["highscoreList"] = answer;
		game["highscoreListScroll"] = parseInt(answer["highscore_list_scroll"]);
		game["highscoreListBusy"] = false;
		
		console.log("highscoreListScroll: " + game["highscoreListScroll"]);
	}
	else if((answer["a"] == "wlAjaxGet" || answer["a"] == "wlAjaxGetTaak") && answer["status"] == "OK")
	{
		if(typeof answer["wrongWords"] !== "undefined") game["wrongWords"] = answer["wrongWords"];
		wlAjaxReturn(answer["wl"], answer["voortgang"]);
	}
	else if(answer["a"] == "highscoreSubmit" && answer["status"] == "OK")
	{
		highscoreView();
	}
	else if(answer["a"] == "getTaak" && answer["status"] == "OK")
	{
		console.log("ajaxReturn>getTaak");
		startWLTaakReturn(answer);
	}	
	else if(answer["status"] == "OK")
	{
		console.log("ajaxReturn: " + answer["status"]);	
	}
	else
	{
		console.error("highscoreView ERROR: " + answer["status"]);
		game["highscoreListBusy"] = false;
	}
	
	
}



// *** FUNCTIONS

// *** Objects in game
function addO(thisPrototype, thisX, thisY, thisWidth, thisHeight, thisSpecial, thisZ)
{	
	if(typeof thisZ === "undefined") thisZ = "";

	game["keyCount"]++;
	thisKey = game["keyCount"];

	//console.log("addO " + thisKey + ": prototype " + thisPrototype + " at (" + thisX + ", " + thisY + ")");
	
	o[thisKey] = new Object;

	for(keyTempO in oPrototype[thisPrototype]) o[thisKey][keyTempO] = oPrototype[thisPrototype][keyTempO];
	
	o[thisKey].prototype = thisPrototype;
	o[thisKey].x = thisX;
	o[thisKey].y = thisY;
	o[thisKey].z = thisZ;

	if(typeof thisWidth !== "undefined") o[thisKey].width = thisWidth;
	if(typeof thisHeight !== "undefined") o[thisKey].height = thisHeight;
	if(typeof thisSpecial !== "undefined") o[thisKey].special = thisSpecial;
	
	if(typeof o[thisKey].width === "undefined") o[thisKey].width = false;
	if(typeof o[thisKey].height === "undefined") o[thisKey].height = false;
	if(typeof o[thisKey].special === "undefined") o[thisKey].special = false;
	
	//if(o[thisKey].category == "particles" && thisSpecial == "OPPOSITE") o[thisKey].position = "bottom"; 
		
	/*
	o[thisKey].xSpeed = oPrototype[thisPrototype].xSpeed;
	o[thisKey].ySpeed = oPrototype[thisPrototype].ySpeed;

	o[thisKey].r = oPrototype[thisPrototype].r;
	o[thisKey].rSpeed = oPrototype[thisPrototype].rSpeed;
		
	o[thisKey].manifest = oPrototype[thisPrototype].manifest;
	*/
	
	return(thisKey);
}

// *** Particles
function addParticle(thisPrototype, thisX, thisY, thisZ)
{
	if(typeof thisZ === "undefined") thisZ = "";
	
	if(gameEngine["isTabletSmartphone"] && Math.random() > 0.5)
	{
		// *** Save CPU
	}
	else
	{
		game["keyCount"]++;
		thisKey = game["keyCount"];
		
		particle[thisKey] = new Object;
		
		particle[thisKey].prototype = thisPrototype;
		particle[thisKey].x = thisX;
		particle[thisKey].y = thisY;
		particle[thisKey].z = thisZ;
			
		particle[thisKey].xSpeed = particlePrototype[thisPrototype].xSpeed + particlePrototype[thisPrototype].xSpeedVariation * Math.random();
		particle[thisKey].xSpeedChange = particlePrototype[thisPrototype].xSpeedChange + particlePrototype[thisPrototype].xSpeedChangeVariation * Math.random();
		
		particle[thisKey].ySpeed = particlePrototype[thisPrototype].ySpeed + particlePrototype[thisPrototype].ySpeedVariation * Math.random();
		particle[thisKey].ySpeedChange = particlePrototype[thisPrototype].ySpeedChange + particlePrototype[thisPrototype].ySpeedChangeVariation * Math.random();
		
		particle[thisKey].size = particlePrototype[thisPrototype].size + particlePrototype[thisPrototype].sizeVariation * Math.random();
		particle[thisKey].sizeChange = particlePrototype[thisPrototype].sizeChange + particlePrototype[thisPrototype].sizeChangeVariation * Math.random();
		
		particle[thisKey].alpha = particlePrototype[thisPrototype].alpha + particlePrototype[thisPrototype].alphaVariation * Math.random();
		particle[thisKey].alphaChange = particlePrototype[thisPrototype].alphaChange + particlePrototype[thisPrototype].alphaChangeVariation * Math.random();
		
		tempParticleManifest = particlePrototype[thisPrototype].manifest;
		if(particlePrototype[thisPrototype].manifestVariation > 0 && Math.random() < particlePrototype[thisPrototype].manifestVariation) tempParticleManifest = particlePrototype[thisPrototype].manifestVariationManifest;
		particle[thisKey].manifest = tempParticleManifest;
	}
}

function renderParticles(thisZ)
{
	for(key in particle)
	{
		if(particle[key].z == thisZ)
		{
			context.globalAlpha = particle[key].alpha;
			tempSize = particle[key].size;
			
			// *** Flash
			if(particlePrototype[particle[key].prototype].flashChance > 0 && Math.random() < particlePrototype[particle[key].prototype].flashChance)
			{
				context.globalAlpha = 1; 
				tempSize *= particlePrototype[particle[key].prototype].flashSizeMultiplier;
			}
			
			drawImage(manifest[particle[key].manifest], particle[key].x, particle[key].y, tempSize, tempSize, false, false, false, true);
		}			      		
	}
	
	context.globalAlpha = 1; 
}	

function renderObjects(thisZ)
{
	// *** Objects
	for(key in o)
	{
		if(o[key].z == thisZ)
		{
			if(o[key].category == "sunbeam")
			{					
				for(i = 1; i <= 10; i++)
				{	
					if(!o[key].initialize)
					{
						context.globalAlpha = Math.sin(o[key][i].alpha)/10;
						drawImage(manifest["sunbeam"], o[key].x, o[key].y, manifest["sunbeam"].width * o[key].radius, manifest["sunbeam"].height * o[key].radius, o[key][i].r, false, false, true);
					}
				}				
			}
			else
			{	
				proto = oPrototype[o[key].prototype];
				
				if(typeof o[key].manifest !== "undefined" && o[key].manifest != "")
				{			
					if(proto.hasShadow) drawImage(manifest[o[key].manifest + "_shadow"], o[key].x + 5, o[key].y + 5, true, true, false, false, false, true);
					drawImage(manifest[o[key].manifest], o[key].x, o[key].y, true, true, o[key].r, false, false, true);
				}
			}
		}
	}
	
	context.globalAlpha = 1; 
}
	
		
function applyShadow()
{
	context.shadowColor = "rgba(0, 0, 0, 1)";
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 1;
	context.shadowBlur = 4;
}


function addGlitterbox(thisX, thisY, thisWidth, thisHeight)
{
	thisKey = addO("GLITTERBOX", thisX, thisY, thisWidth, thisHeight);
	return(thisKey);
}


function addGlittercircle(thisX, thisY, thisR)
{
	thisKey = addO("GLITTERCIRCLE", thisX, thisY); 
	o[thisKey].r = thisR;
	return(thisKey);
}


function addSunbeam(thisX, thisY, thisRadius, thisZ)
{
	thisKey = addO("SUNBEAM", thisX, thisY); 
	
	if(typeof thisRadius === "undefined") thisRadius = 1;
	if(typeof thisZ === "undefined") thisZ = "";
	
	o[thisKey].radius = thisRadius;
	o[thisKey].z = thisZ;
	
	return(thisKey);
}



// *** Functions with wl (woordenlijst)
function wlInit(completeWL)
{	
	wl = new Array();
	wl = completeWL;	

	console.log("wlInit: " + game["rounds"] + " rounds");
	console.log(wl);
		
	game["round"] = 0;
	game["question"] = 0;
	
	game["answer"] = new Array();
	
	for(i = 1; i <= game["rounds"]; i++)
	{

		game["answer"][i] = new Array();
		game["answer"][i]["questions"] = 0;
		game["answer"][i]["score"] = 0;
		
		for(j = 1; j <= 15; j++)
		{
			game["answer"][i][j] = new Array();
			game["answer"][i][j].correct = 0;
			game["answer"][i][j].answer = "";
			game["answer"][i][j].correctAnswer = "";
		}
	}
	
	
	
}

function wlNextRound()
{
	
	if (game["collectable"] == 10) {game["collectable"] = 1;}
	stopSound(game["music"]);

	game["score"] = 0;
	game["turtleX"] = game["turtleXstart"];
	game["count"] = 0;
	game["statusAni"] = "";
	game["question"] = 0;
	game["try"] = 0;
	game["wordTyped"] = "";
	game["turtleStatus"] = "";
	game["collectableX"] = 0;
	game["collectableY"] = 0;
	game["collectableSnap"] = false;
	game["collectableR"] = 0;
	game["status"] = "";
		
	game["round"]++;
	console.log("wlNextRound: " + game["round"]);
	console.log(game["answer"]);
	
	game["questions"] = 0;
	
	for(key in wl)
	{
		if(!wl[key].done) game["questions"]++;
	}
	
	if(game["questions"] > 15) game["questions"] = 15;
	
	game["answer"][game["round"]]["questions"] = game["questions"];
	
	console.log("wlNextRound: " + game["questions"] + " questions.");
	console.log(game["answer"]);

	if(game["questions"] <= 0)
	{		
		if(klas_wachtwoord == "")
		{
			game["status"] = "PLAYBUTTON";
		}
		else
		{
			console.log("Save to docentendeel");
			game["status"] = "SAVE_DOCENTEN";
			top.location = "/taken.php?a=reset_taak";
		}
	}
	else
	{
		nextQuestion();	

		stopSound(game["music"]);
		game["music"] = playSound("music_during_game", true);		
	}
}

// *** Get a new question from WL
function wlGet()
{
	game["wl"] = wlPick(true);
	game["wordTyped"] = "";
	
	console.log("wlGet: " + wl[game["wl"]].question);
}

// *** Pick a random question from WL and optionally mark it as done
function wlPick(thisMarkAsDone)
{
	//console.log("wlPick: " + wl.length);
	//console.log(wl);
	
	if(typeof thisMarkAsDone === "undefined") thisMarkAsDone = true;
	
	thisPossible = false;
		
	for(key in wl)
	{
		if(!wl[key].done) thisPossible = true;
	}

	thisWord = -1;
	
	if(thisPossible)
	{
		if(klas_wachtwoord == "")
		{
			tempCount = 0;	
			for(key in wl) tempCount++;
		
			thisFound = false;
			
			while(!thisFound)
			{
				thisArray = Math.floor(tempCount*Math.random());
				
				if(!wl[thisArray].done)
				{
					thisWord = thisArray;
					if(thisMarkAsDone) wl[thisArray].done = true;
					thisFound = true;
				}
			}
		}
		else
		{
			thisArray = 0;	
					
			thisFound = false;
			
			while(!thisFound)
			{
				if(!wl[thisArray].done)
				{
					thisWord = thisArray;
					if(thisMarkAsDone) wl[thisArray].done = true;
					thisFound = true;
				}

				thisArray++;
				
			}
		}
		
		//console.log("wlPick: " + thisWord + "");
		//console.log(wl[thisWord]);
		
	}
	else console.log("No more items found in wl!");

	//thisSyl = wlSyllabify(thisWord);
	//console.log(thisSyl);
	//console.log(wl);
	
	return(thisWord);	
}


/*
function wlUnderscore(thisTyped, thisWord)
{
	thisUnderscores = "";
	
	if(thisWord.length > thisTyped.length)
	{
		for(i = 0; i < thisWord.length-thisTyped.length; i++) thisUnderscores += "_";
	}
	
	return(thisTyped + thisUnderscores);
}

function wlSyllabify(word)
{
	// *** Lettergrepen
	// syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
	// thisSyl = word.match(syllableRegex);
	// if(!thisSyl) thisSyl = word;
	// return(thisSyl);
	
	// *** Splitsen in delen van 3 letters
	if(word.length < 8)
	{
		thisSyl = word.match(/.{1,2}/g);
	}
	else
	{
		thisSyl = word.match(/.{1,3}/g);
	}
		
	return(thisSyl);
}

function wlRandomSyllable()
{
	thisRandomSyllableArray = wlSyllabify(wlPick(false));
	thisRandomSyllable = thisRandomSyllableArray[Math.floor(Math.random()*thisRandomSyllableArray.length)];
	
	return(thisRandomSyllable);
}
*/



// *** Checks the checkboxes in the introscreen and if ok, starts the game
function wlCheckSelection()
{
	// *** Check checkboxes in introscreen
	tempOneOn = false;
	
	for(i = 1; i <= 10; i++)
	{
		if(game["wlCheckbox" + i]) tempOneOn = true;
	}	
	
	if(tempOneOn || klas_wachtwoord != "")
	{
		if(!game["gamePreloaded"])
		{
			game["gamePreloaded"] = true;
			showPreloader();
		}
		else
		{
			startGame();
			if(game["gamePreloaded"]) playSound("start_game");
		}
		
	} else alert("Kies tenminste één categorie om te spelen!");
}

// *** Toggles a checkbox in the introscreen and performs a few checks
function wlToggleCheckbox(thisCheckbox)
{
	console.log("wlToggleCheckbox: " + thisCheckbox);
	
	if(thisCheckbox <= 10)
	{
		if(game["wlCheckbox" + thisCheckbox])
		{
			game["wlCheckbox" + thisCheckbox] = false;
			if(game["gamePreloaded"]) playSound("menu_unselect");
		}
		else
		{
			game["wlCheckbox" + thisCheckbox] = true;
			if(game["gamePreloaded"]) playSound("menu_select");			
		}
		
		tempAllOn = true;
		
		for(i = 1; i <= 10; i++)
		{
			if(!game["wlCheckbox" + i]) tempAllOn = false;
		}
		
		if(tempAllOn) game["wlCheckbox11"] = true; else game["wlCheckbox11"] = false;
	}
	else
	{
		if(game["wlCheckbox" + thisCheckbox])
		{
			for(i = 1; i <= 11; i++) game["wlCheckbox" + i] = false;
			if(game["gamePreloaded"]) playSound("menu_unselect");
		}
		else
		{
			for(i = 1; i <= 11; i++) game["wlCheckbox" + i] = true;
			if(game["gamePreloaded"]) playSound("menu_select");
		}
	}
}

function wlAjaxGet()
{
	if(klas_wachtwoord != "" && taak != "" && leerling != "")
	{
		ajaxUpdate("a=wlAjaxGetTaak&klas_wachtwoord=" + klas_wachtwoord + "&taak=" + taak + "&leerling=" + leerling);
	}
	else
	{
		ajaxUpdate("a=wlAjaxGet&ik_vorm=" + game["wlCheckbox1"] + "&je_jij=" + game["wlCheckbox2"] + "&hij_zij_wij_vorm=" + game["wlCheckbox3"] + "&gebiedende_wijs=" + game["wlCheckbox4"] + "&sterk_werkwoord=" + game["wlCheckbox5"] + "&zwak_werkwoord=" + game["wlCheckbox6"] + "&enkelvoud=" + game["wlCheckbox7"] + "&meervoud=" + game["wlCheckbox8"] + "&voltooid_deelwoord=" + game["wlCheckbox9"] + "&bijv_gebruikt_deelwoord=" + game["wlCheckbox10"] + "");
	}

}

function wlAjaxReturn(completeWL, thisProgress)
{
	console.log("*************** wlAjaxReturn: " + completeWL.length + " / thisProgress: " + thisProgress);
	//console.log(completeWL);
	console.log(game["answer"]);
	
	if(completeWL.length == 0) alert("Er zijn helaas geen vragen gevonden! Vink meer hokjes voor een groter assortiment van vragen.");

	wlInit(completeWL);	
	wlNextRound();

	if(klas_wachtwoord != "")
	{
		console.log("************ answer");
		console.log(game["answer"]);
		
		game["totaltaskwords"] = completeWL.length;
		
		game["taskprogress"] = thisProgress;
		
		for(ii = 0; ii < thisProgress; ii++)
		{
			if(typeof game["wrongWords"][completeWL[game["wl"]].answer] === "undefined")
			{
				game["answer"][game["round"]][game["question"]].correct = 1;
				game["answer"][game["round"]][game["question"]].answer = completeWL[game["wl"]].answer;
				game["answer"][game["round"]][game["question"]].correctAnswer = completeWL[game["wl"]].answer;
				
			}
			else
			{
				console.log("wlAjaxReturn PROGRESS not correct answer: " + completeWL[game["wl"]].answer + " <-> " + game["wrongWords"][completeWL[game["wl"]].answer]);
				//console.log(completeWL[game["wl"]]);

				game["answer"][game["round"]][game["question"]].correct = 2;
				game["answer"][game["round"]][game["question"]].answer = game["wrongWords"][completeWL[game["wl"]].answer];
				game["answer"][game["round"]][game["question"]].correctAnswer = completeWL[game["wl"]].answer;
				
			}
				
			nextQuestion(true);
		}
	}
	
	/*	
	if(klas_wachtwoord != "")
	{
		game["wl"] = thisProgress;
		game["question"] = thisProgress + 1;
		//wlGet();
		
		game["turtleX"] = game["turtleXstart"] + (thisProgress)*90;
	}
	*/
	
	
		
	console.log("wlAjaxReturn question: " + game["question"]);

}