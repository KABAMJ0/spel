// *** Initialize game after html body has been loaded
function init()
{
	if(!gameEngine["initDone"])
	{
		gameEngine["initDone"] = true;
		console.log("Init game with Gamedesign.nl HTML5 game engine " + gameEngine["version"] + " (versionHTML: " + versionHTML + "): all rights reserved");console.log("---");

		// *** Device related checks and hacks
		deviceChecksPostInit();
				
		ge('myCanvasGamedesign').style.display = 'none';
	
		startGame();			
		//showIntro();	
	}
}


// *** Create begin of manifest for showing of preload screen only (NO PRELOADING OF SOUND!)
function loadPreloadManifest()
{	
	// *** Preload of images	
	manifestImage("playbutton", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/playbutton.png"); 	manifestImage("playbutton_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/playbutton_hover.png");		manifestImage("alert_bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/alert_bg.png"); 		manifestImage("ios_startscreen", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/ios_startscreen.png");		manifestImage("bg_maneuvre", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/bg_maneuvre.png"); 	manifestImage("icon_phone", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/icon_phone.png");
	manifestImage("progressbar", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/progressbar.png");	manifestImage("progressbar_bg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/progressbar_bg.png");		manifestImage("progressbar_fg", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/progressbar_fg.png");	manifestImage("close", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/close.png");
	manifestImage("sound_on", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/sound_on.png");		manifestImage("sound_off", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/sound_off.png");			manifestImage("fullscreen_on", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/fullscreen_on.png");	manifestImage("fullscreen_off", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/fullscreen_off.png");
	manifestImage("keyboard_on", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/keyboard_on.png");	manifestImage("keyboard_off", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/ui/keyboard_off.png");			manifestImage("sunbeam", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/sunbeam.png");
	manifestImage("bg_intro", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/bg_intro.jpg");			
	manifestImage("particle", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/particle.png");			manifestImage("particle_black", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/particle_black.png");
	manifestImage("keyboard_key", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key.png");	manifestImage("keyboard_key_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_hover.png");		manifestImage("keyboard_key_pushed", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_pushed.png");	manifestImage("keyboard_key_long", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_long.png");	manifestImage("keyboard_key_long_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_long_hover.png");	manifestImage("keyboard_key_long_pushed", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_long_pushed.png");	manifestImage("keyboard_key_alt", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_alt.png");	manifestImage("keyboard_key_alt_pushed", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_alt_pushed.png");	manifestImage("keyboard_key_long_alt", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_long_alt.png");	manifestImage("keyboard_key_long_alt_pushed", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/global/keyboard/key_long_alt_pushed.png");				
	
	manifestImage("logo_left", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/logo_left.png");
	manifestImage("logo_left_flash", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/logo_left_flash.png");
	manifestImage("logo_right", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/logo_right.png");
	manifestImage("logo_right_flash", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/logo_right_flash.png");

	manifestImage("button", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/button.png"); 
	manifestImage("button_hover", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/button_hover.png");
	manifestImage("keyboard", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/keyboard.png");
	manifestImage("main_menu", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/main_menu.png");

	manifestImage("check_blue", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/check_blue.png");
	manifestImage("check_red", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/check_red.png");
	manifestImage("check_green", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/check_green.png");
	manifestImage("check_flash", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/check_flash.png");

	manifestImage("bg_1_docentendeel", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/bg_1_docentendeel.jpg");
	
	startPreload();
}

// *** Create manifest (collection of images/sounds) for preloading and use in game
function loadManifest()
{
	// *** Preload of sounds
	if(!gameEngine["globalAudioDisabled"])
	{	
		manifestSound("sword", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/sound/sword.mp3");
		// manifestSound("gunshot", "sound/gunshot.mp3");
		manifestSound("menu_select", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/sound/menu_select.mp3");
		manifestSound("menu_unselect", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/sound/menu_unselect.mp3");
		manifestSound("start_game", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/sound/start_game.mp3");
		manifestSound("wrong", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/sound/wrong.mp3");
		manifestSound("woohoo", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/sound/woohoo.mp3");
		manifestSound("oops", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/sound/oops.mp3");
		manifestSound("music", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/sound/music.mp3");
		manifestSound("music_during_game", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/sound/music_during_game.mp3");
		manifestSound("step_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/sound/step_1.mp3");
		manifestSound("step_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/sound/step_2.mp3");
		manifestSound("whoop", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/sound/whoop.mp3");
		manifestSound("bottle", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/sound/bottle.mp3");
		manifestSound("bottle_clang", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/sound/bottle_clang.mp3");
	}
		
	manifestImage("bg_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/bg_1.jpg");	
	manifestImage("fg_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/fg_1.png");

	manifestImage("bg_result", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/bg_result.png");
	manifestImage("bg_score_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/bg_score_1.png");
	manifestImage("bg_score_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/bg_score_2.png");
	manifestImage("bg_score_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/bg_score_3.png");
	manifestImage("bg_score_4", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/bg_score_4.png");
	manifestImage("bg_score_5", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/bg_score_5.png");
	manifestImage("bg_explanation", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/bg_explanation.png");

	manifestImage("check", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/check.png");
	manifestImage("cross", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/cross.png");
	
	for(i = 1; i <= 4; i++) manifestImage("turtle_stand_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/turtle/stand_" + i + ".png");
	for(i = 1; i <= 8; i++) manifestImage("turtle_run_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/turtle/run_" + i + ".png");

	manifestImage("progress_0", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/progress_0.png");
	manifestImage("progress_1", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/progress_1.png");
	manifestImage("progress_2", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/progress_2.png");
	manifestImage("progress_3", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/progress_3.png");

	manifestImage("collectable_shadow", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/collectable/shadow.png");

	for(i = 1; i <= 9; i++)
	{
		manifestImage("collectable_" + i, "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/collectable/" + i + ".png");
		manifestImage("collectable_" + i + "_outline", "https://afbeeldingen.spellingoefenen.nl/spelling_oefenen/werkwoorden/images/collectable/" + i + "_outline.png");
	}
	
	bufferSound();
	startPreload();
}


var wl = { };

// *** Game and gameplay
var game = {

	"orientation" : "landscape", // *** landscape or portrait. Also change the class/dimensions in the canvas-tag in the index-file
	"width" : 1400,  // *** Landscape: 1400, Portrait: 640
	"height" : 700, // *** Landscape: 700,  Portrait: 920
	
	"gamePreloaded" : false,
			
	"backButton" : "", // *** URL backbutton (X) leads to, leave empty for history.go(-1)
	"status" : "", // *** General game status: "" (playing), INTRO (startscreen), HIGHSCORES (after play)
	"score" : 0, // *** Score of player
	"music" : "",	"loopingMusic" : 1,
	"mouseX" : 0, 	"mouseY" : 0, // *** Mouse position is untrustworthy as touch-devices don't support this
	"dragging" : false,	"draggingCheck" : false,	"draggingX" : 0,	"draggingY" : 0,	
	"keyCount" : 0,
	"gravity" : 1, // *** Gravity to make objects fall
	"bouncyness" : 0.5, // *** How high does objects bounce back up
	"pulsate" : 0, "pulsateCos" : 0, "pulsateX" : 0, "pulsateSpeed" : 0.2,

	"highscoreName" : getCookie("highscoreName"),	"highscoreEmail" : getCookie("highscoreEmail"),		"highscoreAgreedTerms" : getCookie("highscoreAgreedTerms"),	"highscoreNewsletter" : getCookie("highscoreNewsletter"),	
	"highscoreGamePlay" : "", "highscoreListSize" : 11, "highscoreListLineheight" : 47, "highscoreListScroll" : 0, "highscoreListBusy" : false,
	"highscoreList" : new Array(),

	"count" : 0,
	"statusAni" : "",

	"round" : 0,
	"rounds" : 10,
	
	"question" : 0,
	"questions" : 15,

	"try" : 0,
	"answer" : { 1 : {}, 2 : {}, 3 : {}, },	
	
	"wl" : -1,
	"wordTyped" : "",

	"wordSyllable" : {},
	"wordSyllableCount" : 0,
	"wordCount" : 0,
	"wordFrequency" : 50,
	
	"logoFlash" : 0,

	"wlCheckbox1" : false, "wlCheckbox2" : false, "wlCheckbox3" : false, "wlCheckbox4" : false, "wlCheckbox5" : false, "wlCheckbox6" : false, "wlCheckbox7" : false, "wlCheckbox8" : false, "wlCheckbox9" : false, "wlCheckbox10" : false, "wlCheckbox11" : false,

	"turtleStatus" : "",
	"turtleCount" : 0,
	"turtleCountFrame" : 0,
	"turtleBlink" : 1,
	"turtleX" : 0,
	"turtleXstart" : 50 - 90,
	"turtleY" : 330,

	"collectable" : 1,
	"collectableX" : 0,
	"collectableY" : 0,
	"collectableXspeed" : 0,
	"collectableYspeed" : 0,
	"collectableYjump" : 0,
	"collectableYjumpGravity" : 0,
	"collectableR" : 0,
	"collectableSnap" : false,

	"sentenceGlitterBox" : "",
	"reshowKeyboard" : false,
	"FeedbackText" : "",
	
	"totaltaskwords" : 0,
	"taskprogress" : 0,

	"wrongWords" : {},

};


// *** Spots (locations in game; capitalized for recognition)
// "debugDraw" : true 
var spot = {

	// *** UI
	"WINDOW_BUTTONS"	: { "x" : game["width"] - 75,	"y" : 15,	"margin" : 10 },
	"CLOSE_ICON" 		: { "x" : 10000,		"y" : 15,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons
	"FULLSCREEN_ICON" 	: { "x" : 10000,		"y" : 15,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons
	"SOUND_ICON" 		: { "x" : 10000,		"y" : 15,	"width" : 60,	"height" : 60 }, // *** x gets recalculated according to visible icons
	"KEYBOARD_ICON"		: { "x" : 1305,			"y" : 610,	"width" : 85,	"height" : 78 }, 
	"MAIN_MENU_ICON"	: { "x" : 10,			"y" : 610,	"width" : 85,	"height" : 78 },
	"BUTTON" 		: { "paddingBottom" : 36, 	"font" : "bold 22px Arial",		"color" : "#FFFFFF",	"shadow" : true,	"paddingBottomHover" : 33, 	"fontHover" : "bold 22px Arial",	"colorHover" : "#FFFFFF",	"shadowHover" : true, },

	// *** Intro / playbutton / preload
	"INTRO" 		: { "x" : 0,				"y" : 0 },
	"INTRO_LOGO"	 	: { "x" : game["width"]/2,		"y" : game["height"]/2 - 230 },
	"INTRO_PLAYBUTTON" 	: { "x" : 510,				"y" : 523 },
	"INTRO_PLAYBUTTON_2" 	: { "x" : game["width"]/2-100,		"y" : 523 },
	"INTRO_PLAYBUTTON_TEXT"	: { "x" : game["width"]/2,		"y" : 360,		"font" : "bold 60px Arial", 	"color" : "#FFFFFF", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 24  },
	
	"INTRO_PRELOADER"	: { "x" : game["width"]/2 - 476/2,	"y" : 310, 				"width" : 475, 		"height" : 70,		"paddingLeft" : 13,	"paddingTop" : 9,	"preloaderWidth" : 448,		"preloaderHeight" : 50, },
	"INTRO_PRELOAD_MESSAGE"	: { "x" : game["width"]/2,		"y" : game["height"]/2 + 150,		"font" : "bold 20px Arial", 	"color" : "#000000", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 24  },

	"INTRO_MANEUVRE" 	: { "x" : game["width"]/2,		"y" : game["height"]/2,			"font" : "bold 46px Arial", 	"color" : "#FFFFFF", 	"textAlign" : "center",		"shadow" : true,	"lineHeight" : 50,	"paddingTop" : 230 },

	"INTRO_VERSION" 	: { "x" : game["width"] - 20,		"y" : game["height"] - 20,		"font" : "12px Arial", 	"color" : "#FFFFFF", 	"textAlign" : "right",	"shadow" : true },
	"INTRO_IOS_ALERT"	: { "x" : game["width"]/2 - 400/2-4,	"y" : game["height"]/2-125, 		"font" : "bold 22px Arial", 	"color" : "#000000", 	"textAlign" : "center",	"shadow" : false,	"lineHeight" : 24 }, 
	"INTRO_IOS_BUTTON"	: { "x" : game["width"]/2 - 200/2,	"y" : game["height"]/2-125+177 }, 
	"INTRO_NINJA"		: { "x" : game["width"]/2 - 600/2,	"y" : game["height"]/2-150 }, 
	"INTRO_PLAY_BUTTON"	: { "x" : game["width"]/2 - 210,	"y" : game["height"]/2+230 }, 
	"INTRO_HIGHSCORE_BUTTON": { "x" : game["width"]/2 + 10,		"y" : game["height"]/2+230 }, 

	"INTRO_CHECKBOX_1"	: { "x" : 295,	"y" : 268 + 49*0,	"width" : 440,	"height" : 49, },
	"INTRO_CHECKBOX_3"	: { "x" : 295,	"y" : 268 + 49*1,	"width" : 440,	"height" : 49, },
	"INTRO_CHECKBOX_2"	: { "x" : 295,	"y" : 268 + 49*2,	"width" : 440,	"height" : 49, },
	"INTRO_CHECKBOX_4"	: { "x" : 295,	"y" : 268 + 49*3,	"width" : 440,	"height" : 49, },

	"INTRO_CHECKBOX_5"	: { "x" : 788,	"y" : 267 + 49*0,	"width" : 450,	"height" : 49, },
	"INTRO_CHECKBOX_6"	: { "x" : 788,	"y" : 267 + 49*1,	"width" : 450,	"height" : 49, },
	"INTRO_CHECKBOX_7"	: { "x" : 788,	"y" : 267 + 49*2,	"width" : 450,	"height" : 49, },
	"INTRO_CHECKBOX_8"	: { "x" : 788,	"y" : 267 + 49*3,	"width" : 450,	"height" : 49, },
	"INTRO_CHECKBOX_9"	: { "x" : 788,	"y" : 267 + 49*4,	"width" : 450,	"height" : 49, },
	"INTRO_CHECKBOX_10"	: { "x" : 788,	"y" : 267 + 49*5,	"width" : 450,	"height" : 49, },

	"INTRO_CHECKBOX_11"	: { "x" : 295,	"y" : 530,		"width" : 185,	"height" : 49, },
	
	// *** Game
	"BG"		: { "x" : 0,		"y" : 0, }, 	
	"PROGRESS"	: { "x" : 35,		"y" : 315, 	"font" : "bold 30px Arial",	"color" : "#000000",	"textAlign" : "center" }, 
	"SENTENCE"	: { "x" : 700,		"y" : 140, 	"font" : "bold 36px Arial",	"color" : "#000000",	"maxWidth" : 1300 }, 
	"SENTENCE_ACCENT"	: { "x" : 700,		"y" : 140, 	"font" : "bold 36px Arial",	"color" : "#C65F40",	"maxWidth" : 1300 }, 

	"EXPLANATION_WRONG"	: { "x" : 85,		"y" : 120, 	"font" : "bold 36px Arial",	"color" : "#000000",	"textAlign" : "left",	"maxWidth" : 1130 }, 
	"EXPLANATION_WRONG_ACCENT"	: { "x" : 85,		"y" : 120, 	"font" : "bold 36px Arial",	"color" : "#ff0000",	"textAlign" : "left",	"maxWidth" : 1130 },
	
	"EXPLANATION_RIGHT"	: { "x" : 85,		"y" : 120+100, 	"font" : "bold 36px Arial",	"color" : "#000000",	"textAlign" : "left",	"maxWidth" : 1130 }, 
	"EXPLANATION_RIGHT_ACCENT"	: { "x" : 85,		"y" : 120+100, 	"font" : "bold 36px Arial",	"color" : "#58ac00",	"textAlign" : "left",	"maxWidth" : 1130 },
	
	"EXPLANATION_TEXT"	: { "x" : 85,		"y" : 120+260, 	"font" : "bold 22px Arial",	"color" : "#000000",	"textAlign" : "left",	"maxWidth" : 1200,	"lineHeight" : 28 }, 
	"EXPLANATION_TEXT_ACCENT"	: { "x" : 85,		"y" : 120+260, 	"font" : "bold 26px Arial",	"color" : "#58ac00",	"textAlign" : "left",	"maxWidth" : 1200,	"lineHeight" : 28 }, 
	"EXPLANATION_TEXT_RED"	: { "x" : 85,		"y" : 120+260, 	"font" : "bold 26px Arial",	"color" : "#ff0000",	"textAlign" : "left",	"maxWidth" : 1200,	"lineHeight" : 28 },
	
	"EXPLANATION_BUTTON"	: { "x" : 700-100,	"y" : 500 }, 	

	"CACTUS_1"	: { "x" : 867,		"y" : 306,	"width" : 86,	"height" : 95 },
	"CACTUS_2"	: { "x" : 1312,		"y" : 211,	"width" : 86,	"height" : 95 },

	"RESULT"	: { "x" : 80,		"y" : 115, 	"font" : "bold 30px Arial",	"color" : "#000000",	"textAlign" : "left",	"maxWidth" : 290 }, 
	"RESULT_CORRECT": { "x" : 0,		"y" : 0, 	"font" : "bold 30px Arial",	"color" : "#58ac00",	"textAlign" : "left",	"maxWidth" : 290 }, 
	"RESULT_WRONG"	: { "x" : 0,		"y" : 0, 	"font" : "bold 30px Arial",	"color" : "#ff0000",	"textAlign" : "left",	"maxWidth" : 290 }, 
	"RESULT_BUTTON"	: { "x" : 700-100,	"y" : 615 }, 

	"SCORE_BUTTON"	: { "x" : 700-100,	"y" : 615 }, 
	"SCORE_HEADER"	: { "x" : 700,		"y" : 180, 	"font" : "bold 30px Arial",	"color" : "#000000",	"textAlign" : "center" }, 
	"SCORE_SCORE"	: { "x" : 700,		"y" : 340, 	"font" : "bold 170px Arial",	"color" : "#000000",	"textAlign" : "center" }, 
	"SCORE_TEXT"	: { "x" : 700,		"y" : 410, 	"font" : "bold 30px Arial",	"color" : "#000000",	"textAlign" : "center" }, 

	"COLLECTABLE_1"	: { "x" : 235 + 118*0,	"y" : 435 }, 
	"COLLECTABLE_2"	: { "x" : 235 + 118*1,	"y" : 435 }, 
	"COLLECTABLE_3"	: { "x" : 235 + 118*2,	"y" : 435 }, 
	"COLLECTABLE_4"	: { "x" : 235 + 118*3,	"y" : 435 }, 
	"COLLECTABLE_5"	: { "x" : 235 + 118*4,	"y" : 435 }, 
	"COLLECTABLE_6"	: { "x" : 235 + 118*5,	"y" : 435 }, 
	"COLLECTABLE_7"	: { "x" : 235 + 118*6,	"y" : 435 }, 
	"COLLECTABLE_8"	: { "x" : 235 + 118*7,	"y" : 435 }, 
	"COLLECTABLE_9"	: { "x" : 235 + 118*8,	"y" : 435 }, 
	"COLLECTABLE_10"	: { "x" : 235 + 118*8,	"y" : 435 }, 
	
	// *** Highscore	
	"HIGHSCORE_AREA"	: { "x" : game["width"]/2 - 400,		"y" : 20, 	"width" : 795, 		"height" : 670,		"font" : "28px Arial", 	"color" : "#21170e",  	"textAlign" : "center" },
	"HIGHSCORE_POSITIONS"	: { "x" : game["width"]/2 - 400 + 190,		"y" : 80,	"paddingLeft" : -125, 	"paddingTop" : -11,	"font" : "28px Arial", 	"color" : "#21170e", 	"colorAlt" : "#fdd086", 	"textAlign" : "right" },
	"HIGHSCORE_NAMES"	: { "x" : game["width"]/2 - 400 + 210,		"y" : 80,							"font" : "28px Arial", 	"color" : "#21170e", 	"colorAlt" : "#fdd086", 	"textAlign" : "left" },
	"HIGHSCORE_SCORES"	: { "x" : game["width"]/2 - 400 + 630,		"y" : 80,							"font" : "28px Arial", 	"color" : "#21170e", 	"colorAlt" : "#fdd086", 	"textAlign" : "right" },
	"HIGHSCORE_TEXT_SCORE"	: { "x" : game["width"]/2 - 400 + 866,		"y" : 300,	"font" : "32px Arial",	"color" : "#fffabc",	"textAlign" : "center" },
	"HIGHSCORE_TEXT_POS"	: { "x" : game["width"]/2 - 400 + 866,		"y" : 300 + 46,	"font" : "32px Arial",	"color" : "#fffabc",	"textAlign" : "center" },
	"HIGHSCORE_SUBMIT"	: { "x" : game["width"]/2 - 400 + 765,		"y" : 400,	"paddingBottom" : 50 },
	"HIGHSCORE_PLAY"	: { "x" : game["width"]/2 - 400 + 765,		"y" : 500,	"paddingBottom" : 50 },
	"HIGHSCORE_SCROLL_TOP"		: { "x" : game["width"]/2 - 184 + 70 * 0,		"y" : 632, 	"width" : 70, 		"height" : 50 },
	"HIGHSCORE_SCROLL_UP"		: { "x" : game["width"]/2 - 184 + 70 * 1,		"y" : 632, 	"width" : 70, 		"height" : 50 },
	"HIGHSCORE_SCROLL_USER"		: { "x" : game["width"]/2 - 184 + 70 * 2,		"y" : 632 - 1, 	"width" : 84, 		"height" : 51 },
	"HIGHSCORE_SCROLL_DOWN"		: { "x" : game["width"]/2 - 184 + 70 * 3 + 14,	"y" : 632, 	"width" : 70, 		"height" : 50 },
	"HIGHSCORE_SCROLL_BOTTOM"	: { "x" : game["width"]/2 - 184 + 70 * 4 + 14,	"y" : 632, 	"width" : 70, 		"height" : 50 },
};


// *** Objects
var o = { }; 

var oPrototype = {

	"GLITTERBOX" : {
	
		"category" : "particles",
		
		"width" : 200,
		"height" : 150,
				
		"speed" : 10,
		"particle" : 3,
		"position" : "top",
		"count" : 0,
		"mirrored" : true,	
	},	

	"GLITTERCIRCLE" : {  "category" : "particles", "width" : 200, "height" : 150, "speed" : 0.12, "particle" : 3, "count" : 0, "mirrored" : true, },
	"SUNBEAM" : { "category" : "sunbeam", "radius" : 400, "initialize" : true, },	
};


// *** Game engine
var gameEngine = {

	"version" : "v2.25.1",
	// *** Use the last digit (1) for verion updates of your game: increase it here AND increase versionHTML in index.html in the same way. This will eliminate cache problems.
	// *** v2.25 : changed mysql to pdo for php7 compatibility

	"testing" : true,
	"globalAudio" : true,
	"ajaxComm" : "game_comm.php", "shaPW" : "great",	
	"iOS" : false, "isIphone" : false, "isAndroid" : false,	"isWindowsPhone" : false, "isSmartphone" : false, "isTopWindow" : false, "iPhoneScrollCheck" : false, "iPhoneMaxScroll" : 0, "globalFullscreenDisabled" : false, "globalFullscreen" : false, "userInteractionOccured" : false,	
	"framerate" : 40, "framerateRecalculations" : 1, "framerateStats" : new Stats(),	
	"preloadStarted" : false, "preloadPreloadManifestCount" : 0, "preloadMessage" : "",	
	"play" : true, "playButtonIntroMessage" : true, "playButtonCount" : 0, "playButtonStatus" : "INIT",
	"globalAudioDisabled" : false,	
	"audioNoBuffer" : false, // *** Buffering audio is way better but NOT possible in IE and not LOCAL	
	"initDone" 	: false,	
	"manifestTotal" : 0, "manifestCount" : 0,
};


// *** Particles
var particle = { }; 

var particlePrototype = {

	1 : { 	"name" : "Smoke",	"manifest" : "particle",	"manifestVariation" : 0.25,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -3,		"xSpeedVariation" : 3,		"xSpeedChange" : 0.1,		"xSpeedChangeVariation" : 0.1,
		"ySpeed" : 0,		"ySpeedVariation" : 0,		"ySpeedChange" : -0.2,		"ySpeedChangeVariation" : -0.4,
		"size"   : 2,		"sizeVariation"   : 20,		"sizeChange"   : 6,		"sizeChangeVariation"   : 6,
		"alpha"  : 0.5,		"alphaVariation"  : 0.5,	"alphaChange"  : -0.02,		"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	2 : { 	"name" : "Black Smoke",	"manifest" : "particle",	"manifestVariation" : 1,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -4,		"xSpeedVariation" : 4,		"xSpeedChange" : 0.2,		"xSpeedChangeVariation" : 0.2,
		"ySpeed" : -2,		"ySpeedVariation" : 0,		"ySpeedChange" : -0.2,		"ySpeedChangeVariation" : -0.2,
		"size"   : 10,		"sizeVariation"   : 30,		"sizeChange"   : 3,		"sizeChangeVariation"   : 6,
		"alpha"  : 0.5,		"alphaVariation"  : 0.5,	"alphaChange"  : -0.02,		"alphaChangeVariation"  : -0.02,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	3 : { 	"name" : "Glitter",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -1,		"xSpeedVariation" : 1,		"xSpeedChange" : 0.01,		"xSpeedChangeVariation" : 0,
		"ySpeed" : 1,		"ySpeedVariation" : -2,		"ySpeedChange" : -0.1,		"ySpeedChangeVariation" : 0,
		"size"   : 50,		"sizeVariation"   : 50,		"sizeChange"   : -3,		"sizeChangeVariation"   : -4,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.02,		"alphaChangeVariation"  : -0.02,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0.01,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	4 : { 	"name" : "Up flash",	"manifest" : "particle",	"manifestVariation" : 0.01,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -2,		"xSpeedVariation" : 4,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -2,		"ySpeedVariation" : -4,		"ySpeedChange" : 1,		"ySpeedChangeVariation" : 1,
		"size"   : 10,		"sizeVariation"   : 10,		"sizeChange"   : 10,		"sizeChangeVariation"   : 10,
		"alpha"  : 0.5,		"alphaVariation"  : 0.5,	"alphaChange"  : -0.1,		"alphaChangeVariation"  : 0,

		"bounces" : true,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : false,		"bouncesRight" : false,
	
		"flashChance" : 0.01,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	5 : { 	"name" : "BounceBalls",	"manifest" : "particle",	"manifestVariation" : 0.95,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -5,		"xSpeedVariation" : 10,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -10,		"ySpeedVariation" : -20,	"ySpeedChange" : 1,		"ySpeedChangeVariation" : 1,
		"size"   : 50,		"sizeVariation"   : 0,		"sizeChange"   : 0,		"sizeChangeVariation"   : 0,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : 0,		"alphaChangeVariation"  : 0,

		"bounces" : true,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0.015,
	},	

	6 : { 	"name" : "BentBeam",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -35,		"xSpeedVariation" : 0,		"xSpeedChange" : 1,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -9,		"ySpeedVariation" : 0,		"ySpeedChange" : 0,		"ySpeedChangeVariation" : 0,
		"size"   : 50,		"sizeVariation"   : 50,		"sizeChange"   : -1,		"sizeChangeVariation"   : -2,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.01,		"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0.01,	"flashSizeMultiplier" : 4,	"destructionChance" : 0,
	},	

	7 : { 	"name" : "CrAzY!",	"manifest" : "particle",	"manifestVariation" : 0.1,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -5,		"xSpeedVariation" : 10,		"xSpeedChange" : -1,		"xSpeedChangeVariation" : 2,
		"ySpeed" : -5,		"ySpeedVariation" : 5,		"ySpeedChange" : 1,		"ySpeedChangeVariation" : -2,
		"size"   : 10,		"sizeVariation"   : 10,		"sizeChange"   : 3,		"sizeChangeVariation"   : 12,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.01,		"alphaChangeVariation"  : 0,

		"bounces" : true,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 4,	"destructionChance" : 0,
	},
	

	8 : { 	"name" : "Black Mini Smoke",	"manifest" : "particle",	"manifestVariation" : 0.85,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -1,		"xSpeedVariation" : 1,		"xSpeedChange" : 0.02,		"xSpeedChangeVariation" : 0.02,
		"ySpeed" : 0,		"ySpeedVariation" : 0,		"ySpeedChange" : -0.02,		"ySpeedChangeVariation" : -0.02,
		"size"   : 5,		"sizeVariation"   : 1,		"sizeChange"   : 1,		"sizeChangeVariation"   : 2,
		"alpha"  : 1,		"alphaVariation"  : 0,	"alphaChange"  : -0.03,		"alphaChangeVariation"  : 0,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	9 : { 	"name" : "Mini Glitter",	"manifest" : "particle",	"manifestVariation" : 0,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -1,		"xSpeedVariation" : 1,		"xSpeedChange" : 0.01,		"xSpeedChangeVariation" : 0,
		"ySpeed" : 1,		"ySpeedVariation" : -2,		"ySpeedChange" : -0.1,		"ySpeedChangeVariation" : 0,
		"size"   : 25,		"sizeVariation"   : 25,		"sizeChange"   : -1,		"sizeChangeVariation"   : -2,
		"alpha"  : 1,		"alphaVariation"  : 0,		"alphaChange"  : -0.02,		"alphaChangeVariation"  : -0.02,

		"bounces" : false,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : true,		"bouncesRight" : true,
	
		"flashChance" : 0,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	

	10 : { 	"name" : "Up flash 2",	"manifest" : "particle",	"manifestVariation" : 0.01,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -2,		"xSpeedVariation" : 4,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -2,		"ySpeedVariation" : -2,		"ySpeedChange" : 1,		"ySpeedChangeVariation" : 1,
		"size"   : 5,		"sizeVariation"   : 5,		"sizeChange"   : 5,		"sizeChangeVariation"   : 5,
		"alpha"  : 0.5,		"alphaVariation"  : 0.5,	"alphaChange"  : -0.1,		"alphaChangeVariation"  : 0,

		"bounces" : true,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : false,		"bouncesRight" : false,
	
		"flashChance" : 0.01,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	
	
	11 : { 	"name" : "Flashy",	"manifest" : "particle",	"manifestVariation" : 0.01,	"manifestVariationManifest" : "particle_black",		
	
		"xSpeed" : -1,		"xSpeedVariation" : 2,		"xSpeedChange" : 0,		"xSpeedChangeVariation" : 0,
		"ySpeed" : -1,		"ySpeedVariation" : 2,		"ySpeedChange" : 0,		"ySpeedChangeVariation" : 0,
		"size"   : 250,		"sizeVariation"   : 250,	"sizeChange"   : -10,		"sizeChangeVariation"   : -10,
		"alpha"  : 0.25,	"alphaVariation"  : 0.25,	"alphaChange"  : -0.01,		"alphaChangeVariation"  : 0,

		"bounces" : true,	"bouncesTop" : true,		"bouncesBottom" : true,		"bouncesLeft" : false,		"bouncesRight" : false,
	
		"flashChance" : 0.005,	"flashSizeMultiplier" : 2,	"destructionChance" : 0,
	},	
	
};


// *** Keyboard
var keyboard = {

	"keys"	: { 

		/*
		"1" : { x : 0.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"2" : { x : 1.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"3" : { x : 2.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"4" : { x : 3.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"5" : { x : 4.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"6" : { x : 5.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"7" : { x : 6.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"8" : { x : 7.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"9" : { x : 8.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		"0" : { x : 9.5, 	y : 0, 		pushed : 0, 	type : "number", 	opacity : 0.75 },
		*/
		
		"Q" : { x : 0, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"W" : { x : 1, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"E" : { x : 2, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"R" : { x : 3, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"T" : { x : 4, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"Y" : { x : 5, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"U" : { x : 6, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"I" : { x : 7, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"O" : { x : 8, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"P" : { x : 9, 		y : 1-1, 		pushed : 0, 	type : "letter" },
		"<<": { x : 10, 	y : 1-1, 		pushed : 0, 	type : "system", 	opacity : 0.35,		extraLength : 2 },
		"Ä" : { x : 12.5, 	y : 1-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
		"É" : { x : 13.5, 	y : 1-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
		"È" : { x : 14.5, 	y : 1-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
		"Ë" : { x : 15.5, 	y : 1-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
		
		"A" : { x : 0.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"S" : { x : 1.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"D" : { x : 2.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"F" : { x : 3.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"G" : { x : 4.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"H" : { x : 5.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"J" : { x : 6.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"K" : { x : 7.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"L" : { x : 8.5, 	y : 2-1, 		pushed : 0, 	type : "letter" },
		"OK": { x : 9.5, 	y : 2-1, 		pushed : 0, 	type : "system", 	opacity : 0.35, 	extraLength : 2 },
		"Í" : { x : 12, 	y : 2-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
		"Ì" : { x : 13, 	y : 2-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
		"Ï" : { x : 14, 	y : 2-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
		"Ö" : { x : 15, 	y : 2-1, 		pushed : 0, 	type : "letter", 	opacity : 0.35 },
	
		"Z" : { x : 1, 		y : 3-1, 		pushed : 0, 	type : "letter" },
		"X" : { x : 2, 		y : 3-1, 		pushed : 0, 	type : "letter" },
		"C" : { x : 3, 		y : 3-1, 		pushed : 0, 	type : "letter" },
		"V" : { x : 4, 		y : 3-1, 		pushed : 0, 	type : "letter" },
		"B" : { x : 5, 		y : 3-1, 		pushed : 0, 	type : "letter" },
		"N" : { x : 6, 		y : 3-1, 		pushed : 0, 	type : "letter" },
		"M" : { x : 7, 		y : 3-1, 		pushed : 0, 	type : "letter" },
		"-" : { x : 8, 		y : 3-1, 		pushed : 0, 	type : "extra",  },		
		"SHIFT" : { x : 9, 	y : 3-1, 		pushed : 0, 	type : "system", 	opacity : 0.35, 	extraLength : 2 },

		"." : { x : 11.5, 	y : 3-1, 		pushed : 0, 	type : "extra", 	opacity : 0.35 },
		"`" : { x : 12.5, 	y : 3-1, 		pushed : 0, 	type : "extra", 	opacity : 0.35 },		
		" " : { x : 13.5, 	y : 3-1, 		pushed : 0, 	type : "extra", 	opacity : 0.35, 	extraLength : 2 }
	},

	"keyWidth"		: 70,			"keyWidthPortrait"	: 42,
	"keyHeight"		: 50,
	"keyLineheight"		: 34,
	"keyPadding"		: 6,
	"font"			: "bold 32px Arial",
	
	"x"		: 0,
	"y"		: game["height"],
	"yDest"		: game["height"] - 200,
	"xInner"	: 236-180,				"xInnerPortrait"	: 20,
	"yInner"	: 20,

	"backgroundcolor"	: "#000000",
	"foregroundcolor"	: "#461c12",
	"hovercolor"		: "#602e22",
	"disabledcolor"		: "#AA0000",
	"opacity"		: 0.0,
	"shift"			: false,

	"view"			: "", // "" (=all), letter, number, extra or combination like letter/extra (system always shown)
	"status"		: "hidden", // show, hide, hidden
	"forceHiding"		: false // show, hide, hidden
};


// *** Image / sound manifest
manifest = new Array();

// *** Audio
switch(window.location.protocol) { case 'file:': gameEngine["audioNoBuffer"] = true; break; } // *** If LOCAL, no buffering
window.AudioContext = window.AudioContext||window.webkitAudioContext;
var soundContext;
var soundBufferLoader;
var soudBufferList;

// *** Device related checks and hacks before initializing
gameEngine["preloadMessage"] += deviceChecksPreInit();