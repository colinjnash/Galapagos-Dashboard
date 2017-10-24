/**
	Table of Contents:
		1. Onload Script:
			-Change Background
			-Clock
		2. Nav Menu Scripts
		3. Clock
		4. To Do List
***************************************************************/

// Optional JQUERY load

/* Onload Scripts
 *********************************************/
$(document).ready(function($) {

    $('#welcome').hide().fadeIn('slow');
    $(document).ready(function() {
        $('#welcome').removeClass('hidden');
    });


    changeBackground();
    buildClock();

   
    

    function changeBackground() {
        let arr = ['img0.jpg', 'img1.jpg', 'img2.jpg', 'img3.jpg'];
        document.body.style.background = "url('img/" + arr[Math.floor((Math.random() * 3))] + "')";
    }

    // Fade in the div







    /* Nav Menu
     *********************************************/
    // Two functions to open and close side menu
    document.getElementById('openMenu').onclick = function() {
        document.getElementById('leftNav').style.width = '250px'
    };
    document.getElementById('closeMenu').onclick = function() {
        document.getElementById('leftNav').style.width = '0'
    };

    /* Clock
     *********************************************/
    // Web clock on the front page
    function buildClock() {
        let clock = new Date();
        let h = clock.getHours();
        let m = clock.getMinutes();
        // let s = clock.getSeconds();

        m = addZero(m);
        // s = addZero(s);		

        let t = setTimeout(buildClock, 500);
        let dayNight = ' AM';

        if (h > 12) {
            dayNight = ' PM';
            h -= 12;
        } else if (h = 12) {
            dayNight = ' PM';
        } else if (h = 0) {
            dayNight = ' AM';
        }

        document.getElementById('clock').innerHTML = h + ':' + m + dayNight;
    }

    function addZero(i) {
        if (i < 10) {
            return '0' + i;
        }
        return i;
    }



    /* To Do List
     *********************************************/
    // Loads data from input to list on right side bar
    $('input#toDoItem').keypress(function(e) {

        if (e.which === 13) {
        	console.log("ENTER");
            let toDoText = $(this).val();


            $('.rightNav').append('<li>' + toDoText + '</li>');

            // Clear out the input field
            $(this).val('');
            e.preventDefault();
        }
    });

    /* Setting Up ToDoToggle
     *****************************************************************/

});