function init() {
  //Add the price property into choices

  var ereaderId=Cookies.get("ereaderId");


  function sort_object(obj) {
    items = Object.keys(obj).map(function(key) {
        valueMapDict={"Once a month":1,"2-3 times a month":2,"Once a week":3,"2-3 times a week":4,"4-6 times a week":5,"Once daily":6,"2-4 times daily":7,"More than 4 times daily":8};
        return [key, valueMapDict[obj[key]]];
    });

    items.sort(function(first, second) {
        return (second[1] - first[1]);
    });
    sorted_obj={}
    $.each(items, function(k, v) {
        use_key = v[0]
        use_value = v[1]
        sorted_obj[use_key] = use_value
    })
    return(sorted_obj)
  }

  //Register the custom function
  Survey.FunctionFactory.Instance.register("sort_object", sort_object);

  var json = {
    showProgressBar: "both",
    title: "Survey for E-reader",
    logo: "../edinburgh.png",
    logoPosition: "left",
    description:"The survey is about electronic reading behaviours.",

    questions: [
            {
              name: "E-Reader ID",
              type: "text",
              title: "E-Reader ID",
              visible:false
            },
            {
            type: "checkbox",
            name: "overallDevices",
            title: "Which of the following devices do you own or have regular access to? Select all that apply",
            isRequired: true,
            colCount: 1,
            hasNone: true,
            choices: [
                "Dedicated e-reader with an e-ink screen (such as Kindle Paperwhite, Kobo or Nook)",
                "Desktop computer",
                "Laptop",
                "Smartphone",
                "Tablet computer (such as iPad)",
                "Other device with internet access such as a smartwatch or an iPod",
              ]
            },
            {

            type: "matrix",
            name: "frequency",
            isRequired: true,
            title: "How often do you use the following devices? ",
            visibleIf: "{overallDevices.length} > 0 and {overallDevices} notcontains 'none'",
            rowsVisibleIf: "{overallDevices} contains {item}",
            columns: [
              "Once a month", "2-3 times a month", "Once a week", "2-3 times a week", "4-6 times a week", "Once daily", "2-4 times daily","More than 4 times daily"

              ],
              rows: [
                  "Dedicated e-reader with an e-ink screen (such as Kindle Paperwhite, Kobo or Nook)",
                  "Desktop computer",
                  "Laptop",
                  "Smartphone",
                  "Tablet computer (such as iPad)",
              ]
            },
            {
            type: "checkbox",
            name: "devicesForReading",
            visibleIf: "{frequency} notempty",
            hasNone: true,
            title: "Which of the following devices do you use for reading? The reading can be done recreationally or for work or study purposes. [What we mean by reading DO NOT include reading tweets or web browsing.] Select all that apply",
            isRequired: true,
            colCount: 1,
            choices: [
              ]
            },
            {
            type: "checkbox",
            name: "textTypeForRecreation",
            visibleIf: "{devicesForReading} notempty and {devicesForReading} notcontains 'none'",
            title: "Which of the following text types have you read electronically for recreational purposes? Select all that apply",
            isRequired: true,
            colCount: 1,
            hasNone: true,
            choices: [
                  "Fiction books",
                  "Nonfiction books",
                  "Graphic books",
                  "Poetry",
                  "Magazines,newpapers or other articles",
                  "Short stories or fanfiction",
                  "Textbooks",
                  "Academic journals or conference articles",
              ]
            },
            {
            type: "matrix",
            name: "frequencyForDeviceOnRecreation",
            title: "How often do you use the following devices for recreational purpose?",
            visibleIf: "{textTypeForRecreation} notempty and {textTypeForRecreation} notcontains 'none'",
            isRequired: true,
            columns: [
              "Rarely, not every year","A few times a year","A few times a month","A few times a week","Everyday"
              ],
              rows: [
              ]
            },
            {
            type: "checkbox",
            name: "textTypeForWork",
            visibleIf: "{devicesForReading} notempty and {devicesForReading} notcontains 'none'",
            title: "Which of the following text types have you read electronically for work or study? Select all that apply",
            isRequired: true,
            colCount: 1,
            hasNone: true,
            choices: [
                  "Fiction books",
                  "Nonfiction books",
                  "Graphic books",
                  "Poetry",
                  "Magazines,newpapers or other articles",
                  "Short stories or fanfiction",
                  "Textbooks",
                  "Academic journals or conference articles",
              ]
            },
            {
            type: "matrix",
            name: "frequencyForDeviceOnWork",
            title: "How often do you use the following devices for work or study purpose?",
            visibleIf: "{textTypeForWork} notempty and {textTypeForWork} notcontains 'none' ",
            isRequired: true,
            columns: [
              "Rarely, not every year","A few times a year","A few times a month","A few times a week","Everyday"

              ],
              rows: [
              ]
            },
            {
                type: "dropdown",
                name: "printBookForRecreation",
                title: "How often do you read print books (paperback or hardcover) recreationally?",
                isRequired: true,
                colCount: 0,
                choices: [
                  "Rarely, not every year", "A few times a year", "A few times a month","A few times a week","Everyday"

                ]
            },
            {
                type: "dropdown",
                name: "printBookForWork",
                title: "How often do you read print books (paperback or hardcover) as part of work or study?",
                isRequired: true,
                colCount: 0,
                choices: [
                  "Rarely, not every year", "A few times a year", "A few times a month","A few times a week","Everyday"

                ]
            }









    ]
  };

  Survey.StylesManager.applyTheme("default");

  window.survey = new Survey.Model(json);
  //==================none option==================

  survey.onValueChanged.add(function(survey, options){

    if (options.name !== 'overallDevices') return;

    var answers=options.value;

    if (answers=="none" || answers=="Other device with internet access such as a smartwatch or an iPod" ){
        frequency=survey.getQuestionByName("frequency");
        frequency.visible=false;
    }
  });

  survey.onValueChanged.add(function(survey, options){

    if (options.name !== 'devicesForReading') return;

    var answers=options.value;

    if (answers=="none" ){
        textTypeForWork=survey.getQuestionByName("textTypeForWork");
        textTypeForWork.visible=false;
        textTypeForRecreation=survey.getQuestionByName("textTypeForRecreation");
        textTypeForRecreation.visible=false;

    }
  });


  //==================none option==================

  survey.onValueChanged.add(function(survey, options){

    if (options.name !== 'frequency') return;

    var answers=options.value;
    var sorted_answers =sort_object(answers);
    var results=[];
    for(var key in sorted_answers){
          results.push(key);

    }
    console.log(results);
    devicesForReading=survey.getQuestionByName("devicesForReading");
    devicesForReading.choices=results;
  });



  survey.onValueChanged.add(function(survey, options){
    //==================recreation==================
    if (options.name !== 'textTypeForRecreation') return;

    var answers=options.value;

    if (answers=="none"){
        frequencyForDeviceOnRecreation=survey.getQuestionByName("frequencyForDeviceOnRecreation");
        frequencyForDeviceOnRecreation.visible=false;
        return;
    }

    //console.log(options.value);
    textTypeForRecreation=options.value;
    devicesForReading=survey.getQuestionByName("devicesForReading").value;
    var results=[];
    var questionNum=0;
    for(var i = 0; i < devicesForReading.length; i ++) {
        for(var j = 0; j < textTypeForRecreation.length; j ++) {
              if (questionNum>45)break;
              var result="How often do you use <B>"+devicesForReading[i]+"</B> for reading <B>"+textTypeForRecreation[j]+"</B>\?"
              results.push(result);
              questionNum+=1;
            }
      }

    frequencyForDeviceOnRecreation=survey.getQuestionByName("frequencyForDeviceOnRecreation");
    frequencyForDeviceOnRecreation.rows=results;

    if(questionNum>45){
        textTypeForWork=survey.getQuestionByName("textTypeForWork");
        devicesForReading=survey.getQuestionByName("frequencyForDeviceOnWork");
        textTypeForWork.visible=false;
        devicesForReading.visible=false;

    }

  });


  survey.onValueChanged.add(function(survey, options){
    //==================work==================
    if (options.name !== 'textTypeForWork') return;

    var answers=options.value;

    if (answers=="none"){
        frequencyForDeviceOnWork=survey.getQuestionByName("frequencyForDeviceOnWork");
        frequencyForDeviceOnWork.visible=false;
        return;
    }


    textTypeForWork=options.value;
    textTypeForRecreation=survey.getQuestionByName("textTypeForRecreation").value;
    devicesForReading=survey.getQuestionByName("devicesForReading").value;


    questionLimit=45-textTypeForRecreation.length*devicesForReading.length;

    var results=[];
    var questionNum=0;
    for(var i = 0; i < devicesForReading.length; i ++) {
        for(var j = 0; j < textTypeForWork.length; j ++) {
              if (questionNum==questionLimit) break;
              var result="How often do you use <B>"+devicesForReading[i]+"</B> for <B>"+textTypeForWork[j]+"</B>\?"
              results.push(result);
              questionNum+=1;
            }
      }



    if(textTypeForRecreation=="none" ){
      frequencyForDeviceOnRecreation=survey.getQuestionByName("frequencyForDeviceOnRecreation");
      frequencyForDeviceOnRecreation.visible=false;
    }

    frequencyForDeviceOnWork=survey.getQuestionByName("frequencyForDeviceOnWork");
    frequencyForDeviceOnWork.rows=results;


  });



  survey.onComplete.add(function(result) {

    var ereaderQues=survey.getQuestionByName("E-Reader ID");
    ereaderQues.value=ereaderId;

    var resultData = survey.data;
    var questions = survey.getAllQuestions();
    for(var i = 0; i < questions.length; i ++) {
      var q = questions[i];
      var key = q.getValueName();
      //do nothing if question is answered
      if(resultData[key]) continue;
      //optionaly ignore invisible questions
      //if(!q.isVisible) continue;
      //set null for unanswered questions
      resultData[key] = null;
    }
    console.log(JSON.stringify(resultData));



    var xhr = new XMLHttpRequest();

    xhr.open("POST", "https://surveykg.inf.ed.ac.uk/surveykg/e-experience.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.send(JSON.stringify(resultData));

    xhr.onreadystatechange = function(){
      if(xhr.readyState==4 && xhr.status==200){
        console.log("e-experience response: "+xhr.responseText)
      }
    }


  });


  var converter = new showdown.Converter();
  survey
      .onTextMarkdown
      .add(function (survey, options) {
          //convert the markdown text to html
          var str = converter.makeHtml(options.text);
          //remove root paragraphs <p></p>
          str = str.substring(3);
          str = str.substring(0, str.length - 4);
          //set html
          options.html = str;
      });


  $("#surveyElement").Survey({
    model: survey
  });
}



if (!window["%hammerhead%"]) {
  init();
}
