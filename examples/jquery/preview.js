function init() {
  //Add the price property into choices
  Survey.Serializer.addProperty("itemvalue", "price:number");


  Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
    }
    return -1;
  };
  Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
    this.splice(index, 1);
    }
  };



  var researcher_result = JSON.parse(Cookies.get("researcher_result"));

  var modifyCommentQuestion=function modifyCommentQuestion(value,question) {
      //var value=params[0];
      //var question=params[1];
      var dict = {
        1:"totally disagree",
        2:"disagree",
        3:"feel neutral",
        4:"agree",
        5:"totally agree",
        true:"agree",
        false:"disagree"
      };
      console.log("Why do you "+ dict[value] +" on \'"+ question+"\'\?")
      return "Why do you "+ dict[value] +" on \'"+ question+"\'\?"
  };



  var generateQuestion=function generateQuestion() {
    //get super class relations
    superClasses=[];
    for(var i=0; i<researcher_result["numberOfRelation"]; i++){
        if(researcher_result["relation"+i]=="is_super_class_of"){
            var superClass=researcher_result["tagInRelation1_"+i];
            if(! superClasses.includes(superClass)){
                superClasses.push(superClass);
          }
        }
    }

    //get all tags
    var tags={};
    for(var i=0; i<researcher_result["numberOfTag"]; i++){
          var tag=researcher_result["tag"+i];
          if(!superClasses.includes(tag)){
                tags[tag]=[]
              }
      }


    //questions for subclass
    for(var i=0; i<researcher_result["numberOfQuestion"]; i++){

          question=survey.getQuestionByName("question"+i);
          questionTag=researcher_result["questionTag"+i];
          for(var j=0; j<questionTag.length; j++){
                tags[questionTag[j]].push([question,i]);
          }
    }



    var newQuestions=[];
    var markQuestions=[];
    var attitude="";
    var attitudeDict={};

    //solve conflicts within subclass
    for(var tag in tags){
          questions=tags[tag];
          alternatives=[];
          alternativesIdx=[];
          for(var i=0; i< questions.length; i++){
              alternatives.push(questions[i][0]);
              alternativesIdx.push(questions[i][1])
          }
          //compare values
          markQuestions,newQuestions,attitude=compareQuestions(alternatives,alternativesIdx,markQuestions,newQuestions,tag);
          attitudeDict[tag]=attitude;
      }

    console.log(attitudeDict);
    //solve conflicts between subclass
    for(var i=0; i<researcher_result["numberOfRelation"]; i++){
        var tag1=researcher_result["tagInRelation1_"+i];
        var tag2=researcher_result["tagInRelation2_"+i];
        if(researcher_result["relation"+i]=="has_positive_association_with" && attitudeDict[tag1]!=attitudeDict[tag2] ){
            if (attitudeDict[tag1]=="disagree"){
              questions=tags[tag1];
              tag=tag1;
            }
            else{
              questions=tags[tag2];
              tag=tag2;
            }

            for(var j=0; j< questions.length; j++){
                alternatives=[];
                if(markQuestions.indexOf(questions[j][1])== -1){
                    alternatives.push(questions[j][0]);
                    markQuestions.push(questions[j][1]);
                }

            }
            var count=0;
            for (var k = 0; k < alternatives.length; k ++) {
                if(count>questions.length*0.5)break;
                var questionsContent={};
                questionsContent["type"]="comment";
                questionsContent["name"]="comment"+tag+k;
                questionsContent["title"]=modifyCommentQuestion(alternatives[k].value,alternatives[k].title);
                newQuestions.push(questionsContent);

            }
        }

        else if (researcher_result["relation"+i]=="is_disjoint_from (has_negative_association_with)" && attitudeDict[tag1]==attitudeDict[tag2]){

              var questions_=[tags[tag1],tags[tag2]];
              var tag_=[tag1,tag2];

              for (var q=0;q<questions_.length;q++){

                  tag=tag_[q];
                  questions=questions_[q];
                  console.log(questions);
                  alternatives=[];
                  for(var j=0; j< questions.length; j++){
                      console.log("####"+markQuestions)

                      if(markQuestions.indexOf(questions[j][1])== -1){
                          alternatives.push(questions[j][0]);
                          markQuestions.push(questions[j][1]);
                      }

                  }
                  var count=0;
                  for (var k = 0; k < alternatives.length; k ++) {
                      if(count>questions.length*0.5-1)break;
                      var questionsContent={};
                      questionsContent["type"]="comment";
                      questionsContent["name"]="comment"+tag+k;
                      questionsContent["title"]=modifyCommentQuestion(alternatives[k].value,alternatives[k].title);
                      newQuestions.push(questionsContent);
                      count+=1;

                  }
            }

        }




      }

    //is_disjoint_from (has_negative_association_with)


    return newQuestions;


  };

  var compareQuestions=function compareQuestions(alternatives,alternativesIdx,markQuestions,newQuestions,tag) {

      var k=0;
      var maxValue=alternatives[k].value;
      var j=0;
      var minValue=alternatives[j].value;

      var disagreeList=[];
      var agreeList= [];
      var disagreeListIdx=[];
      var agreeListIdx= [];

      for(var i = 0; i < alternatives.length; i ++) {
          //==========dealing with question type ============
          if (researcher_result["questionType"+alternativesIdx[i]]=="rating"){
              if(researcher_result["questionRev"+alternativesIdx[i]]==true){
                  var value=5-alternatives[i].value;
              }
              else{
                  var value=alternatives[i].value;
              }
          }
          else if(researcher_result["questionType"+alternativesIdx[i]]=="boolean"){

              if(researcher_result["questionRev"+alternativesIdx[i]]==true){
                  if(alternatives[i].value==true){
                    var value=1;
                  }
                  else{
                    var value=5;
                  }
              }
              else{
                  if(alternatives[i].value==true){
                    var value=5;
                  }
                  else{
                    var value=1;
                  }
              }
          }
          else{
            continue;
          }

          //============== comparing value ==============

          if (value>maxValue){
               k=i;
               maxValue=value;
             }
          if (value<minValue){
               j=i;
               minValue=value;
             }
          if (value>=4){
              agreeList.push(alternatives[i]);
              agreeListIdx.push(alternativesIdx[i]);
            }
          else {
              disagreeList.push(alternatives[i]);
              disagreeListIdx.push(alternativesIdx[i]);
            }
      }

      var selectedList=[]
      if (maxValue>3 && minValue<=3){
          if (agreeList.length>=disagreeList.length){ //choosing all disagreed questions
              var attitude="agree";
              for(var i=0; i< disagreeListIdx.length; i++){
                  if(markQuestions.indexOf(disagreeListIdx[i])==-1){
                    selectedList.push(disagreeList[i]);
                    markQuestions.push(disagreeListIdx[i]);
                  }
              }
          }
          else{
              var attitude="disagree";
              for(var i=0; i< agreeListIdx.length; i++){
                  if(markQuestions.indexOf(agreeListIdx[i])== -1){
                    selectedList.push(agreeList[i]);
                    markQuestions.push(agreeListIdx[i]);
                  }
              }
          }



      //generate questions
      for (var i = 0; i < selectedList.length; i ++) {
          var questionsContent={};
          questionsContent["type"]="comment";
          questionsContent["name"]="comment"+tag+i;
          questionsContent["title"]=modifyCommentQuestion(selectedList[i].value,selectedList[i].title);
          newQuestions.push(questionsContent);
      }
    }

    else if (maxValue<=3) {
        var attitude="disagree";
    }
    else if (minValue>3) {
        var attitude="agree";
    }


      return markQuestions,newQuestions,attitude

  };




  //Register the custom function
  Survey.FunctionFactory.Instance.register("modifyCommentQuestion", modifyCommentQuestion);
  Survey.FunctionFactory.Instance.register("generateQuestion", generateQuestion);
  Survey.FunctionFactory.Instance.register("compareQuestions", compareQuestions);


  var json = {
      //showProgressBar: "both",
      title: "User Homepage",
      //logo: "https://surveyjs.io/Content/Images/examples/image-picker/lion.jpg",
      //"completedHtml": "<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>",
      description:"Each item is on 7-point Likert scale: (1) Totally disagree, (2) Disagree, (3) Neutral, (4) Agree, (5) Totally agree",
      logo: "../edinburgh.png",
      logoPosition: "left",
      clearInvisibleValues: 'none'

  };
  //get question

  var questions=[];
  var pages=[];
  var page1={};
  var page2={};
  for(var i=0; i<researcher_result["numberOfQuestion"]; i++){
      var question={};
      question["name"]="question"+i;
      question["type"]=researcher_result["questionType"+i];
      question["title"]=researcher_result["question"+i];
      //question["isRequired"]=true
      questions.push(question);
  }
  page1["questions"]=questions;
  pages.push(page1);
  questions=[]

  var other={};
  other["type"]="html";
  other["name"]="other";
  other["html"]="Please try to explain your reasons as specific as possible in the following questions.";
  questions.push(other);

  page2["questions"]=questions;
  pages.push(page2);


  json["pages"]=pages;
  console.log(json)
  Survey.StylesManager.applyTheme("default");
  //var res = checkTransportationConsistency(`${json.pages[0].questions[0].title}`,1);
  //console.log(`${json.pages[0].questions[0].title}`);

  window.survey = new Survey.Model(json);

  var flag=0;//mark the change of the page

  survey.onComplete.add(function(survey, options) {
      console.log(JSON.stringify(survey.data));

  });




  survey.onCurrentPageChanged.add(function(survey, options) {

      var oldPage = options.oldCurrentPage;
      var newPage = options.newCurrentPage;
      if (newPage < oldPage) {//previous page

        flag=1;
      }
      else{//next page
        console.log("now is changing"+newPage)
        if(flag==1){
        survey.getAllQuestions().forEach(function(question) {
            if(question.page=="page2" && question.name!="other"){
                console.log(question.title)
                newPage.removeQuestion(question);

            }
          });
        }

        var newQuestions = generateQuestion();

        var json={};
        json["questions"]=newQuestions;

        var addedSurvey = new Survey.Model(json);
        var allAddedQuestions = addedSurvey.getAllQuestions();
        var page = newPage;
        for(var i = 0; i < allAddedQuestions.length; i ++) {
          page.addQuestion(allAddedQuestions[i]);
        }


    }
    });




  /*survey.onComplete.add(function(result) {
    console.log(JSON.stringify(survey.data));

    var resultData = survey.data;
    var questions = survey.getAllQuestions();
    for(var i = 0; i < questions.length; i ++) {
      var q = questions[i];
      var key = q.getValueName();
      //do nothing if question is answered
      if(resultData[key]) continue;
      resultData[key] = null;
    }

    console.log(JSON.stringify(resultData));
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "https://e-reader.azurewebsites.net/swas.php", true);
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

  });*/

  $("#surveyElement").Survey({
    model: survey
  });
}

if (!window["%hammerhead%"]) {
  init();
}
