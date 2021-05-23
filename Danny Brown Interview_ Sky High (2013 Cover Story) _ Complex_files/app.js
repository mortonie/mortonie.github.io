/*
 * Superscrollorama Helper Plugin 
 * Author: Philip Leesha
 * 
 * Add animations to the animations method. 
 * All other functionality is built. Including adding the bounce to the scroll down indicator and resizing events.
 * 
 */

;(function ( window, document, $, undefined ) {
	'use strict';
	
	var options = {
        baseScale: 1200
	};
	
	var scroller = scroller || {},
		app = app || {};

	app = {

        init: function() {
        	
        	//local var
			var that = this,
				resizeOnce;

			//object variables
			this.windowHeight = window.innerHeight;
			this.windowWidth = window.innerWidth;
			this.resizeDiv = document.getElementById("resizingContent");
            this.trackView("1-DannyBrown-CoverVideo");
            this.doBounce('#cursor', 10, 800, 'bottom');
            
            //start
            this.load();

            $( window ).resize(function () {

				//reasign height and width
				that.windowWidth = window.innerWidth;
				that.windowHeight = window.innerHeight;
        
				//display resize div
				that.resizeDiv.style.display = "block";
        
				//clear timeout on resizing function
				clearTimeout( resizeOnce );
        
				//set another timeout 500ms till resizing 
				resizeOnce = setTimeout(function(){
					that.refresh();
				}, 500);

			});
            
            return this;
        },
        
        // Load scrollorama and resize
		load: function () {

			this.resizeAndReposition();
			this.create();
    
			return this;
		
		},
    
		// Create the scrollorama object and load animations
		create: function () {

		    scroller = new $.superscrollorama({
				triggerAtCenter: true
			});
		    this.animations();

		},
	 
		// Re-initialize scrollorama; destroys then reloads
		refresh: function () {

			window.scrollTo(0, 0);
			scroller.destroy();
			this.load();			
			return this;
		
		},

        animations: function() {
        	
        	//hide resize div if showing
			this.resizeDiv.style.display = "none";
			
        	var that = this;
            // Update per frame example!

            // SCENE: 0 (Intro)
            app._parallax (
                '#scene_intro',
                6250,
                [
                    { item: '.dannybrown',
                      fromTo: { start: -500, end: 3350 }
                    },
                    { item: '.clouds_small', scalePosition: 80,
                      fromTo: { start: 1100, end: 150 }
                    },
                    { item: '.title', scalePosition: true,
                      fromTo: { start: 1300, end: 1400 },
                    },
                    { item: '.clouds_top', scalePosition: 75,
                      fromTo: { start: 2200, end: 2000 },
                    },
                    { item: '.clouds_bottom', scalePosition: 70,
                      fromTo: { start: 2750, end: 2550 },
                    }
                ],
                { 
                	track: true,
                	scene: "2-FallBack-Intro"
                }
            );

            // SCENE: 1
            app._parallax(
                '#scene_1',
                4000,
                [
                    { item: '.dannybrown',
                      fromTo: { start: -335, end: 1750 }
                    },
                    { item: '.quotecloud',
                      fromTo: { start: 1500, end: 1350 }
                    },
                ]
            );

            scroller.pin($('#scene_1_quote'), 1000, { 
            	onUnpin: function(){
            		that.trackView("3-Childhood");
            	}
            });
            scroller.addTween($('#scene_1_quote'),
                (new TimelineLite())
                    .append([
                        TweenMax.fromTo($('#scene_1_quote').find('.quote'), 1, { css: { opacity: 0, top: 1200 }, immediateRender: true }, { css: { opacity: 1, top: 1000 } }),
                    ]).append([
                        TweenMax.fromTo($('#scene_1_past').find('.clouds_top'), .5, { css: { marginTop: 0 } }, { css: { marginTop: -515 } }),
                        TweenMax.fromTo($('#scene_1_past').find('.dannybrown_2'), .5, { css: { top: 0 }, immediateRender: true}, { css: { top: -300 } })
                    ]),
                3000
            );

            scroller.addTween($('#scene_1_past'),
                (new TimelineLite())
                    .append([
                        TweenMax.to($('#scene_1_past').find('.clouds_top'), .5, { css: { marginTop: -515 } }),
                        TweenMax.to($('#scene_1_past').find('.dannybrown_2'), 2, { css: { top: 1500 } }),
                        TweenMax.fromTo($('#scene_1_past').find('.pic1'), 1, { css: { top: 400 }, immediateRender: true }, { css: { top: 0 } }),
                        TweenMax.fromTo($('#scene_1_past').find('.pic4'), 1, { css: { top: 1000 }, immediateRender: true }, { css: { top: 600 } }),
                        TweenMax.fromTo($('#scene_1_past').find('.pic3'), 1, { css: { top: 500 }, immediateRender: true }, { css: { top: 400 } }),
                        TweenMax.fromTo($('#scene_1_past').find('.pic2'), 1, { css: { top: 450 }, immediateRender: true }, { css: { top: 200 } })
                    ]),
                3500
            );

            // SCENE 1 CAR
            scroller.pin($('#scene_1_car'), 4000, { 
            	onUnpin: function(){
            		that.trackView("4-Money-Loserville");
            	}
            });
            scroller.addTween($('#scene_1_car'),
                (new TimelineLite())
                    .append([
                        TweenMax.fromTo($('#scene_1_car').find('.car'), 1, { css: { scale: 0.1 }, immediateRender: true }, { css: { scale: 1 } }),
                        TweenMax.fromTo($('#scene_1_car').find('.fadetoblack'), 1, { css: { opacity: 0 }, immediateRender: true }, { css: { opacity:1 } })
                       ])
                    .append([
                        TweenMax.fromTo($('#scene_1_car').find('.quote'), .01, { css: { opacity: 0 }, immediateRender: true }, { css: { opacity:1 } })
                      ]),
                3000
            );

            // SCENE 2
            scroller.pin($('#scene_2'), 0, { onPin: function() {  } });
            scroller.addTween($('#scene_2_money'),
                (new TimelineLite())
                    .append([
                        //TweenMax.fromTo($('#scene_2_money').find('.dannybrown'), 1, { css: { top: -700 }, immediateRender: true }, { css: { top: 2000 } }),
                        TweenMax.fromTo($('#scene_2_money').find('.money_medium'), 1, { css: { top: 50 }, immediateRender: true }, { css: { top: -200 } }),
                        TweenMax.fromTo($('#scene_2_money').find('.money_large'), 1, { css: { top: 400 }, immediateRender: true }, { css: { top: -800 } })
                    ]),
                4000
            );
            scroller.addTween($('#scene_2_drugs'),
                (new TimelineLite())
                    .append([
                        TweenMax.fromTo($('#scene_2_drugs').find('.dannybrown'), 1, { css: { top: -550 }, immediateRender: true }, { css: { top: 3000 } })
                    ]),
                4000
            );


            // SCENE 3
            scroller.pin($('#scene_3'), 0, { onPin: function() {  } });

            scroller.pin($('#scene_3_jail'), 6500, {
                anim: (new TimelineLite())
                    .append(TweenMax.fromTo($('#scene_3_jail').find('.jail_2'), .25, { css: { opacity: 0 }, immediateRender: true }, { css: { opacity: 1 }, onComplete: function(){that.trackView("5-Jail");} }))
                    .append(TweenMax.fromTo($('#scene_3_jail').find('.jail_3'), .25, { css: { opacity: 0 }, immediateRender: true }, { css: { opacity: 1 } }))
                    .append(TweenMax.fromTo($('#scene_3_jail').find('#mark_1'), .1, { css: { opacity: 0 }, immediateRender: true }, { css: { opacity: 1 } }))
                    .append(TweenMax.fromTo($('#scene_3_jail').find('#mark_2'), .1, { css: { opacity: 0 }, immediateRender: true }, { css: { opacity: 1 } }))
                    .append(TweenMax.fromTo($('#scene_3_jail').find('#mark_3'), .1, { css: { opacity: 0 }, immediateRender: true }, { css: { opacity: 1 } }))
                    .append(TweenMax.fromTo($('#scene_3_jail').find('#mark_4, #mark_8'), .1, { css: { opacity: 0 }, immediateRender: true }, { css: { opacity: 1 } }))
                    .append(TweenMax.fromTo($('#scene_3_jail').find('.jail_4'), .25, { css: { opacity: 0 }, immediateRender: true }, { css: { opacity: 1 } }))
                   
                    .append(TweenMax.fromTo($('#scene_3_jail').find('#mark_5, #mark_9'), .1, { css: { opacity: 0 }, immediateRender: true }, { css: { opacity: 1 } }))
                    .append(TweenMax.fromTo($('#scene_3_jail').find('#mark_6, #mark_10'), .1, { css: { opacity: 0 }, immediateRender: true }, { css: { opacity: 1 } }))
                    .append(TweenMax.fromTo($('#scene_3_jail').find('#mark_7, #mark_11, #mark_12'), .1, { css: { opacity: 0 }, immediateRender: true }, { css: { opacity: 1 } }))
                    .append(TweenMax.fromTo($('#scene_3_jail').find('#mark_13'), .1, 
                        { 
                            css: { opacity: 0 }, 
                            immediateRender: true 
                        }, 
                        {
                             css: { opacity: 1 },
                             onComplete: function() {
                                console.log('Unpin marks');
                              //  TweenMax.fromTo($('#scene_3_jail').find('#mark_1, #mark_2, #mark_3, #mark_4, #mark_5, #mark_6, #mark_7, #mark_8, #mark_9, #mark_10, #mark_11, #mark_12'), 1, { css: { opacity: 1 }, immediateRender: true }, { css: { opacity: 0 } }) 
                             }
                        }
                    )
                    )
                    .append(TweenMax.to($('#scene_3_jail').find('#mark_1, #mark_2, #mark_3, #mark_4, #mark_5, #mark_6, #mark_7, #mark_8, #mark_9, #mark_10, #mark_11, #mark_12'), 1, { css: { opacity: 0 } }) ) 

                    .append(TweenMax.to($('#scene_3_jail').find('#mark_13'), .5, { css: { opacity: 0 } })) 
					.append(
						TweenMax.to($("#jailLastMinute"), .1, {css:{opacity: 1}})
					)
                    .append(TweenMax.fromTo($('#scene_3_jail').find('.dannybrown'), 2, { css: { top: -800 }, immediateRender: true }, { css: { top: 300 } })) 

            });


            // SCENE 4
            scroller.pin($('#scene_4'), 0, { onPin: function() {that.trackView("6-Bus");  } });
            scroller.pin($('#scene_4_roadtrip'), 10000, {
                anim: (new TimelineLite())
                    .append([     
                        TweenMax.fromTo($('#scene_4_roadtrip .dannybrown'), .8, { css: { top: -800 } , immediateRender: true }, { css: { top: 1600 } }),                                 
                        TweenMax.fromTo($('#scene_4_roadtrip .bus'), 1.25, { css: { left: (this.windowWidth) * 1.5 }, immediateRender: true }, { css: { left: -(this.windowHeight * 5) } }),
                        TweenMax.fromTo($('#scene_4_roadtrip .station'), .80, { css: { left:  (this.windowWidth) * 1.5 }, immediateRender: true }, { css: { left: 0 /*, ease: Power1.easein */ } })                                 
                    ])
                    .append (
                    	TweenMax.to($('#postBusText'), .1, {css:{opacity: 1}})
                    )
                    .append([
                        TweenMax.fromTo($('#scene_4_roadtrip').find('.station'), 1, { css: { right:  0 }, immediateRender: true }, { css: { right: (this.windowWidth) /*, ease: Power1.easein */ } }),
                 
                        TweenMax.fromTo($('#scene_4_roadtrip').find('.dannybg'), .65, { css: { right: -(this.windowWidth) }, immediateRender: true }, { css: { right: 0 } }), // 18px is for navbar width.
                        
                    ]).append([
                        TweenMax.fromTo($('#scene_4_roadtrip').find('.content'), .1, { css: { opacity: 1 }, immediateRender: true }, { css: { opacity: 0 } }),
                        TweenMax.fromTo($('#scene_4_roadtrip').find('.quote'), .65, { css: { opacity: 0 }, immediateRender: true }, { css: { opacity: 1 } })
                            
                    ])


            });

            scroller.pin($('#scene_04_internal'), 7500, {
                anim: (new TimelineLite())
                    .append([
                        TweenMax.fromTo($('#scene_04_internal'), .3, {  }, { })
                    ])
                    .append([
                        TweenMax.fromTo($('#scene_04_internal').find('.bg_xray'), .15, { css: { opacity: 0 }, immediateRender: true }, { css: { opacity: 1 } })
                    ])
                    .append([
                        TweenMax.fromTo($('#scene_04_internal').find('.pill'), .15, { css: { opacity: 0 }, immediateRender: true }, { css: { opacity: 1 } })
                    ])                              
                    .append([
                        TweenMax.fromTo($('#scene_04_internal').find('.pill'), 1, { css: {
                                 // left: Math.floor((2 * this.windowWidth) / 100), 
                                  left: '-0.4%',
                                 top: '-10%'
                                }, immediateRender: true }, 
                                { css: {
                                    top: '30%',
                                    left: '1%'

                                } 
                            })
                    ])  
                    .append([
                        TweenMax.fromTo($('#scene_05 .topcloud'), 1, { css: {
                                 // left: Math.floor((2 * this.windowWidth) / 100),                                  
                                    top: 0
                                }, immediateRender: true }, 
                                { css: {
                                    top: -700
                                } 
                            })
                    ]),
				onPin: function(){
					that.trackView("7-TheHybrid-Pills");
				}

            });

            scroller.addTween($('#scene_05'),
                (new TimelineLite())
                    .append([
                        TweenMax.fromTo($('#scene_05').find('.dannybrown_scene5'), 2, {css: { top: 0 }, immediateRender: true }, { css: { top: 3300 }}),
                        TweenMax.fromTo($('#scene_05').find('.dannybrown_scene5'), 2, { css: { rotation: 0 }, immediateRender: true },  { css: { rotation: 180, offset: 500 }, onComplete: function() {
                        	that.trackView("8-XXX-Concert");
                        }})
                    ]),
                5500,
                150
            );

            scroller.pin($('#scene_05 .dannybg_braids'), 0, { onPin: function() {  } });

           	scroller.pin( $('#scene_concert'), 1000, {
                anim: (new TimelineLite())
                .append (
                    TweenMax.to($('#concert_hands'), .5, {css:{marginTop: 200}})
                )
                .append (
                    TweenMax.to($('#concertbg1'), .1, {css:{display: 'block'}})
                )
                .append (
                	TweenMax.to($('#concertbg2'), .1, {css:{display: 'block'}})
                )
                .append (
                	TweenMax.to($('#concertbg3'), .1, {css:{display: 'block'}})
                )
                .append (
                	TweenMax.to($('#concertbg4'), .1, {css:{display: 'block', background: "#000"}})
                ),
            });
            
            scroller.pin( $('#buildingDanny'), $('#buildingText').height()+800, {
                anim: (new TimelineLite())
                    .append(
                        TweenMax.to($('#buildingD1'), .1, {css:{display: 'block'}, onComplete: function(){
                        	that.trackView("9-WakingUp");
                        }})
                    )
                    .append(
                        TweenMax.to($('#buildingD1'), .1, {css:{display: 'none'}})
                    )
                    .append (
                        TweenMax.to($('#buildingD2'), .1, {css:{display: 'block'}})
                    )
                    .append ([
                    	TweenMax.to($('#buildingSkyline'), .1, {css:{marginTop: -50+"px"}}),
                        TweenMax.to($('#buildingD2'), .1, {css:{display: 'none'}})
                    ])
                    .append(
                        TweenMax.to($('#buildingD3'), .1, {css:{display: 'block'}})                    	
                    ),
                pushFollowers: false
            });
			
			var videoOnce = true;
			/*scroller.addTween('#scene_last', TweenMax.to($('#scene_last video'), .1, {css:{display:'block'}, onComplete: function(){
            	var vid = document.getElementById("dannyEyes");
            	if ( videoOnce ) {        		
         		vid.play();
	         		videoOnce = false;
            	}
            }}), 0, (this.windowHeight/2), false);*/
			
			scroller.pin( $('#scene_last'), 1000, {
				anim: (new TimelineLite())
					.append (
						TweenMax.to($('#scene_last video'), .1, {css:{display:'block'}})
					)
					.append (
						TweenMax.to($('#week-of-content'), .1, {css: {top: -$('#week-of-content').height()}} )
					),
				onPin: function(){
					if ( videoOnce ) {        		
	         		document.getElementById("dannyEyes").play();
		         		videoOnce = false;
	            	}
				},
				onUnpin: function(){
					// $('#scene_last').prev().remove();
					// scroller.removePin('#scene_last', false);
					that.trackView("10-Links-Credits");
                   // $('#week-of-content').css('display', 'none');
				}
			});

        },

        resizeAndReposition: function() {

			//local var
			var that = this,
				datacenter = function() {
					$( "[data-center]" ).each(function() {
						$( this ).css({
							left: ((that.windowWidth / 2) - ($( this ).width() / 2))
						});
					});
				};
			
	        //Resize
	        $( "[data-fill]" ).each(function() {
	            $( this ).css({
	                width: '100%',
	                height: 'auto'
	            });
	            if ($( this ).height() < that.windowHeight) {
	                $( this ).css({
	                    width: 'auto',
	                    height: '100%'
	                });
	            }
	        });
	        $( "[data-screen]" ).each(function() {
	            $( this ).css({
	                height: that.windowHeight
	            });
	        });

			//center data-center elements after 150ms
			setTimeout(datacenter, 150);

		},
        
        doBounce: function( element, distance, speed, type ) {

			element = $( element );

			//type is for elements positioned using bottom rather than top
			if ( !type ) {
				window.setInterval(function () {
					element.animate({top: '+='+distance}, speed)
						.animate({top: '-='+distance}, speed);
				}, 0);
			} else {
				window.setInterval(function () {
					element.animate({bottom: '+='+distance}, speed)
						.animate({bottom: '-='+distance}, speed);
				}, 0);
			}

		},
        _parallax: function(scene, scroll, items, opt) {
        	var that = this;
            /*
                scene(string)*:                     Parent Element ID
                scroll(int)*:                       Scroll tween duration
                items(array): [
                    {
                        item(string)*:              Child Element ID
                        tween(int):                 Time within tween to start animation
                        fromTo(object): {           TWEENMAX fromTo
                            start(int)*:            Startpoint for position
                            end(int)*:              Endpoint for position
                            opacityStart(int):      Startpoint for opacity
                            opacityEnd(int):        Endpoint for opacity
                            scaleStart(int):        Startpoint for z scaling
                            scaleEnd(int):          Endpoint for z scaling
                        }
                        scale(int):                 Scale start and end position based on browser width (in percentage [100 = 100%][65 = 65%])
                    }
                ]
                opt(object): {
                    track(bool):                    Track Pageview
                    scene(string)					Scene name for tracking events
                    pin(int):                       Pin scene scroll time
                }
             */

            var $scene = $(scene),
                loadItems = [];

            for (var x=0; x<items.length; x++) {
                //Scale Positioning
                if (items[x].scalePosition) {
                    var scale = window.innerWidth / options.baseScale;
                    if (typeof items[x].scalePosition === 'number' && items[x].scalePosition / 100 > scale) { scale = items[x].scalePosition / 100; }

                    // Scale FromTo
                    if (items[x].fromTo) {
                        items[x].fromTo.start *= scale;
                        items[x].fromTo.end *= scale;
                    }
                }

                // TweenMax FromTo
                if (items[x].fromTo) {
                    var cssFrom = {},
                        cssTo = {};

                    // From
                    if (typeof items[x].fromTo.start === 'number') { cssFrom.top = items[x].fromTo.start; }
                    if (typeof items[x].fromTo.opacityStart === 'number') { cssFrom.opacity = items[x].fromTo.opacityStart; }
                    if (typeof items[x].fromTo.scaleStart === 'number') { cssFrom.scale = items[x].fromTo.scaleStart; }
                    // To
                    if (typeof items[x].fromTo.end === 'number') { cssTo.top = items[x].fromTo.end; }
                    if (typeof items[x].fromTo.opacityEnd === 'number') { cssTo.opacity = items[x].fromTo.opacityEnd; }
                    if (typeof items[x].fromTo.scaleEnd === 'number') { cssTo.scale = items[x].fromTo.scaleEnd; }

                    loadItems.push(
                        TweenMax.fromTo(
                            $scene.find(items[x].item), (typeof items[x].tween !== 'undefined') ? items[x].tween : 1,
                            { css: cssFrom, immediateRender:true },
                            { css: cssTo }
                        )
                    );
                }
            }

            opt = (opt || {});
            
            scroller.pin(scene, (typeof opt.pin === 'number') ? opt.pin : 0, {
                onPin: function() {
                    if (opt.track) { 
                    	that.trackView(opt.scene); 
                    }
                    app.resizeAndReposition();
                }
            });	

            scroller.addTween(scene, (new TimelineLite()).append(loadItems), scroll);
           
        },
        
		trackView: function( scene ) {

		    var location = window.location;
		    //only if it has comlex and doesn't have beta in the hostname push events
		    //if ( location.hostname.indexOf('complex.com') !== -1 && location.hostname.indexOf('beta') === -1 ) { 
		      _gaq.push(['_trackPageview']);      
		      _gaq.push(['_trackEvent', 'Digital Cover', $( "title" ).text(), scene ]);			
		        //refresh Quantcast
		      try {
		        _qevents.push({qacct:"p-a0gOdUACucKCE", event:"refresh" });
		      } catch (e) {
		        console.log("TRACKING ERROR"+e);
		      }
		   // }
    
		}
    };

    $(function() {
		
		//start your engines
		app.init();
	
		//assign globally for testing
		window.App = app;
		
    });

})(window, document, jQuery);
/**
 * Nav bar Events
 */
