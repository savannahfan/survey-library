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
                html: "<article class='intro'>    <h1 class='intro__heading intro__heading--income title'>                     Consent              </h1>    <div class='intro__body wysiwyg'>       <p>In this section, you will be asked to finish three surveys related to the E-reader project.</p>       <p>It will be handy to have the following in front of you:</p>       <ul>        \t<li>        \t\tPayslip (for employment details)        \t</li>        \t<li>        \t\t<p>A current Centrelink Schedule for any account based pension from super, annuities, or other income stream products that you own</p>        \t\t<p>        \t\t\tIf you don't have a current one you can get these schedules by contacting your income stream provider        \t\t</p>        \t</li>        \t<li>        \t\tLatest statement from any payments (from Centrelink or other authority)        \t</li>       </ul>         </div> </article>"

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

    document.querySelector("#surveyResult").innerHTML =
      "result: " + JSON.stringify(result.data);
  });

  //survey.mode = 'display';


  $("#surveyElement").Survey({
    model: survey
  });
}

if (!window["%hammerhead%"]) {
  init();
}
