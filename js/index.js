$('.search').on('click', function() {
  $('.search').hide(1000);
  $('span').show(2000);
});

$('.close').on('click', function() {
  $('.search').show(1500);
  $('span').hide(1000);
});

$('span').on('keypress','input', function(enter) {
  var key = enter.which;
  if ($('input').val() != "") {
    if (key == 13) {
      var input = $('input').val();
      
      $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=30&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=2&exlimit=max&gsrsearch=" + input + "&origin=*", function(a) {
        $('.wiki').empty();
        
        var list = Object.keys(a.query.pages);
        
        for(var i = 0; list.length; i++) {
          var num = list[i];
          var result = a.query.pages[num].title;
          var result2 = a.query.pages[num].extract;
          
          if(result2 == undefined)
            result2 = result;
          
          if($(window).width() <= 500)
            $('.wiki').append('<div class="wik"><h2><a href= https://en.wikipedia.org/?curid=' + list[i] + ' target="_blank">' + result + '</a></h2><p>' + result2.substr(0, 30) + '...</p></div>');
          else {
            $('.wiki').append('<div class="wik"><h2><a href= https://en.wikipedia.org/?curid=' + list[i] + ' target="_blank">' + result + '</a></h2><p>' + result2 + '</p></div>');
          }
        }
      });
    }
  }
  
});