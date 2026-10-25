/* ===================================================================
    
    Author          : Kazi Sahiduzzaman
    Template Name   : Medihouse - Hospital Medical Caregiver HTML Template
    Version         : 1.0
    
* ================================================================= */
(function($) {
    "use strict";

    $(document).on('ready', function() {

		// Keep the off-canvas mobile menu state accessible and easy to close.
		function syncMobileMenuState() {
			var isOpen = $('.bsnav-mobile').hasClass('in');
			$('body').toggleClass('mobile-menu-open', isOpen);
			$('.navbar-toggler').attr('aria-expanded', isOpen ? 'true' : 'false');
		}
		$(document).on('click', '.navbar-toggler', function() {
			window.setTimeout(syncMobileMenuState, 0);
		});
		$(document).on('click', '.mobile-menu-close, .bsnav-mobile-overlay', function() {
			$('.bsnav-mobile').removeClass('in');
			$('.navbar-toggler').removeClass('active').attr('aria-expanded', 'false').trigger('focus');
			$('body').removeClass('mobile-menu-open');
		});
		$(window).on('resize', syncMobileMenuState);


		/* ==================================================
			# Data Background
		 ===============================================*/

		$("[data-background]").each(function(){
			$(this).css("background-image","url(" + $(this).attr("data-background") +")");
		});

        /* ==================================================
            # Wow Init
         ===============================================*/
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
	
		
		
        /* ==================================================
            # Smooth Scroll
         =============================================== */
        
		$("body").scrollspy({
            target: ".navbar-collapse",
            offset: 200
        });
        $('a.smooth-menu').on('click', function(event) {
            var $anchor = $(this);
            var headerH = '85';
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
		
		
		/* ==================================================
            # Button Drop down
         =============================================== */
		
		$('dropdown-toggle').dropdown();
		
		 /* ==================================================
            # Scroll to top
         =============================================== */
			//Get the button
			var mybutton = document.getElementById("scrtop");

			// When the user scrolls down 20px from the top of the document, show the button
			window.onscroll = function() {scrollFunction()};

			function scrollFunction() {
			  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
				mybutton.style.display = "block";
			  } else {
				mybutton.style.display = "none";
			  }
			}

		 /* ==================================================
            # Youtube Video Init
         ===============================================*/
        $('.player').mb_YTPlayer();
	
		/* ==================================================
			# Accordion Menu
		 =============================================== */
		
		  $(document).on('click','.panel-group .panel',function(e) {
			e.preventDefault();
			$(this).addClass('panel-active').siblings().removeClass('panel-active');
		});
		
        /* ==================================================
            # imagesLoaded active
        ===============================================*/
        $('#portfolio-grid,.blog-masonry').imagesLoaded(function() {

            /* Filter menu */
            $('.mix-item-menu').on('click', 'button', function() {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
            });

            /* filter menu active class  */
            $('.mix-item-menu button').on('click', function(event) {
                $(this).siblings('.active').removeClass('active');
                $(this).addClass('active');
                event.preventDefault();
            });

            /* Filter active */
            var $grid = $('#portfolio-grid').isotope({
                itemSelector: '.pf-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.pf-item',
                }
            });

            /* Filter active */
            $('.blog-masonry').isotope({
                itemSelector: '.blog-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.blog-item',
                }
            });

        });
		
		
        /* ==================================================
            # Magnific popup init
         ===============================================*/
        $(".popup-link").magnificPopup({
            type: 'image',
            // other options
        });

        $(".popup-gallery").magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            // other options
        });

        $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        $('.magnific-mix-gallery').each(function() {
            var $container = $(this);
            var $imageLinks = $container.find('.item');

            var items = [];
            $imageLinks.each(function() {
                var $item = $(this);
                var type = 'image';
                if ($item.hasClass('magnific-iframe')) {
                    type = 'iframe';
                }
                var magItem = {
                    src: $item.attr('href'),
                    type: type
                };
                magItem.title = $item.data('title');
                items.push(magItem);
            });

            $imageLinks.magnificPopup({
                mainClass: 'mfp-fade',
                items: items,
                gallery: {
                    enabled: true,
                    tPrev: $(this).data('prev-text'),
                    tNext: $(this).data('next-text')
                },
                type: 'image',
                callbacks: {
                    beforeOpen: function() {
                        var index = $imageLinks.index(this.st.el);
                        if (-1 !== index) {
                            this.goTo(index);
                        }
                    }
                }
            });
        });
		

        /* ==================================================
            # Partner Carousel
         ===============================================*/
		
        $('.brand-wrapper').owlCarousel({
            loop: true,
            margin:30,
            nav: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        });
		
		 /* ==================================================
            # Review Carousel
         ===============================================*/
		
        $('.f1-wrapper').owlCarousel({
            loop: true,
            margin:30,
            nav: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 2
                }
            }
        });
		
		/* ==================================================
			# Review Carousel
		 ===============================================*/

			$('.fd-sldr').owlCarousel({
				loop: true,
				margin:30,
				nav: false,
				navText: [
					"<i class='fa fa-angle-left'></i>",
					"<i class='fa fa-angle-right'></i>"
				],
				dots: true,
				autoplay: true,
				responsive: {
					0: {
						items: 1
					},
					600: {
						items: 1
					},
					1000: {
						items: 2
					}
				}
			});
		
		/* ==================================================
            # Partner Carousel
         ===============================================*/
		
        $('.hero-sldr').owlCarousel({
            loop: true,
            margin:0,
            nav: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });
		
		/* ==================================================
            # Cate Carousel
         ===============================================*/
		
        $('.cate-wrapper').owlCarousel({
            loop: true,
            margin:30,
            nav: true,
            navText: [
                "<i class='ti ti-arrow-left'></i>",
                "<i class='ti ti-arrow-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 4
                }
            }
        });
		
		
		/* ==================================================
            # Team Carousel 
         ===============================================*/
		
        $('.team-sldr').owlCarousel({
            loop: true,
            margin:30,
            nav: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });
		
		
		
        /* ==================================================
            # Hero Slider Carousel
         ===============================================*/
		
        $('.hero-slider').owlCarousel({
            loop: true,
            nav: true,
            dots: false,
            autoplay: true,
			autoplayTimeout:5000,
            items: 1,
            navText: [
                "<i class='ti-angle-left'></i>",
                "<i class='ti-angle-right'></i>"
            ],
        });
		

		/* ==================================================
            # Feedback
         ===============================================*/
		
			$('.partner-wrapper').owlCarousel({
            loop: true,
            margin:30,
            nav: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 4
                },
                1000: {
                    items: 5
                }
            }
        });
		
		
		/* ==================================================
            # Review
         ===============================================*/
		
			$('.review-wrapper').owlCarousel({
            loop: true,
            margin:30,
            nav: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });
		
		/* ==================================================
            # Review
         ===============================================*/
		
			$('.feed-wrapper').owlCarousel({
            loop: true,
            margin:30,
            nav: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });
		
		
		/* ==================================================
            # Choose Slider
         ===============================================*/
		
		$('.wh-wrapper').owlCarousel({
            loop: true,
            margin:30,
            nav: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                800: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });
		
		/* ==================================================
            # partner slider
         ===============================================*/
		
		$('.p1-wrapper').owlCarousel({
            loop: true,
            margin:50,
            nav: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 2
                },
                768: {
                    items: 4
                },
                1000: {
                    items: 5
                }
            }
        });
		
		/* ==================================================
            # Ab Slider
         ===============================================*/
		
		$('.ab-course-wrapper').owlCarousel({
            loop: true,
            margin:30,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                800: {
                    items: 2
                },
                1000: {
                    items: 2
                }
            }
        });
		
		/* ==================================================
            # Product  Slider
         ===============================================*/
		
		$('.tba-sldr').owlCarousel({
            loop: true,
            margin:0,
            nav: true,
            navText: [
                "<i class='ti ti-arrow-left'></i>",
                "<i class='ti ti-arrow-right'></i>"
            ],
            dots: false,
            autoplay: false,
            responsive: {
                0: {
                    items: 1
                },
                800: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });
		
		
		
		
		/* ==================================================
          # Pie Chart 
         ===============================================*/
		
		$('.chart').easyPieChart({
			size:140,
			barColor:'#42538F',
			scaleColor:false,
			lineWidth:15,
			trackColor:'#f5f5f5'
		});

        /* ==================================================
            # Fun Factor Init
        ===============================================*/
        $('.timer').countTo();
        $('.fun-fact').appear(function() {
            $('.timer').countTo();
        }, {
            accY: -100
        });
		
		 /* ==================================================
            Contact Form Validations
        ================================================== */
        $('.contact-form').each(function() {
            var formInstance = $(this);
            formInstance.submit(function() {

                var action = $(this).attr('action');

                formInstance.find("#message").slideUp(200, function() {
                    formInstance.find('#message').hide();

                    formInstance.find('#submit')
                        .after('<img src="assets/img/logo/ajax-loader.gif" class="loader" />')
                        .attr('disabled', 'disabled');

                    $.ajax({
                        url: action,
                        method: 'POST',
                        data: formInstance.serialize(),
                        success: function(data) {
                            formInstance.find('#message').html(data).slideDown('slow');
                            formInstance[0].reset();
                        },
                        error: function(xhr) {
                            var responseMessage = xhr.responseText || 'We could not send your request right now. Please email contact@alhez.co.tz or call +255 757 382 236.';
                            formInstance.find('#message').text(responseMessage).slideDown('slow');
                        },
                        complete: function() {
                            formInstance.find('.loader').remove();
                            formInstance.find('#submit').prop('disabled', false);
                        }
                    });
                });
                return false;
            });
        });
		
		/* ==================================================
		# Quantity
		===============================================*/
		
		function wcqib_refresh_quantity_increments() {
			jQuery("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").each(function(a, b) {
				var c = jQuery(b);
				c.addClass("buttons_added"), c.children().first().before('<input type="button" value="-" class="minus" />'), c.children().last().after('<input type="button" value="+" class="plus" />')
			})
		}
		String.prototype.getDecimals || (String.prototype.getDecimals = function() {
			var a = this,
				b = ("" + a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
			return b ? Math.max(0, (b[1] ? b[1].length : 0) - (b[2] ? +b[2] : 0)) : 0
		}), jQuery(document).ready(function() {
			wcqib_refresh_quantity_increments()
		}), jQuery(document).on("updated_wc_div", function() {
			wcqib_refresh_quantity_increments()
		}), jQuery(document).on("click", ".plus, .minus", function() {
			var a = jQuery(this).closest(".quantity").find(".qty"),
				b = parseFloat(a.val()),
				c = parseFloat(a.attr("max")),
				d = parseFloat(a.attr("min")),
				e = a.attr("step");
			b && "" !== b && "NaN" !== b || (b = 0), "" !== c && "NaN" !== c || (c = ""), "" !== d && "NaN" !== d || (d = 0), "any" !== e && "" !== e && void 0 !== e && "NaN" !== parseFloat(e) || (e = 1), jQuery(this).is(".plus") ? c && b >= c ? a.val(c) : a.val((b + parseFloat(e)).toFixed(e.getDecimals())) : d && b <= d ? a.val(d) : b > 0 && a.val((b - parseFloat(e)).toFixed(e.getDecimals())), a.trigger("change")
		});

		
		/* ==================================================
		# Slick nav
		 ===============================================*/

		 $('.testimonial-active').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.test-img-active',
			autoplay: true,
			autoplaySpeed: 5000,
		});

		$('.test-img-active').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			asNavFor: '.testimonial-active',
			dots: false,
			centerMode: true,
			focusOnSelect: true,
			arrows: false,
		});

		$(".testimonial-active").slick({
			lazyLoad: 'ondemand', // ondemand progressive anticipated
			infinite: true
		});
		
    }); // end document ready function
})(jQuery); // End jQuery
