function GetRequest() {
	var url = location.search;
    var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
	}
    return theRequest;
    }
var con = GetRequest();


var ereaderId="55";
var bookId="222";

var ereaderId=con.ereaderId;
var bookId=con.bookId;


Cookies.set('ereaderId', ereaderId);
Cookies.set('bookId', bookId);



function init() {

  var json = {
    showProgressBar: "both",
    title: "Survey for E-reader",
    logo: "../edinburgh.png",
    logoPosition: "left",
    description:"Congratulation! You have finished all the readings. Now please fill in the information and complete the following surveys.",
    pages:[
          {
            questions: [
              {

                type: "html",
                name: "consent",
                html: "<article class='intro'>    <h1 class='intro__heading intro__heading--income title'>                     Consent              </h1>    <div class='intro__body wysiwyg'>       <p>Welcome to the final set of questionnaires in the Recreational Reading Behaviour - study!</p>       <p>This survey platform is part of the study and linked together with ORB Reader.</p>       <ul>        \t<li>        \t\tPlease answer all the surveys by clicking on each link on the next page. You can save your responses and return later by signing into ORB Reader and clicking on the same link again that brought you here.        \t</li>        \t<li>        \t\t<p>Please make sure that you respond to these final questionnaires within 2 days, and return to ORB Reader to finish the study once you are done. You will be able to take part in the giveaway by fully completing the study.</p>             \t</li>       </ul>   <p>All answers will be stored anonymously in a secure database.</p>        </div> </article>"
              }
          ]
        },
        {
          questions: [
              {
                name: "E-Reader ID",
                type: "text",
                title: "E-Reader ID",
                visible:false
              },
              {
                name: "Book ID",
                type: "text",
                title: "Book ID",
                visible:false
              },
              {
                type: "html",
                name: "info",
                html: "<table><tr><td>Survey 1</td><td><a href='./Task-IMI.html'  target='_blank'>links1</a></td></tr><tr><td>Survey 2</td><td><a href='./E-experience.html'  target='_blank'>links2</a></td></tr><tr><td>Survey 3</td><td><a href='./SWAS.html'  target='_blank'>links3</a></td></tr></table>",
                //<a href='https://surveyjs.io/create-survey'  target='_blank'>links</a>
              },
              {
                type: "radiogroup",
                name: "readBefore",
                title: "Have you read this book before?",
                isRequired: true,
                colCount: 2,
                choices: [
                    "Yes",
                    "No"
                ]
              },
              {
                name: "timeForReading",
                type: "text",
                title: "How long do you estimate you spend on reading this book? e.g. 3 hours",
                isRequired: true
              },
              {
                type: "comment",
                name: "summary",
                isRequired: true,
                title: "Please write a summary about the book you read."
              }

        ]
      }
    ],
      completedHtml:"<h1>Thank you for completing the surveys.</h1> <h2>Please use the following url to go back to the ORB Reader platform : <a href=https://orbreader.com/finish/questionnaire?isDone=1>ORB Reader<a></h2>",
  };

  Survey.StylesManager.applyTheme("default");

  window.survey = new Survey.Model(json);



  function surveyValidateQuestion(survey, options) {

    var ereaderQues=survey.getQuestionByName("E-Reader ID");
    var bookQues=survey.getQuestionByName("Book ID");
    ereaderQues.value=eraderId;
    bookQues.value=bookId;

    var xhr = new XMLHttpRequest();


    xhr.open("POST", "http://surveykg.inf.ed.ac.uk/surveykg/homepage_checking.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");



    xhr.send(JSON.stringify(survey.data));

    console.log(JSON.stringify(survey.data));
    xhr.onreadystatechange = function(){
      if(xhr.readyState==4 && xhr.status==200){
        console.log("@@@"+xhr.responseText)
        if(xhr.responseText==3){

          options.complete();
        }
        else{
          options.errors["info"] = "Please finish all the surveys.";
          //alert("Please finish all the surveys.")

          options.complete();
        }
      }



    }

  };

  survey.onCompleting.add(function(sender, options) {
      if (confirm("Have you finished all the surveys?")){
        options.allowComplete = true;
      }
      else {
        options.allowComplete = false;
        return;
      }

  });

  survey.onComplete.add(function(result) {


      var ereaderQues=survey.getQuestionByName("E-Reader ID");
      var bookQues=survey.getQuestionByName("Book ID");
      ereaderQues.value=eraderId;
      bookQues.value=bookId;

      console.log(JSON.stringify(survey.data));
      var xhr = new XMLHttpRequest();


      xhr.open("POST", "http://surveykg.inf.ed.ac.uk/surveykg/homepage.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");



      xhr.send(JSON.stringify(survey.data));




  });

  //survey.mode = 'display';
  survey
    .onServerValidateQuestions
    .add(surveyValidateQuestion);

  $("#surveyElement").Survey({
    model: survey
  });
}

if (!window["%hammerhead%"]) {
  init();
}
