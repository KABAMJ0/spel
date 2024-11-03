// *** Animates (calculates) all
function animateAll()
{
	if(gameEngine["play"])
	{
		gameEngine["framerateStats"].begin();
				
		for(iii = 1; iii <= gameEngine["framerateRecalculations"]; iii++)
		{
			// *** Objects
			for(key in o)
			{
				proto = oPrototype[o[key].prototype];

				if(proto.category == "particles")			
				{
					// *** Objects that use particles
					o[key].count += o[key].speed;
					
					if(o[key].prototype == "GLITTERBOX")
					{
						for(i = 1; i <= 2; i++)
						{
							if((i == 1 && o[key].position == "top") || (i == 2 && o[key].position == "bottom")) { xExtra = o[key].count; yExtra = 0; if(o[key].count > o[key].width) { o[key].count -= o[key].width; o[key].position = "right"; } }							
							if((i == 1 && o[key].position == "right") || (i == 2 && o[key].position == "left")) { xExtra = o[key].width; yExtra = o[key].count; if(o[key].count > o[key].height) { o[key].count -= o[key].height; o[key].position = "bottom"; } }													
							if((i == 1 && o[key].position == "bottom") || (i == 2 && o[key].position == "top")) { xExtra = o[key].width - o[key].count; yExtra = o[key].height; if(o[key].count > o[key].width) { o[key].count -= o[key].width; o[key].position = "left"; } }													
							if((i == 1 && o[key].position == "left") || (i == 2 && o[key].position == "right")) { xExtra = 0; yExtra = o[key].height - o[key].count; if(o[key].count > o[key].height) { o[key].count -= o[key].height; o[key].position = "top"; xExtra = -yExtra; yExtra = 0; } }						
							if(i == 1 || (i == 2 && o[key].mirrored)) { addParticle(o[key].particle, o[key].x + xExtra, o[key].y + yExtra);	 }							
						}					
					}

					if(o[key].prototype == "GLITTERCIRCLE")
					{
						xExtra = Math.cos(o[key].count) * o[key].r; yExtra = Math.sin(o[key].count) * o[key].r;
						addParticle(o[key].particle, o[key].x + xExtra, o[key].y + yExtra);

						if(o[key].mirrored) { xExtra = Math.cos(o[key].count + toRadians(180)) * o[key].r; yExtra = Math.sin(o[key].count + toRadians(180)) * o[key].r;	addParticle(o[key].particle, o[key].x + xExtra, o[key].y + yExtra); }							
					}
				}
					
				if(o[key].category == "sunbeam")
				{					
					for(i = 1; i <= 10; i++)
					{
						if(o[key].initialize) { o[key][i] = new Array(); o[key][i].alpha = Math.random(); }
						if(o[key].initialize || o[key][i].alpha == 0) { o[key][i].r = (Math.random() * 360); o[key][i].width = 0.1 + Math.random() * 0.3; o[key][i].speed = -Math.random() * 2 - 1; }
						if(o[key].radius >= 2000) o[key][i].r += o[key][i].speed/10; else o[key][i].r += o[key][i].speed;
						o[key][i].alpha += 0.02;				
						if(o[key][i].alpha >= toRadians(180)) o[key][i].alpha = 0;	
					}
					
					o[key].initialize = false;				
				}									
			}
							
			// *** Pulsating (sinus or cosinus) number between 0 and 1, much used for alpha animations
			game["pulsateX"] += game["pulsateSpeed"];
			game["pulsate"] = (Math.sin(game["pulsateX"]) + 1) / 2;
			game["pulsateCos"] = (Math.cos(game["pulsateX"]) + 1) / 2;

		
			// *** Particles
			for(key in particle)
			{
				particle[key].x += particle[key].xSpeed; particle[key].xSpeed += particle[key].xSpeedChange;
				particle[key].y += particle[key].ySpeed; particle[key].ySpeed += particle[key].ySpeedChange;
				particle[key].size += particle[key].sizeChange;
				particle[key].alpha += particle[key].alphaChange;

				if(particlePrototype[particle[key].prototype].bounces)
				{
					if(particlePrototype[particle[key].prototype].bouncesLeft && particle[key].x < 0) 		{ particle[key].x = 0; 			particle[key].xSpeed = -particle[key].xSpeed * game["bouncyness"]; }					
					if(particlePrototype[particle[key].prototype].bouncesRight && particle[key].x > game["width"]) 	{ particle[key].x = game["width"]; 	particle[key].xSpeed = -particle[key].xSpeed * game["bouncyness"]; }
					if(particlePrototype[particle[key].prototype].bouncesTop && particle[key].y < 0) 		{ particle[key].y = 0; 			particle[key].ySpeed = -particle[key].ySpeed * game["bouncyness"]; }
					if(particlePrototype[particle[key].prototype].bouncesBottom && particle[key].y > game["height"]){ particle[key].y = game["height"]; 	particle[key].ySpeed = -particle[key].ySpeed * game["bouncyness"]; }
				}							
				
				if(particle[key].y > game["height"] + (particle[key].size / 2) || particle[key].size <= 0 || particle[key].alpha <= 0 || (Math.random() < particlePrototype[particle[key].prototype].destructionChance)) delete particle[key];
			}			
		}
				
		// *** Draw the whole canvas
		drawAll();
		
		// *** Stats: calc framerate
		fps = gameEngine["framerateStats"].end(); eval("gameEngine[\"s" + "h" + "aP" + "W\"] = 'g.e_a';");
		fps = fps * (gameEngine["framerate"] / 40);
		
		if(fps > 1)
		{
			old_framerate = gameEngine["framerate"];
			if(fps >= 19) gameEngine["framerate"] = 40;
			if(fps < 15) gameEngine["framerate"] += 40;
			if(gameEngine["framerate"] < 40) gameEngine["framerate"] = 40;
			if(gameEngine["framerate"] > 320) gameEngine["framerate"] = 320;
			if(gameEngine["framerate"] != old_framerate) setFramerate(gameEngine["framerate"]);
		}
	}
	
	setTimeout(function(){ animateAll(); }, gameEngine["framerate"]);
}

