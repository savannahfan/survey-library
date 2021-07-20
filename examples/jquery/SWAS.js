function init() {
  //Add the price property into choices
  Survey.Serializer.addProperty("itemvalue", "price:number");

  var ereaderId=Cookies.get("ereaderId");


  var modifyCommentQuestion=function modifyCommentQuestion(value,question) {
      //var value=params[0];
      //var question=params[1];
      var dict = {
        1:"totally disagree",
        2:"disagree",
        3:"somewhat disagree",
        4:"feel neutral",
        5:"somewhat agree",
        6:"agree",
        7:"totally agree"
      };
      console.log("Why do you "+ dict[value] +" on \'"+ question+"\'\?")
      return "Why do you "+ dict[value] +" on \'"+ question+"\'\?"
  };

  //Register the custom function
  Survey.FunctionFactory.Instance.register("modifyCommentQuestion", modifyCommentQuestion);

  var json = {
    //showProgressBar: "both",
    title: "The Story-World Absorption Scale (SWAS)",
    //logo: "https://surveyjs.io/Content/Images/examples/image-picker/lion.jpg",
    //"completedHtml": "<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>",
    description:"Each item is on 7-point Likert scale: (1) Totally disagree, (2) Disagree (3) Somewhat disagree, (4) Neutral, (5) Somewhat agree, (6) Agree, (7) Totally agree",
    logo: "../edinburgh.png",
    logoPosition: "left",
    pages: [
      {
          questions: [
            {
              name: "E-Reader ID",
              type: "text",
              title: "E-Reader ID",
              visible:false
            },
            {
              type: "rating",
              name: "transportation1",
              isRequired: true,
              title: "When I was finished with reading the story it felt like I had taken a trip to the world of the story ",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7

            },
            {
              type: "rating",
              name: "emotional1",
              isRequired: true,
              title: "I felt for what happened in the story",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7

            },
            {
              type: "rating",
              name: "attention1",
              isRequired: true,
              title: "I felt absorbed in the story",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7

            },
            {
              type: "rating",
              name: "mental1",
              isRequired: true,
              title: "I could imagine what the world in which the story took place looked like",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7

            },
            {
              type: "rating",
              name: "transportation2",
              isRequired: true,
              title: "When I was reading the story it sometimes seemed as if I were in the story world too ",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7

            },
            {
              type: "rating",
              name: "attention2",
              isRequired: true,
              title: "The story gripped me in such a way that I could close myself off for things that were happening around me",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "mental2",
              isRequired: true,
              title: "When I was reading the story I could see the situations happening in the story being played out before my eyes",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "transportation3",
              isRequired: true,
              title: "Because all of my attention went into the story, I sometimes felt as if I could not exist separate from the story",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "emotional2",
              isRequired: true,
              title: "I felt connected to the main character in the story",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "attention3",
              isRequired: true,
              title: "When I was reading the story I was focused on what happened in the story",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "mental3",
              isRequired: true,
              title: "When I was reading the story I had an image of the main character in mind",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "transportation4",
              isRequired: true,
              title: "The world of the story sometimes felt closer to me than the world around me",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "emotional3",
              isRequired: true,
              title: "I felt how the main character was feeling",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "attention4",
              isRequired: true,
              title: "I was reading in such a concentrated manner that I had forgotten the world around me",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "transportation5",
              isRequired: true,
              title: "When reading the story there were moments in which I felt that the story world overlapped with my own world",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "emotional4",
              isRequired: true,
              title: "When I read the story I could imagine what it must be like to be in the shoes of the main character",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "attention5",
              isRequired: true,
              title: "When I finished the story I was surprised to see that time had gone by so fast",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "emotional5",
              isRequired: true,
              title: "I felt sympathy for the main character",
              minRateDescription: "Totally disagree",
              maxRateDescription: "Totally agree",
              rateMax: 7,
            }


          ]
        },{
            questions:[
            {
              type: "comment",
              name: "transportationComment1",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "transportationComment2",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "emotionalComment1",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "emotionalComment2",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "attentionComment1",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "attentionComment2",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "mentalComment1",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "other",
              title: "Do you have other comments?",
              visible: true,
              //defaultValue: 'null',
            },
          ]
        }
      ],
      clearInvisibleValues: 'none'

  };

  Survey.StylesManager.applyTheme("default");
  //var res = checkTransportationConsistency(`${json.pages[0].questions[0].title}`,1);
  //console.log(`${json.pages[0].questions[0].title}`);

  window.survey = new Survey.Model(json);

  survey.onCurrentPageChanged.add(function(survey, options) {
    if (options.isPrevPage==true) return //clicking 'previous' button, we skip the following process
    console.log(survey.currentPageNo)
    for (var m = 0; m < 4; m ++){
      if (m==0){
          alternative1=survey.getQuestionByName("attention1");
          alternative2=survey.getQuestionByName("attention2");
          alternative3=survey.getQuestionByName("attention3");
          alternative4=survey.getQuestionByName("attention4");
          alternative5=survey.getQuestionByName("attention5");
          var alternatives=[alternative1,alternative2,alternative3,alternative4,alternative5];

          comment1=survey.getQuestionByName("attentionComment1");
          comment2=survey.getQuestionByName("attentionComment2");
          var comments=[comment1,comment2];
      }
      else if (m==1){
          alternative1=survey.getQuestionByName("transportation1");
          alternative2=survey.getQuestionByName("transportation2");
          alternative3=survey.getQuestionByName("transportation3");
          alternative4=survey.getQuestionByName("transportation4");
          alternative5=survey.getQuestionByName("transportation5");
          var alternatives=[alternative1,alternative2,alternative3,alternative4,alternative5];

          comment1=survey.getQuestionByName("transportationComment1");
          comment2=survey.getQuestionByName("transportationComment2");
          var comments=[comment1,comment2];
      }
      else if (m==2){
          alternative1=survey.getQuestionByName("emotional1");
          alternative2=survey.getQuestionByName("emotional2");
          alternative3=survey.getQuestionByName("emotional3");
          alternative4=survey.getQuestionByName("emotional4");
          alternative5=survey.getQuestionByName("emotional5");
          var alternatives=[alternative1,alternative2,alternative3,alternative4,alternative5];

          comment1=survey.getQuestionByName("emotionalComment1");
          comment2=survey.getQuestionByName("emotionalComment2");
          var comments=[comment1,comment2];
      }
      else {
          alternative1=survey.getQuestionByName("mental1");
          alternative2=survey.getQuestionByName("mental2");
          alternative3=survey.getQuestionByName("mental3");
          var alternatives=[alternative1,alternative2,alternative3];

          comment1=survey.getQuestionByName("mentalComment1");
          var comments=[comment1];
      }


      var k=0;
      var maxValue=alternatives[k].value;
      var j=0;
      var minValue=alternatives[j].value;

      var disagreeList=[]
      var agreeList= []

      for(var i = 0; i < alternatives.length; i ++) {
          if (alternatives[i].value>maxValue){
               k=i;
               maxValue=alternatives[i].value;
             }
          if (alternatives[i].value<minValue){
               j=i;
               minValue=alternatives[i].value;
             }
          if (alternatives[i].value>=4){
              agreeList.push(alternatives[i]);
            }
          else {
              disagreeList.push(alternatives[i]);
            }


      }

      var selectedList=[]
      if (maxValue>4 && minValue<=4){
          if (agreeList.length>=disagreeList.length){ //choosing all disagreed questions
              selectedList=disagreeList;
          }
          else{
              selectedList=agreeList;
          }

          for (var i = 0; i < selectedList.length; i ++) {
              comments[i].visible=true;
              comments[i].isRequired=true;
              comments[i].title=modifyCommentQuestion(selectedList[i].value,selectedList[i].title);
          }


          for (var j = selectedList.length; j < comments.length; j ++) {
              comments[j].visible=false;
              comments[j].isRequired=false;
          }


        }
      else{
          for (var j =0; j < comments.length; j ++) {
              comments[j].visible=false;
              comments[j].isRequired=false;
          }
      }
    }
  });




  survey.onComplete.add(function(result) {

    var ereaderQues=survey.getQuestionByName("E-Reader ID");
    ereaderQues.value=ereaderId;

    console.log(JSON.stringify(survey.data));

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

    xhr.open("POST", "http://surveykg.inf.ed.ac.uk/surveykg/swas.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");



    xhr.send(JSON.stringify(resultData));
    console.log(JSON.stringify(resultData))

    //document.querySelector("#surveyResult").innerHTML =
    //  "result: " + JSON.stringify(result.data);
  });

  $("#surveyElement").Survey({
    model: survey
  });
}

if (!window["%hammerhead%"]) {
  init();
}
