var triviaQuestions = [{
	question: "Which team is the most succesful in the European Cups/UEFA Champions Leagues?",
	answerList: ["Bayern Munich", "Ajax", "Real Madrid", "AC Milan"],
	answer: 2
},{
	question: "Which team has lost the most UEFA Champions League finals?",
	answerList: ["Juventus", "Internazionale", "Barcelona", "Manchester United"],
	answer: 0
},{
	question: "Which player is the All-time top scorer?",
	answerList: ["Cristiano Ronaldo", "Lionel Messi", "Raul Blanco", "Ruud van Nistelrooy"],
	answer: 0
},{
	question: "Which player has the most appearances in the competition?",
	answerList: ["Ryan Giggs", "Raul Blanco", "Iker Casillas", "Xavi"],
	answer: 2
},{
	question: "Which team has lost 3 UEFA Champions league finals and never won the tournament?",
	answerList: ["Hamburg", "Borussia Mönchengladbach", "Celtic", "Atletico Madrid"],
	answer: 3
},{
	question: "Which manager has won the 3 times and reached the 4 finals of the EUFA Champions League?",
	answerList: ["Carlo Ancelotti", "Alex Ferguson", "Jose Mourinho", "Vicente del Bosque"],
	answer: 0
},{
	question: "Which player has won the most tournaments?",
	answerList: ["Lionel Messi", "Francisco Gento(6 times)", "Ronaldinho", "Sergio Ramos"],
	answer: 1
},{
	question: "Which team won the UEFA Champions league 2016-2017?",
	answerList: ["Chelsea", "Juventus", "Real Madrid", "Barcelona"],
	answer: 2
},{
	question: "Which team holds the most clean sheets in the tournament?",
	answerList: ["Real Madrid", "Arsenal", "Bayern Munich", "Malmö"],
	answer: 1
},{
	question: "Which team has scored the most goals in a group stage?",
	answerList: ["Barcelona", "Arsenal", "Ajax", "Borussia Dortmund"],
	answer: 3
},{
	question: "How many goals did Cristiano Ronaldo scored in a single season(Tournament record)?",
	answerList: ["17", "20", "21", "16"],
	answer: 0
},{
	question: "Which team won the tournament in 2004?",
	answerList: ["Bayern Munich", "Porto", "Barcelona", "Valencia"],
	answer: 1
},{
	question: "Which team won the tournament in 1999?",
	answerList: ["Roma", "Benfica", "Bayern Munich", "Manchester United"],
	answer: 3
},{
	question: "Which team won the torunament in 1997?",
	answerList: ["Borussia Dortmund", "Juvents", "Ajax", "Real Madrid"],
	answer: 0
},{
	question: "Which team is my(Miguel Barrera) favorite team?",
	answerList: ["Arsenal", "Barcelona", "Borussia Dortmund", "Manchester City"],
	answer: 2
}];

var picArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Correct answer!",
	incorrect: "That's incorrect!",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#pic').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#pic').html('<img src = "assets/images/'+ picArray[currentQuestion] +'.jpg" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#pic').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