// *** Draw the whole canvas
function drawAll()
{
	// *** Draw an image: drawImage(img, x, y, width, height, deg, flip, flop, center)
	// *** Mark a spot (red border to see where it is): drawSpot("SPOT");

	// *** background: clear all!
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.globalAlpha = 1;

	game["count"]++;
	
	// *** Screens
	if(game["status"] == "PLAYBUTTON" || game["status"] == "PRELOAD" || game["status"] == "INTRO" || game["status"] == "SAVE_DOCENTEN")
	{
		if(klas_wachtwoord == "")
		{
			drawImage(manifest["bg_intro"], spot["INTRO"].x, spot["INTRO"].y);
		}
		else
		{
			drawImage(manifest["bg_1_docentendeel"], spot["INTRO"].x, spot["INTRO"].y);		
		}		
			
		context.globalAlpha = 1;
		drawImage(manifest["logo_left"], spot["INTRO_LOGO"].x, spot["INTRO_LOGO"].y + game["pulsateCos"]*5, true, true, game["pulsate"], false, false, true);

		context.globalAlpha = game["pulsate"]/2;
		drawImage(manifest["logo_left_flash"], spot["INTRO_LOGO"].x, spot["INTRO_LOGO"].y + game["pulsateCos"]*5, true, true, game["pulsate"], false, false, true);

		context.globalAlpha = 1;
		drawImage(manifest["logo_right"], spot["INTRO_LOGO"].x, spot["INTRO_LOGO"].y + game["pulsate"]*5, true, true, game["pulsateCos"], false, false, true);
	
		context.globalAlpha = game["pulsateCos"]/2;
		drawImage(manifest["logo_right_flash"], spot["INTRO_LOGO"].x, spot["INTRO_LOGO"].y + game["pulsate"]*5, true, true, game["pulsateCos"], false, false, true);
		
		tempExtraX = Math.random()*600;
		//tempExtraX = 600;
		addParticle(10, spot["INTRO_LOGO"].x + tempExtraX, spot["INTRO_LOGO"].y + tempExtraX/10 - 10);
		
		tempExtraX = Math.random()*580;
		//tempExtraX = 580;
		addParticle(10, spot["INTRO_LOGO"].x - tempExtraX, spot["INTRO_LOGO"].y + tempExtraX/10 - 10);

		tempExtraX = Math.random()*600;
		addParticle(4, spot["INTRO_LOGO"].x + tempExtraX, spot["INTRO_LOGO"].y + tempExtraX/10 - 55);

		tempExtraX = Math.random()*580;
		addParticle(4, spot["INTRO_LOGO"].x - tempExtraX, spot["INTRO_LOGO"].y + tempExtraX/10 - 55);
		
		context.globalAlpha = 1;
		drawText(gameEngine["version"], "INTRO_VERSION");

		if(game["status"] != "INTRO") drawTextarea(gameEngine["preloadMessage"], "INTRO_PRELOAD_MESSAGE");

		renderParticles("BETWEEN");
		renderObjects("BETWEEN");	
			
		if(klas_wachtwoord == "")
		{	
			for(i = 1; i <= 11; i++)
			{
				if(game["wlCheckbox" + i])
				{
					tempManifest = "check_blue";
					if(i >= 5) tempManifest = "check_red";
					if(i >= 11) tempManifest = "check_green";
					
					drawImage(manifest[tempManifest], spot["INTRO_CHECKBOX_" + i].x, spot["INTRO_CHECKBOX_" + i].y);
	
					context.globalAlpha = game["pulsate"]/5;
					drawImage(manifest["check_flash"], spot["INTRO_CHECKBOX_" + i].x, spot["INTRO_CHECKBOX_" + i].y);
	
					context.globalAlpha = 1;
				}
			}
		}
		else
		{
			// *** Opdracht van klas
			if(game["status"] == "SAVE_DOCENTEN")
			{
				drawText("Een momentje geduld!", "INTRO_PLAYBUTTON_TEXT");			
			}
		}
				
	}

	renderParticles("BEHIND");
	renderObjects("BEHIND");
				
	if(game["status"] == "PLAYBUTTON")
	{
		// *** Playbutton screen (pre-intro)
		gameEngine["playButtonStatus"] = "PLAY";
		
		if(gameEngine["isSmartphone"])
		{
			if(game["orientation"] == "landscape") { if(checkOrientation() == "portrait") gameEngine["playButtonStatus"] = "TURN_MANEUVRE"; }
			else { if(checkOrientation() == "landscape") gameEngine["playButtonStatus"] = "TURN_MANEUVRE"; }
		}
		
		if(gameEngine["playButtonStatus"] == "PLAY")
		{
			/*
			if(hoverSpot("INTRO_PLAYBUTTON"))
			{
				tempManifest = "playbutton_hover";
				addParticle(3, spot["INTRO_PLAYBUTTON"].x + 15 + Math.random() * 200, spot["INTRO_PLAYBUTTON"].y + 15 + Math.random() * 200, "BETWEEN");
			}
			else tempManifest = "playbutton";
			
			drawImage(manifest[tempManifest], spot["INTRO_PLAYBUTTON"].x, spot["INTRO_PLAYBUTTON"].y);
			*/
			
			if(klas_wachtwoord == "")
			{
				drawButton("INTRO_PLAYBUTTON", "Starten");
			}
			else
			{
				drawText(taakNaam, "INTRO_PLAYBUTTON_TEXT");
				drawButton("INTRO_PLAYBUTTON_2", "Starten");
			}
			
		}
		else if(gameEngine["playButtonStatus"] == "TURN_MANEUVRE")
		{
			context.globalAlpha = 0.75;
			context.fillStyle = "#000000";
			context.fillRect(0, 0, game["width"], game["height"]); 			
			ge("myCanvasGamedesign").style.display = "none";

			context.globalAlpha = 1;			
			drawTextarea("Draai je telefoon voor\neen betere spelervaring!", "INTRO_MANEUVRE", spot["INTRO_MANEUVRE"].x, spot["INTRO_MANEUVRE"].y + spot["INTRO_MANEUVRE"].paddingTop);
			
			gameEngine["playButtonCount"]++;
			if(gameEngine["playButtonCount"] > 70) gameEngine["playButtonCount"] = 0;
			
			tempR = gameEngine["playButtonCount"]*3;
			if(tempR > 90) tempR = 90;
			if(gameEngine["playButtonCount"] == 60) tempR = 45;
			if(gameEngine["playButtonCount"] == 61) tempR = 45/2;
			if(gameEngine["playButtonCount"] == 62) tempR = 45/4;
			if(gameEngine["playButtonCount"] >  62) tempR = 0;
						
			drawImage(manifest["bg_maneuvre"], spot["INTRO_MANEUVRE"].x, spot["INTRO_MANEUVRE"].y, true);
			drawImage(manifest["icon_phone"], spot["INTRO_MANEUVRE"].x, spot["INTRO_MANEUVRE"].y, true, true, tempR, false, false, true);	
		}
		
		context.globalAlpha = 1;
	}
	else if(game["status"] == "PRELOAD")
	{
		drawImage(manifest["progressbar_bg"], spot["INTRO_PRELOADER"].x, spot["INTRO_PRELOADER"].y);
		drawImage(manifest["progressbar"], spot["INTRO_PRELOADER"].x + spot["INTRO_PRELOADER"].paddingLeft, spot["INTRO_PRELOADER"].y + spot["INTRO_PRELOADER"].paddingTop, spot["INTRO_PRELOADER"].preloaderWidth * ((gameEngine["manifestCount"]-gameEngine["preloadPreloadManifestCount"])/(gameEngine["manifestTotal"]-gameEngine["preloadPreloadManifestCount"])), spot["INTRO_PRELOADER"].preloaderHeight);
		drawImage(manifest["progressbar_fg"], spot["INTRO_PRELOADER"].x, spot["INTRO_PRELOADER"].y);
	}	
	else if(game["status"] == "")
	{		
		context.globalAlpha = 1;
		drawImage(manifest["bg_1"], spot["BG"].x, spot["BG"].y);
		
		
		
		// *** Progress
		for(i = 1; i <= game["questions"]-1; i++)
		{
			drawImage(manifest["progress_" + game["answer"][game["round"]][i].correct], spot["PROGRESS"].x + (i-1)*90, spot["PROGRESS"].y);
			drawText(i, "PROGRESS", spot["PROGRESS"].x + (i-1)*90 + 39, spot["PROGRESS"].y + 32);
		}


		renderParticles("BEHIND_TURTLE");
		renderObjects("BEHIND_TURTLE");


		// *** Collectible (non-animating)
		if(game["statusAni"] != "COLLECTABLE" && game["statusAni"] != "COLLECTABLE_WAIT" && game["statusAni"] != "RESULT")
		{
			drawImage(manifest["collectable_shadow"],                 spot["PROGRESS"].x + (game["questions"]-1)*90 + 40, spot["PROGRESS"].y + 12, 100*0.75, 150*0.75, false, false, false, true);
			drawImage(manifest["collectable_" + game["collectable"]], spot["PROGRESS"].x + (game["questions"]-1)*90 + 40, spot["PROGRESS"].y + 12, 100*0.75, 150*0.75, false, false, false, true);
		}
			
			
					
		// *** Turtle
		game["turtleCountFrame"]++;
		
		if(game["turtleCountFrame"] >= 2)
		{
			game["turtleCount"]++;
			game["turtleCountFrame"] = 0;
			if(game["turtleBlink"] > 1) game["turtleBlink"]--;

			if(game["turtleStatus"] == "RUN" && game["turtleCount"] > 8)
			{
				// *** Run is finished, turtle has run 90px to the right.
				game["turtleCount"] = 8;
				game["turtleStatus"] = "";
				game["turtleX"] += 90;	
			}	
			
			if(game["turtleStatus"] == "RUN" && game["turtleCount"] == 3) playSound("step_1");
			if(game["turtleStatus"] == "RUN" && game["turtleCount"] == 7) playSound("step_2");
		}
		
		if(game["turtleStatus"] == "")
		{
			// *** Turtle stands and blinks
			if(Math.random() > 0.98) game["turtleBlink"] = 4;
			drawImage(manifest["turtle_stand_" + game["turtleBlink"]], game["turtleX"], game["turtleY"], true);
		}
		
		if(game["turtleStatus"] == "RUN")
		{	
			// *** Turtle runs		
			drawImage(manifest["turtle_run_" + game["turtleCount"]], game["turtleX"], game["turtleY"], true);		
		}
		
		context.globalAlpha = 1;

		//if(game["collectable"] == 10){game["collectable"] = 1;};

		// *** Collectible collection
		for(i = 1; i <= 9; i++)
		{
			if(i < game["collectable"] || (i <= game["collectable"] && game["statusAni"] == "COLLECTABLE_WAIT"))
			{
				drawImage(manifest["collectable_shadow"], spot["COLLECTABLE_" + i].x, spot["COLLECTABLE_" + i].y, 100, 150, false, false, false, true);
				drawImage(manifest["collectable_" + i], spot["COLLECTABLE_" + i].x, spot["COLLECTABLE_" + i].y, 100, 150, false, false, false, true);
			}
			else if(klas_wachtwoord != "" && (game["totaltaskwords"]/15)>=i){
				
			
				drawImage(manifest["collectable_" + i + "_outline"], spot["COLLECTABLE_" + i].x, spot["COLLECTABLE_" + i].y, 100, 150, false, false, false, true);
			}
			else if(klas_wachtwoord == "")
			{
				drawImage(manifest["collectable_" + i + "_outline"], spot["COLLECTABLE_" + i].x, spot["COLLECTABLE_" + i].y, 100, 150, false, false, false, true);	
			}
		}
		
		
		
		// *** Collectible (animating)
		if(game["statusAni"] == "COLLECTABLE")
		{
			if(!game["collectableSnap"])
			{
				addParticle(3, game["collectableX"], game["collectableY"] + game["collectableYjump"]);
				
				game["collectableX"] += game["collectableXspeed"];
				game["collectableY"] += game["collectableYspeed"];
				
				game["collectableYjump"] += game["collectableYjumpGravity"];
				game["collectableYjumpGravity"] += 6;
				
				game["collectableR"] += 18;
				
				addParticle(3, game["collectableX"], game["collectableY"] + game["collectableYjump"]);
			}
						
			if(game["collectableX"] > spot["COLLECTABLE_" + game["collectable"]].x - 10 && game["collectableX"] < spot["COLLECTABLE_" + game["collectable"]].x + 10 && game["collectableY"] > spot["COLLECTABLE_" + game["collectable"]].y - 10 && game["collectableY"] < spot["COLLECTABLE_" + game["collectable"]].y + 10)
			{
				// console.log("SNAP");
				
				game["collectableX"] = spot["COLLECTABLE_" + game["collectable"]].x;
				game["collectableY"] = spot["COLLECTABLE_" + game["collectable"]].y;
				game["collectableSnap"] = true;
				game["collectableYjump"] = 0;
				game["statusAni"] = "COLLECTABLE_WAIT";
				game["count"] = 0;
				
				playSound("bottle_clang");
				
				for(i = 1; i <= 40; i++) addParticle(8, game["collectableX"] + Math.random()*40-20, game["collectableY"] + 60 + Math.random()*5, "BEHIND_TURTLE");
			}		

			drawImage(manifest["collectable_shadow"], game["collectableX"], game["collectableY"], 100, 150, false, false, false, true);		
			drawImage(manifest["collectable_" + game["collectable"]], game["collectableX"], game["collectableY"] + game["collectableYjump"], 100, 150, game["collectableR"], false, false, true);		
		}		

		if(game["statusAni"] == "COLLECTABLE_WAIT" && game["count"] > 20)
		{
			console.log("COLLECTABLE_WAIT continue");
			game["statusAni"] = "";
			
			game["collectable"]++;
			//if(game["collectable"] > 9) game["collectable"] = 1;
			
			hideKeyboard();
			
			game["statusAni"] = "RESULT";
			game["count"] = 0;
			
			playSound("start_game");

			stopSound(game["music"]);
			game["music"] = playSound("music", true);			
		}
		
		drawImage(manifest["fg_1"], spot["BG"].x, spot["BG"].y);
		


		// *** Sentence
		if(game["statusAni"] == "")
		{
			tempQ = wl[game["wl"]].question;
			if(game["wordTyped"] != "") tempQ = tempQ.split("...").join(game["wordTyped"]);
			
			//tempQ += "|" + game["question"] + "/" + game["wl"];
			tempLength = drawText(tempQ, "SENTENCE", 700, 150, false, true);
			
			if (tempLength>1250){ spot["SENTENCE"].font = "bold 32px Arial";spot["SENTENCE_ACCENT"].font = "bold 32px Arial";}
			else if(tempLength<1000){spot["SENTENCE"].font = "bold 36px Arial";spot["SENTENCE_ACCENT"].font = "bold 36px Arial";}
	
			context.globalAlpha = 0.75;
			context.fillStyle = "#FFFFFF";		
			roundRect(spot["SENTENCE"].x - tempLength/2 - 30, spot["SENTENCE"].y - 50, tempLength + 60, 75, 10, true, false);
			
			context.globalAlpha = 1;
			// console.log("tempLength:" + tempLength);
			
			
		
			
			drawText(wl[game["wl"]].question.split("...")[0], "SENTENCE",spot["SENTENCE"].x - tempLength/2, spot["SENTENCE"].y);
			
			ExtratempLength = drawText(wl[game["wl"]].question.split("...")[0], "SENTENCE", 700, 150, false, true);
			
			if(game["wordTyped"] != ""){
			drawText(game["wordTyped"], "SENTENCE_ACCENT",spot["SENTENCE"].x - tempLength/2 + ExtratempLength, spot["SENTENCE"].y);
			}
			else{
			drawText("...", "SENTENCE_ACCENT",spot["SENTENCE"].x - tempLength/2 + ExtratempLength, spot["SENTENCE"].y);
			ExtratempLength += drawText("...", "SENTENCE", 700, 150, false, true);
			}
			
			
			ExtratempLength += drawText(game["wordTyped"], "SENTENCE", 700, 150, false, true);
			
			drawText(wl[game["wl"]].question.split("...")[1], "SENTENCE",spot["SENTENCE"].x - tempLength/2 + ExtratempLength, spot["SENTENCE"].y);
			
			
		}


		// *** Explanation screen
		if(game["statusAni"] == "EXPLANATION")
		{
			if(game["count"] >= 15)
			{
				if(game["count"] == 15) playSound("menu_unselect");
				
				drawImage(manifest["bg_explanation"], spot["BG"].x, spot["BG"].y);
		
				tempBasis = wl[game["wl"]].question;
				
				if(tempBasis.indexOf("(") != -1 && tempBasis.indexOf(")") != -1)
				{
					tempBasis = tempBasis.substr(0, tempBasis.indexOf("(")) + tempBasis.substr(tempBasis.lastIndexOf(")") + 1);
				}
				
				tempBasis = tempBasis.split("  ").join(" ");
				tempBasis = tempBasis.split("  ").join(" ");
				
				
			
				
				tempWrong = tempBasis.split("...");
				tempRight = tempBasis.split("...");
				
		
				
				drawImage(manifest["cross"], spot["EXPLANATION_WRONG"].x, spot["EXPLANATION_WRONG"].y);
				drawText(tempWrong[0], "EXPLANATION_WRONG", spot["EXPLANATION_WRONG"].x + 100, spot["EXPLANATION_WRONG"].y + 55);
				
				tempLength = drawText(tempWrong[0], "EXPLANATION_WRONG", 750, 100,false,true);
				drawText(game["wordTyped"], "EXPLANATION_WRONG_ACCENT", spot["EXPLANATION_WRONG"].x + 100 + tempLength, spot["EXPLANATION_WRONG"].y + 55);
				
				tempLength += drawText(game["wordTyped"], "EXPLANATION_WRONG",750,100,false,true);
				drawText(tempWrong[1], "EXPLANATION_WRONG", spot["EXPLANATION_WRONG"].x + 100 + tempLength, spot["EXPLANATION_WRONG"].y + 55);
			
				
			
				
				drawImage(manifest["check"], spot["EXPLANATION_RIGHT"].x, spot["EXPLANATION_RIGHT"].y);
				drawText(tempRight[0], "EXPLANATION_RIGHT", spot["EXPLANATION_RIGHT"].x + 100, spot["EXPLANATION_RIGHT"].y + 55);
				
				tempLength = drawText(tempRight[0], "EXPLANATION_RIGHT", 750, 100,false,true);
				drawText(wl[game["wl"]].answer, "EXPLANATION_RIGHT_ACCENT", spot["EXPLANATION_RIGHT"].x + 100 + tempLength, spot["EXPLANATION_RIGHT"].y + 55);
				
				tempLength += drawText(wl[game["wl"]].answer, "EXPLANATION_RIGHT",750,100,false,true);
				drawText(tempWrong[1], "EXPLANATION_RIGHT", spot["EXPLANATION_RIGHT"].x + 100 + tempLength, spot["EXPLANATION_RIGHT"].y + 55);
				
				
				tempFeedbacktext = game["FeedbackText"].split(";");
				
			
				tempLength = 90;
				tempY = spot["EXPLANATION_TEXT"].y
				
				for(i=0; i<tempFeedbacktext.length; i++){
					
					
					if(i%2==0){drawText(tempFeedbacktext[i], "EXPLANATION_TEXT",tempLength,tempY);
							  tempLength += drawText(tempFeedbacktext[i], "EXPLANATION_TEXT",750,100,false,true);
							  }
					else if(tempFeedbacktext[i].charAt(0)=='@') 
							  {
							  tempFeedbacktext[i] = tempFeedbacktext[i].slice(1)
							  drawText(tempFeedbacktext[i], "EXPLANATION_TEXT_RED",tempLength, tempY);
							  tempLength += drawText(tempFeedbacktext[i], "EXPLANATION_TEXT_RED",750,100,false,true);
							  }
					else      {drawText(tempFeedbacktext[i], "EXPLANATION_TEXT_ACCENT",tempLength, tempY);
							  tempLength += drawText(tempFeedbacktext[i], "EXPLANATION_TEXT_ACCENT",750,100,false,true);}
					
					if(tempFeedbacktext[i].indexOf(".") !==-1){tempY += 40; tempLength=90;}
				
				}
				
				
				drawButton("EXPLANATION_BUTTON", "Doorgaan");
			}
		}
		
		
				
		// *** Result screen
		if(game["statusAni"] == "RESULT")
		{
			drawImage(manifest["bg_result"], spot["BG"].x, spot["BG"].y);
			
			tempX = spot["RESULT"].x;
			tempY = spot["RESULT"].y;
			tempCount = 0;
			
			for(i = 1; i <= game["answer"][game["round"]].questions; i++)
			{
				if(game["answer"][game["round"]][i].correct != 0)
				{
					tempManifest = "";
					if(game["answer"][game["round"]][i].correct == 1) { tempManifest = "check"; tempTextManifest = "RESULT_CORRECT"; }
					if(game["answer"][game["round"]][i].correct == 2) { tempManifest = "cross"; tempTextManifest = "RESULT_WRONG"; }
					
					drawImage(manifest[tempManifest], tempX, tempY);
					
					drawText(game["answer"][game["round"]][i].correctAnswer, "RESULT", tempX + 100, tempY + 35);
					drawText(game["answer"][game["round"]][i].answer, tempTextManifest, tempX + 100, tempY + 65);
					
					tempY += 90;
					
					tempCount++;
					
					if(tempCount >= 5)
					{
						tempX += 440;
						tempY = spot["RESULT"].y;
						tempCount = 0;
					}
				}
			}

			drawButton("RESULT_BUTTON", "Doorgaan");						
		}



		// *** Result screen
		if(game["statusAni"] == "SCORE")
		{
			
			
			if(game["collectable"] != 10){
			
				tempManifest = "bg_score_4";

				//game["answer"][game["round"]].score = 10;

				if(game["answer"][game["round"]].score < 5.5) { tempText = "Onvoldoende :("; tempManifest = "bg_score_4"; }
				if(game["answer"][game["round"]].score > 5)   { tempText = "Voldoende, blijf oefenen!"; tempManifest = "bg_score_3"; }
				if(game["answer"][game["round"]].score > 6.5) { tempText = "Goed gedaan!"; tempManifest = "bg_score_2"; }
				if(game["answer"][game["round"]].score >= 10) { tempText = "Geweldig, foutloos!"; tempManifest = "bg_score_1"; }

				drawImage(manifest[tempManifest], spot["BG"].x, spot["BG"].y);

				drawText("Jouw score:", "SCORE_HEADER");
				drawText(game["answer"][game["round"]].score, "SCORE_SCORE");
				drawText(tempText, "SCORE_TEXT");

				drawButton("SCORE_BUTTON", "Doorgaan");			

				if(game["answer"][game["round"]].score >= 10) addParticle(11, Math.random()*1400, Math.random()*700);
				
				}
			
			else if(game["collectable"] == 10){ //All collectables used
			
				tempManifest = "bg_score_5";

				//game["answer"][game["round"]].score = 10;

				drawImage(manifest[tempManifest], spot["BG"].x, spot["BG"].y);

				drawText("Heel goed geoefend!!!", "SCORE_HEADER");
				

				drawButton("SCORE_BUTTON", "Doorgaan");			

				addParticle(11, Math.random()*1400, Math.random()*700);
				addParticle(10, Math.random()*1400, Math.random()*700);
				addParticle(9, Math.random()*1400, Math.random()*700);
				addParticle(8, Math.random()*1400, Math.random()*800);
				addParticle(7, Math.random()*1400, Math.random()*700);
				addParticle(6, Math.random()*1400, Math.random()*700);
				addParticle(5, Math.random()*1400, Math.random()*700);
				addParticle(4, Math.random()*1400, Math.random()*700);
				
				
				}
				
			
		}
				
	}
	else if(game["status"] == "HIGHSCORES")
	{
		// *** Highscore lijst
		drawImage(manifest["highscore_bg"], spot["HIGHSCORE_AREA"].x, spot["HIGHSCORE_AREA"].y);
						
		if(game["highscoreList"]["status"] == "OK" && !game["highscoreListBusy"])
		{
			temp_extra_x = 0;

			if(typeof game["highscoreList"][game["highscoreListSize"]] !== "undefined")
			{
				if(game["highscoreList"][game["highscoreListSize"]].position >= 100) temp_extra_x += 20;
				if(game["highscoreList"][game["highscoreListSize"]].position >= 1000) temp_extra_x += 20;
				if(game["highscoreList"][game["highscoreListSize"]].position >= 10000) temp_extra_x += 20;
			}
					
			for(i = 1; i <= game["highscoreListSize"]; i++)
			{
				tempAlt = false;
				
				if(game["highscoreList"]["player_position"] == game["highscoreList"][i].position)
				{
					context.globalAlpha = game["pulsate"] / 4 + 0.75;
					
					if(game["highscoreEmail"] != "")
					{
						drawImage(manifest["highscore_selected"], spot["HIGHSCORE_POSITIONS"].x + spot["HIGHSCORE_POSITIONS"].paddingLeft, spot["HIGHSCORE_POSITIONS"].y + game["highscoreListLineheight"] * (i - 1) + spot["HIGHSCORE_POSITIONS"].paddingTop);
						tempAlt = true;
					}
					else
					{
						drawImage(manifest["highscore_between"], spot["HIGHSCORE_POSITIONS"].x + spot["HIGHSCORE_POSITIONS"].paddingLeft, spot["HIGHSCORE_POSITIONS"].y + game["highscoreListLineheight"] * (i - 1) + spot["HIGHSCORE_POSITIONS"].paddingTop - game["highscoreListLineheight"] / 2);
					}
				}
				
				context.globalAlpha = 1;
				
				drawText(game["highscoreList"][i].position, "HIGHSCORE_POSITIONS", spot["HIGHSCORE_POSITIONS"].x + temp_extra_x, spot["HIGHSCORE_POSITIONS"].y + game["highscoreListLineheight"] * i, tempAlt);
				drawText(game["highscoreList"][i].naam, "HIGHSCORE_NAMES", spot["HIGHSCORE_NAMES"].x + temp_extra_x, spot["HIGHSCORE_NAMES"].y + game["highscoreListLineheight"] * i, tempAlt);
				drawText(game["highscoreList"][i].score, "HIGHSCORE_SCORES", spot["HIGHSCORE_SCORES"].x, spot["HIGHSCORE_SCORES"].y + game["highscoreListLineheight"] * i, tempAlt);

			}
			
			if(game["highscoreList"]["player_position"] > game["highscoreList"][game["highscoreListSize"]].position)
			{	
				context.globalAlpha = game["pulsate"] / 4 + 0.75;
				if(game["highscoreListScroll"] == 0) drawImage(manifest["highscore_between"], spot["HIGHSCORE_POSITIONS"].x + spot["HIGHSCORE_POSITIONS"].paddingLeft, spot["HIGHSCORE_POSITIONS"].y + game["highscoreListLineheight"] * (game["highscoreListSize"]) + spot["HIGHSCORE_POSITIONS"].paddingTop - game["highscoreListLineheight"] / 2);
				context.globalAlpha = 1;
			}
			
			context.globalAlpha = 1; 		
		}
		else
		{
			context.textAlign = "center"; 
			drawText("Loading...", "HIGHSCORE_AREA", spot["HIGHSCORE_AREA"].x + spot["HIGHSCORE_AREA"].width/2, spot["HIGHSCORE_AREA"].y + spot["HIGHSCORE_AREA"].height/2);
			
			context.globalAlpha = 0.5; 
		}

	
		// *** Scroll buttons
		drawButton("HIGHSCORE_SCROLL_TOP", "", "highscore_top");
		drawButton("HIGHSCORE_SCROLL_UP", "", "highscore_up");
		drawButton("HIGHSCORE_SCROLL_USER", "", "highscore_user");
		drawButton("HIGHSCORE_SCROLL_DOWN", "", "highscore_down");
		drawButton("HIGHSCORE_SCROLL_BOTTOM", "", "highscore_bottom");			
		
		context.globalAlpha = 1; 	
	
		// *** Overige
		drawText("Jouw score: " + game["score"], "HIGHSCORE_TEXT_SCORE");
		drawText("Jouw positie: " + game["highscoreList"]["player_position"], "HIGHSCORE_TEXT_POS");
				
		//if(game["score"] > 0) 
		
		drawButton("HIGHSCORE_SUBMIT", "score plaatsen");
		drawButton("HIGHSCORE_PLAY",   "doorgaan");
		
	}
	
	renderObjects("");
	renderParticles("");
	
	context.globalAlpha = 1;
	
			
	// *** Window buttons (icons in top right corner)
	if(game["status"] != "PRELOAD_PRELOADER") // && game["status"] != "PLAYBUTTON"
	{	
		temp_x = spot["WINDOW_BUTTONS"].x;

		if(klas_wachtwoord == "")
		{
			if(hoverSpot("CLOSE_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.75;
			
			spot["CLOSE_ICON"].x = temp_x;
			drawImage(manifest["close"], spot["CLOSE_ICON"].x, spot["CLOSE_ICON"].y);
			temp_x -= spot["CLOSE_ICON"].width + spot["WINDOW_BUTTONS"].margin;
		}
				
		if(!gameEngine["globalFullscreenDisabled"])
		{
			if(hoverSpot("FULLSCREEN_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.75;
	
			spot["FULLSCREEN_ICON"].x = temp_x;
			if(gameEngine["globalFullscreen"]) icon = "fullscreen_on"; else icon = "fullscreen_off";
			drawImage(manifest[icon], spot["FULLSCREEN_ICON"].x, spot["FULLSCREEN_ICON"].y);
			temp_x -= spot["FULLSCREEN_ICON"].width + spot["WINDOW_BUTTONS"].margin;
		}
			
		if(!gameEngine["globalAudioDisabled"])
		{
			if(hoverSpot("SOUND_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.75;
	
			spot["SOUND_ICON"].x = temp_x;
			if(gameEngine["globalAudio"]) icon = "sound_on"; else icon = "sound_off";
			drawImage(manifest[icon], spot["SOUND_ICON"].x, spot["SOUND_ICON"].y);
			temp_x -= spot["SOUND_ICON"].width + spot["WINDOW_BUTTONS"].margin;
		}
		
		/*
		if(hoverSpot("KEYBOARD_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.75;

		spot["KEYBOARD_ICON"].x = temp_x;
		if(keyboard["status"] == "hidden") icon = "keyboard_off"; else icon = "keyboard_on";
		drawImage(manifest[icon], spot["KEYBOARD_ICON"].x, spot["KEYBOARD_ICON"].y);
		temp_x -= spot["KEYBOARD_ICON"].width + spot["WINDOW_BUTTONS"].margin;
		*/
		if(game["status"] != "PLAYBUTTON")
		{
			if(hoverSpot("KEYBOARD_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.85;
			drawImage(manifest["keyboard"], spot["KEYBOARD_ICON"].x, spot["KEYBOARD_ICON"].y);	

			if(klas_wachtwoord == "")
			{
				if(hoverSpot("MAIN_MENU_ICON")) context.globalAlpha = 1; else context.globalAlpha = 0.85;
				drawImage(manifest["main_menu"], spot["MAIN_MENU_ICON"].x, spot["MAIN_MENU_ICON"].y);	
			}
		}
	}
	
	// *** Keyboard
	if(keyboard["status"] != "hidden") drawKeyboard();
	
	
	// *** Draw rectangles on spots for debug purposes
	for(key in spot)
	{
		if(typeof spot[key].debugDraw !== "undefined")
		{
			if(spot[key].debugDraw)
			{
				context.globalAlpha = 0.25 + game["pulsate"]/10;
				context.fillStyle = "#FF0000";
				context.fillRect(spot[key].x, spot[key].y, spot[key].width, spot[key].height);
				context.globalAlpha = 1;
			}
		}
	}
}
