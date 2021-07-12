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
alert(con.eraderId+ " and " + con.bookId)



function init() {
  //Add the price property into choices
  Survey.Serializer.addProperty("itemvalue", "price:number");


  //Register the custom function
  //Survey.FunctionFactory.Instance.register("getItemPrice", getItemPrice);

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
                isRequired: true
              },
              {
                name: "Book ID",
                type: "text",
                title: "Book ID",
                isRequired: true
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
                title: "How long did you spend on reading this book?",
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



  ]};

  Survey.StylesManager.applyTheme("default");

  window.survey = new Survey.Model(json);

  survey.onCompleting.add(function(sender, options) {
    if (confirm("Do you finish all the surveys?")){
      options.allowComplete = true;
      alert("Thank you!");
    }
    else {
      options.allowComplete = false;
      console.log('i am not ok!');
      return;
    }

  });


  survey.onComplete.add(function(result) {

    console.log(JSON.stringify(survey.data));
    var xhr = new XMLHttpRequest();


    xhr.open("POST", "http://surveykg.inf.ed.ac.uk/surveykg/homepage.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


    xhr.onload = function() {
    if (this.status == 200) {
        alert(this.response);
      }
    else{
      alert('!!!'+this.status);
    }
    }

    xhr.send(JSON.stringify(survey.data));

  });

  //survey.mode = 'display';


  $("#surveyElement").Survey({
    model: survey
  });
}

if (!window["%hammerhead%"]) {
  init();
}
