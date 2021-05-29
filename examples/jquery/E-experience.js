function init() {
  //Add the price property into choices
  Survey.Serializer.addProperty("itemvalue", "price:number");

  function sort_object(obj) {
    items = Object.keys(obj).map(function(key) {
        return [key, obj[key]];
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
    description:"Congratulation! You have finished all the readings. Now please fill in the information and complete the following surveys.",

    questions: [
            {
            type: "checkbox",
            name: "overallDevices",
            title: "Which of the following devices do you own or have regular access to? Select all that apply",
            isRequired: true,
            colCount: 1,
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
            title: "How often do you use the following devices? ",
            visibleIf: "{overallDevices.length} > 0",
            rowsVisibleIf: "{overallDevices} contains {item}",
            columns: [
              //"Once a month", "2-3 times a month", "Once a week", "2-3 times a week", "4-6 times a week", "Once daily", "2-4 times daily","More than 4 times daily"
                {
                    value: 1,
                    text: "Once a month"
                }, {
                    value: 2,
                    text: "2-3 times a month"
                }, {
                    value: 3,
                    text: "Once a week"
                }, {
                    value: 4,
                    text: "2-3 times a week"
                }, {
                    value: 5,
                    text: "4-6 times a week"
                }, {
                    value: 6,
                    text: "Once daily"
                }, {
                    value: 7,
                    text: "2-4 times daily"
                }, {
                    value: 8,
                    text: "More than 4 times daily"
                }
              ],
              rows: [
                  "Dedicated e-reader with an e-ink screen (such as Kindle Paperwhite, Kobo or Nook)",
                  "Desktop computer",
                  "Laptop",
                  "Smartphone",
                  "Tablet computer (such as iPad)",
                  "Other device with internet access such as a smartwatch or an iPod",
              ]
            },
            {
            type: "checkbox",
            name: "devicesForReading",
            visibleIf: "{frequency} notempty",
            title: "Which of the following devices do you use for reading? The reading can be done recreationally or for work or study purposes. Select all that apply",
            isRequired: true,
            colCount: 1,
            choices: [
              ]
            },
            {
            type: "checkbox",
            name: "textTypeForRecreation",
            visibleIf: "{devicesForReading} notempty",
            title: "Which of the following text types have you read electronically for recreational purposes? Select all that apply",
            isRequired: true,
            colCount: 1,
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
            visibleIf: "{textTypeForRecreation} notempty",
            columns: [
                {
                    value: 1,
                    text: "Rarely, not every year"
                }, {
                    value: 2,
                    text: "A few times a year"
                }, {
                    value: 3,
                    text: "A few times a month"
                }, {
                    value: 4,
                    text: "A few times a week"
                }, {
                    value: 5,
                    text: "Everyday"
                }
              ],
              rows: [
              ]
            },
            {
            type: "checkbox",
            name: "textTypeForWork",
            visibleIf: "{devicesForReading} notempty",
            title: "Which of the following text types have you read electronically for work or study? Select all that apply",
            isRequired: true,
            colCount: 1,
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
            visibleIf: "{textTypeForWork} notempty",
            columns: [
                {
                    value: 1,
                    text: "Rarely, not every year"
                }, {
                    value: 2,
                    text: "A few times a year"
                }, {
                    value: 3,
                    text: "A few times a month"
                }, {
                    value: 4,
                    text: "A few times a week"
                }, {
                    value: 5,
                    text: "Everyday"
                }
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



            /*{
             "type": "paneldynamic",
             "name": "generatedQuestion",
             "title": "Please enter all blood relatives you know",
             //"templateTitle": "Information about: {panel.relativeType}",
             "templateElements": [
                 {
                     "name": "relativeType",
                     "type": "dropdown",
                     "title": "Relative",
                     "choices": [
                         "father",
                         "mother",
                         "brother",
                         "sister",
                         "son",
                         "daughter"
                     ],
                     "isRequired": true
                 },{
                      type: "dropdown",
                      name: "car",
                      title: "How often do you use <device> for recreational reading of <text type>?",
                      isRequired: true,
                      colCount: 0,
                      choices: [
                          "Rarely, not every year",
                          "A few times a year",
                          "A few times a month",
                          "A few times a week",
                          "Everyday",
                      ]
                  },{

                     "name": "isalive",
                     "type": "radiogroup",
                     "title": "Alive?",
                     "startWithNewLine": false,
                     "isRequired": true,
                     "colCount": 0,
                     "choices": ["Yes", "No"]
                 }, {
                     "name": "liveage",
                     "type": "dropdown",
                     "title": "Age",
                     "isRequired": true,
                     "startWithNewLine": false,
                     "visibleIf": "{panel.isalive} = 'Yes'",
                     "choicesMin": 1,
                     "choicesMax": 115
                 }, {
                     "name": "deceasedage",
                     "type": "dropdown",
                     "title": "Deceased Age",
                     "isRequired": true,
                     "startWithNewLine": false,
                     "visibleIf": "{panel.isalive} = 'No'",
                     "choices": [
                         {
                             "value": -1,
                             "text": "Unknown"
                         }
                     ],
                     "choicesMin": 1,
                     "choicesMax": 115
                 }, {
                     "name": "causeofdeathknown",
                     "type": "radiogroup",
                     "title": "Cause of Death Known?",
                     "isRequired": true,
                     "colCount": 0,
                     "startWithNewLine": false,
                     "visibleIf": "{panel.isalive} = 'No'",
                     "choices": ["Yes", "No"]
                 }, {
                     "name": "causeofdeath",
                     "type": "text",
                     "title": "Cause of Death",
                     "isRequired": true,
                     "startWithNewLine": false,
                     "visibleIf": "{panel.isalive} = 'No' and {panel.causeofdeathknown} = 'Yes'"
                 },
                     ]
                 }
             ],
             "panelCount": 2,*/








    ]
  };

  Survey.StylesManager.applyTheme("default");

  window.survey = new Survey.Model(json);
  survey.onValueChanged.add(function(survey, options){

    if (options.name !== 'frequency') return;
    //console.log(options.value);

    var answers=options.value;
    var sorted_answers =sort_object(answers);
    var results=[];
    for(var key in sorted_answers){
        console.log('###'+answers[key])
        if(answers[key]>3){
          console.log('now'+key)
          results.push(key);
        }
    }
    console.log(results);


    devicesForReading=survey.getQuestionByName("devicesForReading");
    devicesForReading.choices=results;
  });

  survey.onValueChanged.add(function(survey, options){

    if (options.name !== 'textTypeForRecreation') return;
    //console.log(options.value);
    textTypeForRecreation=options.value;
    devicesForReading=survey.getQuestionByName("devicesForReading").value;
    var results=[];
    for(var i = 0; i < devicesForReading.length; i ++) {
        for(var j = 0; j < textTypeForRecreation.length; j ++) {
              var result="How often do you use <B>"+devicesForReading[i]+"</B> for <B>"+textTypeForRecreation[j]+"</B>\?"
              results.push(result);
            }
      }

    console.log(results);


    devicesForReading=survey.getQuestionByName("frequencyForDeviceOnRecreation");
    devicesForReading.rows=results;


  });

  survey.onValueChanged.add(function(survey, options){

    if (options.name !== 'textTypeForWork') return;
    //console.log(options.value);
    textTypeForWork=options.value;
    devicesForReading=survey.getQuestionByName("devicesForReading").value;
    var results=[];
    for(var i = 0; i < devicesForReading.length; i ++) {
        for(var j = 0; j < textTypeForWork.length; j ++) {
              var result="How often do you use <B>"+devicesForReading[i]+"</B> for <B>"+textTypeForWork[j]+"</B>\?"
              results.push(result);
            }
      }

    console.log(results);


    devicesForReading=survey.getQuestionByName("frequencyForDeviceOnWork");
    devicesForReading.rows=results;


  });



  survey.onComplete.add(function(result) {
    document.querySelector("#surveyResult").innerHTML =
      "result: " + JSON.stringify(result.data);
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