(function(window, $){
   var RelatedStoriesDistance = 90000;
   var $$_nav = window.ComplexNav = {
       _version: 0.1
   };
   
   $$_nav.scrollAndTrack = function(selector, targetTop, duration, animation, gaAction){
       $(selector).click(function(event){
            _gaq.push(['_trackEvent', 'digital-cover', gaAction]);
            event.preventDefault();
            $('html,body').animate({scrollTop: targetTop}, duration, animation);
       });
   }
   
   $$_nav.openingDimmer = function(){
      var bar = $('.main-container');
      setTimeout(function(){
         bar.addClass('dimmed');
      }, 2000);     
   };
   
   $$_nav.setUpButtonEvent = function(){
     $$_nav.scrollAndTrack('.scroll-up', '0', 2000, 'linear', 'TopButton');
   };
   
   $$_nav.setRelatedStoriesButtonEvent = function(){
     $$_nav.scrollAndTrack('.related-stories', '60600', 2000, 'linear', 'RelatedButton');
   };
   
   $$_nav.setCommentButtonEvent = function(){
      $$_nav.scrollAndTrack('.comment-anchor', '60600', 2000, 'linear', 'CommentButton');        
   };
   
   $$_nav.setSliderButtonEvent = function(){
      $('.social-share').click(function(event){
         event.preventDefault();
         $('.share-mobile').slideToggle('fast');
      });
   };
   
   $$_nav.shareToFb = function(){
      $('.fb-share').click(function(event){
          event.preventDefault();
          _gaq.push(['_trackEvent', 'digital-cover','ShareToFacebook']); // clicked on share to facebook button
          window.open(
            'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href), 
            'facebook-share-dialog', 
            'width=626,height=436');
          return false;
      });
   };
   
   $$_nav.shareToTwitter = function(){
      $('.twitter-share').click(function(event){
          event.preventDefault();
          _gaq.push(['_trackEvent', 'digital-cover','ShareToTwitter']); // clicked on share to twitter button
          window.open(
           'https://twitter.com/share?url='+encodeURIComponent(location.href),
           'twitter-share-dialog',
           'width=626,height=436');
          return false;
      });
   };
   
   $$_nav.shareToGooglePlus = function(){
      $('.gplus-share').click(function(event){
         event.preventDefault();
         _gaq.push(['_trackEvent', 'digital-cover','ShareToGooglePlus']); // clicked on share to google plus button
         window.open(
           'https://plus.google.com/share?url='+encodeURIComponent(location.href),
           'google-plus-share-dialog',
           'width=626,height=436');
         return false;
      });
   };
   
   $$_nav.relatedLinkClick = function(){
      $('.related-link').click(function(event){
         var gaEvent = $(this).data('gaEvent');
         _gaq.push(['_trackEvent', 'digital-cover', gaEvent]); // clicked on each related link at footer
      });         
   };
   
   $$_nav.backToComplexClick = function(){
     $('.back2cmplx').click(function(event){
        event.preventDefault();
        _gaq.push(['_trackEvent', 'digital-cover', 'BackToComplex']); // clicked back to complex links
        window.location = 'http://complex.com';
     });
   };

   $(function(){
       $$_nav.openingDimmer();
       $$_nav.setUpButtonEvent();
       $$_nav.setSliderButtonEvent();
       $$_nav.setRelatedStoriesButtonEvent();
       $$_nav.setCommentButtonEvent();
       $$_nav.shareToFb();
       $$_nav.shareToTwitter();
       $$_nav.shareToGooglePlus();
       $$_nav.relatedLinkClick();
       $$_nav.backToComplexClick();
   });

})(window, jQuery);
/*
 * Preloader Plugin 
 * Author: Philip Leesha
 */

