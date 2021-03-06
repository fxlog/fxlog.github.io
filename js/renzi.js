var words = [];
var questionList = [];
var i;
var n = 0;
var lesson;

$(document).ready(function() 
{		
	lesson = window.location.search.substr(1);
	
	$("#gif").hide();
	$(".restart").hide();
	getGif();
	
	$.getJSON("./" + lesson + "/renzi/renzi.json", function(result)
	{
		for (i = 0; i < result.words.length; i++)
			words.push(result.words[i]);
		
		shuffle(words);
		console.log(words);
		
		for (i = 0; i < words.length; i++)
		{
			var input = jQuery('<button onclick=check("' + words[i] + '"); type="button" class="' + words[i] + ' btn btn-outline-primary mr-4 mb-4 p-4 choice">' + words[i] + '</button>');
			jQuery('.btn-group').append(input);
			questionList.push(words[i]);
		}
		shuffle(questionList);
		nextWord();
	});	
	
	$('.play').click(function() 
	{
		$(".audio").attr('src', "./" + lesson + "/renzi/" + questionList[0] + ".mp3");
	});	
	
	$('.restart').click(function() 
	{
		n = 0;
		$(".play").removeClass('disabled');
		$("#gif").hide();
		$(".restart").hide();
		$('.choice').prop('disabled', false);
		$('.choice').toggleClass('btn-outline-secondary btn-outline-primary');
		for (i = 0; i < words.length; i++)
			questionList.push(words[i]);
		
		shuffle(questionList);
		nextWord();
		getGif();		
	});	
});	

function check(word)
{
	console.log(word, questionList[0])
	if (word == questionList[0])
	{
		// correct
		$(".audio").attr('src', "../audio/perfect.mp3");
		questionList.shift();
		$("." + word).attr('disabled', 'true')
		$("." + word).toggleClass('btn-outline-primary btn-outline-secondary');
		n++;
		startConfetti();
		setTimeout(function(){ stopConfetti(); }, 1000);
		if (n == words.length)
		{
			$("#gif").show();
			$('.restart').show();
			$(".play").addClass('disabled');
		}
		else
			nextWord();
	}
	else
	{
		// wrong
		//$(".audio").attr('src', "../audio/wrong.mp3");
		$(".badge-warning").show();	
		$(".badge-warning").text("Try again!");	
	}
}

function nextWord()
{
	console.log(questionList[0]);
	$(".badge").hide();
	$(".audio").attr('src', "./" + lesson + "/renzi/" + questionList[0] + ".mp3");	
}