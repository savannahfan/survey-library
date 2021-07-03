function init() {
  //Add the price property into choices
  Survey.Serializer.addProperty("itemvalue", "price:number");



  var modifyCommentQuestion=function modifyCommentQuestion(value,question) {
      //var value=params[0];
      //var question=params[1];
      var dict = {
        1:"disagree",
        2:"disagree",
        3:"disagree",
        4:"feel neutral",
        5:"agree",
        6:"agree",
        7:"agree"
      };
      console.log("Why do you "+ dict[value] +" on \'"+ question+"\'\?")
      return "Why do you "+ dict[value] +" on \'"+ question+"\'\?"
  };

  //Register the custom function
  Survey.FunctionFactory.Instance.register("modifyCommentQuestion", modifyCommentQuestion);

  var json = {
    //showProgressBar: "both",
    title: "Task Intrinsic Motivation Inventory (Task-IMI)",
    //logo: "https://surveyjs.io/Content/Images/examples/image-picker/lion.jpg",
    //"completedHtml": "<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>",
    description:"Each item is on 7-point Likert scale: (1) (2), (3) Not at all true, (4) neutral, (5), (6), (7) Very true",
    logo: "../edinburgh.png",
    logoPosition: "left",
    pages: [
      {
          questions: [
            {
              type: "rating",
              name: "interest1",
              isRequired: true,
              title: "While I was reading the story, I was thinking about how much I enjoyed it",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7

            },
            {
              type: "rating",
              name: "competence1",
              isRequired: true,
              title: "Reading this story was an activity that I couldn’t do very well",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7

            },
            {
              type: "rating",
              name: "choice1",
              isRequired: true,
              title: "I read the story because I had to",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7

            },
            {
              type: "rating",
              name: "pressure1",
              isRequired: true,
              title: "I was anxious while reading the story",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7

            },
            {
              type: "rating",
              name: "effort1",
              isRequired: true,
              title: "It was important to me to do well at reading the story",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7

            },
            {
              type: "rating",
              name: "interest2",
              isRequired: true,
              title: "Reading the story was a boring activity",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7

            },
            {
              type: "rating",
              name: "choice2",
              isRequired: true,
              title: "I felt like it was not my own choice to read the story",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "pressure2",
              isRequired: true,
              title: "I felt pressured while reading the story",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "effort2",
              isRequired: true,
              title: "I didn’t put much energy into reading the story",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "interest3",
              isRequired: true,
              title: "I would describe reading this story as very interesting",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "competence2",
              isRequired: true,
              title: "I was pretty skilled at reading the story",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "choice3",
              isRequired: true,
              title: "I read the story because I had no choice",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "effort3",
              isRequired: true,
              title: "I put a lot of effort into reading the story",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "interest4",
              isRequired: true,
              title: "I thought that reading this story was quite enjoyable",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "competence3",
              isRequired: true,
              title: "I think I read the story pretty well, compared to others",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "choice4",
              isRequired: true,
              title: "I read the story because I wanted to",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "interest5",
              isRequired: true,
              title: "Reading the story was fun to do",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "competence4",
              isRequired: true,
              title: "I think I am pretty good at reading stories",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "choice5",
              isRequired: true,
              title: "I felt like I had to read the story",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "competence5",
              isRequired: true,
              title: "I am satisfied with my performance at reading this story",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "effort4",
              isRequired: true,
              title: "I didn’t try very hard to read the story well",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "interest6",
              isRequired: true,
              title: "Reading the story did not hold my attention at al",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "choice6",
              isRequired: true,
              title: "I didn’t really have a choice about reading the story",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "effort5",
              isRequired: true,
              title: "I tried very hard to read the story",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "interest7",
              isRequired: true,
              title: "I enjoyed reading the story",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "choice7",
              isRequired: true,
              title: "I believe I had some choice about reading the story",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },
            {
              type: "rating",
              name: "competence6",
              isRequired: true,
              title: "After working on reading this story for a while, I felt pretty competent",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
            },


          ]
        },{
            questions:[
            {
              type: "rating",
              name: "overalChoice",
              title: "Do you feel choice?",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
              visible: false,
            },
            {
              type: "rating",
              name: "overalInterest",
              title: "Do you feel interest?",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
              visible: false,
            },
            {
              type: "rating",
              name: "overalCompetence",
              title: "Do you feel competence?",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
              visible: false,
            },
            {
              type: "rating",
              name: "overalEffort",
              title: "Do you feel effort?",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
              visible: false,
            },
            {
              type: "rating",
              name: "overalPressure",
              title: "Do you feel pressure?",
              minRateDescription: "not at all true",
              maxRateDescription: "very true",
              rateMax: 7,
              visible: false,
            },

            {
              type: "comment",
              name: "interestComment1",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "interestComment2",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "interestComment3",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "competenceComment1",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "competenceComment2",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "competenceComment3",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "choiceComment1",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "choiceComment2",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "choiceComment3",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "effortComment1",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "effortComment2",
              visible: false,
              //defaultValue: 'null',
            },
            {
              type: "comment",
              name: "pressureComment1",
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
  //var res = checkinterestConsistency(`${json.pages[0].questions[0].title}`,1);
  //console.log(`${json.pages[0].questions[0].title}`);

  window.survey = new Survey.Model(json);

  survey.onCurrentPageChanged.add(function(survey, options) {
    if (options.isPrevPage==true) return //clicking 'previous' button, we skip the following process

    for (var m = 0; m < 5; m ++){
      if (m==0){
          alternative1=survey.getQuestionByName("choice1");
          alternative2=survey.getQuestionByName("choice2");
          alternative3=survey.getQuestionByName("choice3");
          alternative4=survey.getQuestionByName("choice4");
          alternative5=survey.getQuestionByName("choice5");
          alternative6=survey.getQuestionByName("choice6");
          alternative7=survey.getQuestionByName("choice7");
          var alternatives=[alternative1,alternative2,alternative3,alternative4,alternative5,alternative6,alternative7];

          comment1=survey.getQuestionByName("choiceComment1");
          comment2=survey.getQuestionByName("choiceComment2");
          comment3=survey.getQuestionByName("choiceComment3");
          var comments=[comment1,comment2,comment3];
          var overalquestion=survey.getQuestionByName("overalChoice");

      }
      else if (m==1){
          alternative1=survey.getQuestionByName("interest1");
          alternative2=survey.getQuestionByName("interest2");
          alternative3=survey.getQuestionByName("interest3");
          alternative4=survey.getQuestionByName("interest4");
          alternative5=survey.getQuestionByName("interest5");
          alternative6=survey.getQuestionByName("interest6");
          alternative7=survey.getQuestionByName("interest7");
          var alternatives=[alternative1,alternative2,alternative3,alternative4,alternative5,alternative6,alternative7];

          comment1=survey.getQuestionByName("interestComment1");
          comment2=survey.getQuestionByName("interestComment2");
          comment3=survey.getQuestionByName("interestComment3");
          var comments=[comment1,comment2,comment3];
          overalquestion=survey.getQuestionByName("overalInterest");
      }
      else if (m==2){
          alternative1=survey.getQuestionByName("competence1");
          alternative2=survey.getQuestionByName("competence2");
          alternative3=survey.getQuestionByName("competence3");
          alternative4=survey.getQuestionByName("competence4");
          alternative5=survey.getQuestionByName("competence5");
          alternative6=survey.getQuestionByName("competence6");
          var alternatives=[alternative1,alternative2,alternative3,alternative4,alternative5,alternative6];

          comment1=survey.getQuestionByName("competenceComment1");
          comment2=survey.getQuestionByName("competenceComment2");
          var comments=[comment1,comment2];
          var overalquestion=survey.getQuestionByName("overalCompetence");
      }
      else if (m==3){
          alternative1=survey.getQuestionByName("effort1");
          alternative2=survey.getQuestionByName("effort2");
          alternative3=survey.getQuestionByName("effort3");
          alternative4=survey.getQuestionByName("effort4");
          alternative5=survey.getQuestionByName("effort5");
          var alternatives=[alternative1,alternative2,alternative3,alternative4,alternative5];

          comment1=survey.getQuestionByName("effortComment1");
          comment2=survey.getQuestionByName("effortComment2");
          var comments=[comment1,comment2];
          var overalquestion=survey.getQuestionByName("overalEffort");
      }
      else {
          alternative1=survey.getQuestionByName("pressure1");
          alternative2=survey.getQuestionByName("pressure2");
          var alternatives=[alternative1,alternative2];

          comment1=survey.getQuestionByName("pressureComment1");
          var comments=[comment1];
          var overalquestion=survey.getQuestionByName("overalPressure");

      }


      var alternativesValue=[];
      for (var i=0; i<alternatives.length; i++){
        alternativesValue.push(alternatives[i].value);
      }


      var changeInverseValueDict={0:[0,1,2,4,5],1:[1,5],3:[1,3],4:[0,1]};
      if (changeInverseValueDict.hasOwnProperty(m)){
        for(var i=0; i<changeInverseValueDict[m].length; i++){
            var idx=changeInverseValueDict[m][i];
             alternativesValue[idx]=7-alternativesValue[idx];
        }
      }


      var k=0;
      var maxValue=alternativesValue[k];
      var j=0;
      var minValue=alternativesValue[j];

      var disagreeList=[]
      var agreeList= []

      for(var i = 0; i < alternatives.length; i ++) {
          if (alternativesValue[i]>maxValue){
               k=i;
               maxValue=alternativesValue[i];
             }
          if (alternativesValue[i]<minValue){
               j=i;
               minValue=alternativesValue[i];
             }
         if (alternativesValue[i]>=4){
             agreeList.push(alternatives[i]);
           }
         else {
             disagreeList.push(alternatives[i]);
           }

      }


      var selectedList=[]
      if (maxValue>4 && minValue<=4){
          overalquestion.visible=true;
          overalquestion.isRequired=true;
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

          overalquestion.visible=false;
          overalquestion.isRequired=false;
          for (var j =0; j < comments.length; j ++) {
              comments[j].visible=false;
              comments[j].isRequired=false;
          }
      }
    }
  });



  survey.onComplete.add(function(result) {
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

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "http://surveykg.inf.ed.ac.uk/surveykg/taskIMI.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


    xhr.onload = function() {
      if (this.status == 200) {
          alert(this.response);
        }
      else {
        alert('1111'+this.status);
      }
    }
    xhr.send(JSON.stringify(resultData));

    console.log(JSON.stringify(resultData))
    //document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(resultData);
  });

  $("#surveyElement").Survey({
    model: survey
  });
}



if (!window["%hammerhead%"]) {
  init();
}