;(function( window, document, $, undefined ) {
    'use strict';	 
	 
	 var preLoader = {

        buildOverlay: function() {
        	
        	//display loading screen if it is hidden
        	document.getElementById("preloadOverlay").style.display = 'block';
        	
        	this.loadText = document.getElementById("procentage-load");
        	
        	//local var
        	var that = this,
        		firstTime = true,
        		saveCount = 0,
        		timeOut = 0;
			
        	// checks if the document is ready every 500 ms up to 20 times 
            var readyStateInt = setInterval(function() {
            	//generate random whole number btw 1 and 6
            	var counter = Math.floor(Math.random() * 6) + 1; 

			    if ( document.readyState === "complete" ) {
			    	//if its complete clear the check int and count from the save count to 100
			        clearInterval( readyStateInt );
			        that.fakeCounter( saveCount, 100 );
			    } else {
			    	//else up the time out count
			    	timeOut++;
			    	if ( firstTime ) {
			    		//first time starts from 0 
			    		firstTime = false;
				    	that.fakeCounter( 0, counter );
				    	saveCount = counter;		    		    		
			    	} else if ( saveCount < 95 && timeOut < 20 ) {
			    		//all other times count starts from save count to save count + random number
			    		var newSaveCount = saveCount + counter;
			    		that.fakeCounter( saveCount, newSaveCount );
			    		saveCount = newSaveCount;
			    	} else {
			    		//if save count is above 95 or its counted 20 times count to 100 clear int 
			    		clearInterval( readyStateInt );
			        	that.fakeCounter( saveCount, 100 );
			    	}
			    }
			}, 500);
			
        },
        
        fakeCounter: function ( from, to ) {
        	
        	//local var
    		var that = this,
    			counter1 = from,
    			counter2 = to,
			    count = setInterval(timer, 10);

			//timer is on a set interval of 10ms until its cleared
			function timer() {
				
				//plus counter and update counter text and background
				counter1++;
			    that.loadText.innerHTML = counter1 + "%";
			    that.overlayProcess( counter1 );
		    	if ( counter1 > 99 ) {
		    		//if counter is 100 it clears and fades overlay
			        clearInterval(count);
			        that.overlayFadeOut();
			        return;
			    } else {
			    	if ( counter1 === counter2 ) {
			    		//if the from equals the to it clears
			    		clearInterval(count);
			    		return;	    		
			    	}
			    }
			    
			}
			
        },
        
        overlayProcess: function ( percentage ) {
        	
            var that = this, 
            	pixalsMove = percentage + 5.0;
            $('.preload-complex-logo').css({backgroundPosition: "0 -"+pixalsMove+"px"});
			
        },
        
        overlayFadeOut: function () {
        	
        	//fade overlay and dim the complex nav 
            $( '#preloadOverlay' ).fadeOut("slow");
            ComplexNav.openingDimmer();
            
        }
        
    };
	
	
	$(function() {
		
        preLoader.buildOverlay();
        	
		//assign globally for testing
        window.PreLoader = preLoader;
             
    });

})( window, document, jQuery );