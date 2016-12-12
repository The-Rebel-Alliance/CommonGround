var clicks = 0; //This is for the UpVote/Downvote Counters
      function counter(){

        clicks += 1;
        document.getElementById('counter').innerHTML = clicks;
  }
     var clicks2 = 0;
      function counter2(){

        clicks2 += 1;
        document.getElementById('counter2').innerHTML = clicks2;
  }

      var clicks3 = 0;
      function counter3(){

        clicks3 += 1;
        document.getElementById('counter3').innerHTML = clicks3;
  }

      var clicks4 = 0;
      function counter4(){

        clicks4 += 1;
        document.getElementById('counter4').innerHTML = clicks4;
  }

//JQuery Tabs for Chat and Users
$(function() {

    $('.tab-panels .tabs li').on('click', function() {

        var $panel = $(this).closest('.tab-panels');

        $panel.find('.tabs li.active').removeClass('active');
        $(this).addClass('active');

        //figure out which panel to show
        var panelToShow = $(this).attr('rel');

        //hide current panel
        $panel.find('.panel.active').hide(0, showNextPanel);

        //show next panel
        function showNextPanel() {
            $(this).removeClass('active');

            $('#'+panelToShow).show(0, function() {
                $(this).addClass('active');
            });
        }
    });


});
