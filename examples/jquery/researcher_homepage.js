
function init() {

  var json = {
    showProgressBar: "both",
    title: "Researcher Interface",
    logo: "../edinburgh.png",
    logoPosition: "left",
    description:"Welcome to our survey system",

    questions: [
            {
            type: "text",
            name: "numberOfQuestion",
            title: "Please set the number of question",
            isRequired: true,
            validators: [
                        {
                            type: "numeric",
                            minValue: 5,
                            maxValue: 100
                        }
                      ]
            },


    ]
  };

  Survey.StylesManager.applyTheme("default");

  window.survey = new Survey.Model(json);
  var flag=[0,0,0]
  survey.onComplete.add(function (result) {
        var questions=[];
        if (survey.currentPage.name=="page1" && flag[0]==0){


        var nothing={};
        nothing["type"]="html";
        nothing["name"]="nothing1";
        nothing["html"]="<span>Please set the questions with the corresponding question type.</span>";

        questions.push(nothing);

        number=survey.getQuestionByName('numberOfQuestion').value;

        for(var i = 0; i < number; i ++){
          var questionsContent={};
          questionsContent["type"]="text";
          questionsContent["name"]="question"+i;
          questionsContent["title"]="Please fill in the question for Q"+(i+1);
          questions.push(questionsContent);

          var questionType={};
          questionType["type"]="dropdown";
          questionType["startWithNewLine"]=false;
          questionType["name"]="questiontype"+i;
          questionType["title"]="Please select the question type for Q"+(i+1);
          questionType["choices"]= [
              "rating",
              "comment",
              "text",
              "boolean"
          ]
          questions.push(questionType);


        }
        }
        else if (survey.currentPage.name=="page2"){

        var questionsContent={};
        questionsContent["type"]="text";
        questionsContent["name"]="numberOfTag";
        questionsContent["title"]="Please set the number of tags"
        questions.push(questionsContent);
        //validation

        }
        else if (survey.currentPage.name=="page3" && flag[1]==0){

        var nothing={};
        nothing["type"]="html";
        nothing["name"]="nothing2";
        nothing["html"]="<span>Please write down all the tags, including the super class.(Should we have some example of super class?)</span>";

        questions.push(nothing);

        number=survey.getQuestionByName('numberOfTag').value;
        for(var i = 0; i < number; i ++){
            var questionsContent={};
            questionsContent["type"]="text";
            questionsContent["name"]="tag"+i;
            questionsContent["title"]="Please set Tag"+(i+1);
            questions.push(questionsContent);

        }
        }
        else if (survey.currentPage.name=="page4"){

        questionNumber=survey.getQuestionByName('numberOfQuestion').value;
        tagNumber=survey.getQuestionByName('numberOfTag').value;

        tags=[]
        for(var i = 0; i < tagNumber; i ++){
            tagName="tag"+i;
            tag=survey.getQuestionByName(tagName).value;
            tags.push(tag);

        }

        for(var i = 0; i < questionNumber; i ++){
            var questionsContent={};
            questionsContent["type"]="html";
            questionsContent["name"]="display"+i;
            questionsContent["html"]="<span>Q"+(i+1)+"</span></br><span>"+survey.getQuestionByName("question"+i).value+"</span>";
            questions.push(questionsContent);

            var questionsTag={};
            questionsTag["type"]="dropdown";
            questionsTag["startWithNewLine"]=false;
            questionsTag["name"]="questionTag"+i;
            questionsTag["choices"]= tags;
            questionsTag["title"]= "Please select tag to the Q"+(i+1)+". N.B. You should select the most specific more.";
            questions.push(questionsTag);
            //please annotate with the specifc classes
        }
        }
        else if (survey.currentPage.name=="page5" && flag[2]==0){

          var questionsContent={};
          questionsContent["type"]="text";
          questionsContent["title"]="Please set the number of relations";
          questionsContent["name"]="numberOfRelation";
          questions.push(questionsContent);
          //validation


        }


        else if (survey.currentPage.name=="page6"){



          relations=["is_super_class_of","is_disjoint_from"];

          relationNumber=survey.getQuestionByName('numberOfRelation').value;
          tagNumber=survey.getQuestionByName('numberOfTag').value;

          tags=[]
          for(var i = 0; i < tagNumber; i ++){
              tagName="tag"+i;
              tag=survey.getQuestionByName(tagName).value;
              tags.push(tag);

          }

        var nothing={};
        nothing["type"]="html";
        nothing["name"]="nothing3";
        nothing["html"]="<span>Relation links the tag1 and tag2.</span>";

        questions.push(nothing);


        for(var i = 0; i < relationNumber; i ++){

            var Tag1={};
            Tag1["type"]="dropdown";
            Tag1["name"]="tagInRelation1_"+i;
            Tag1["choices"]= tags;
            Tag1["title"]= "Tag1 for relation"+(i+1);
            questions.push(Tag1);

            var tagRelations={};
            tagRelations["type"]="dropdown";
            tagRelations["startWithNewLine"]=false;
            tagRelations["name"]="relation"+i;
            tagRelations["choices"]= relations;
            tagRelations["title"]= "Relation"+(i+1);
            questions.push(tagRelations);

            var Tag2={};
            Tag2["type"]="dropdown";
            Tag2["startWithNewLine"]=false;
            Tag2["name"]="tagInRelation2_"+i;
            Tag2["choices"]= tags;
            Tag2["title"]= "Tag2 for relation"+(i+1);
            questions.push(Tag2);

        }

        }
        else{
          return
        }



        var Question1={};
        Question1["questions"]=questions;

        var addedSurvey = new Survey.Model(Question1);
        var allAddedQuestions = addedSurvey.getAllQuestions();
        var page = survey.addNewPage("page" + (survey.pages.length + 1));
        for(var i = 0; i < allAddedQuestions.length; i ++) {
        page.addQuestion(allAddedQuestions[i]);
        }
        //Added lines
        survey.clear(false, false);
        var curPageNo = survey.currentPageNo;
        survey.currentPageNo = curPageNo + 1;
      });






  survey.onCurrentPageChanged.add(function(survey, options) {
      var oldPage = options.oldCurrentPage;
      var newPage = options.newCurrentPage;

      if (newPage < oldPage) {
          if (newPage=="page1"){
            flag[0]=1;
          }
          if (newPage=="page3"){
            flag[1]=1;
          }
          if (newPage=="page6"){
            flag[2]=1;
          }
      }
      else{

          questions=[]
          if(oldPage=="page1" && flag[0]==1){

              survey.getAllQuestions().forEach(function(question) {
                    if(question.page==newPage && question.name!="nothing1"){
                        newPage.removeQuestion(question);
                    }
                });
              //newPage.questions.forEach(function(question) { newPage.removeQuestion(question) });

              number=survey.getQuestionByName('numberOfQuestion').value;

              for(var i = 0; i < number; i ++){
                var questionsContent={};
                questionsContent["type"]="text";
                questionsContent["name"]="question"+i;
                questionsContent["title"]="Please fill in the question for Q"+(i+1);
                questions.push(questionsContent);

                var questionType={};
                questionType["type"]="dropdown";
                questionType["startWithNewLine"]=false;
                questionType["name"]="questiontype"+i;
                questionType["title"]="Please select the question type for Q"+(i+1);
                questionType["choices"]= [
                    "rating",
                    "comment",
                    "text",
                    "boolean"
                ]
                questions.push(questionType);
              }
              console.log("helloooo");
          }
          else if(oldPage=="page3" && flag[1]==1){

              survey.getAllQuestions().forEach(function(question) {
                    if(question.page==newPage && question.name!="nothing2"){
                        newPage.removeQuestion(question);
                    }
              });

              //newPage.questions.forEach(function(question) { newPage.removeQuestion(question) });
              number=survey.getQuestionByName('numberOfTag').value;
              for(var i = 0; i < number; i ++){
                  var questionsContent={};
                  questionsContent["type"]="text";
                  questionsContent["name"]="tag"+i;
                  questionsContent["title"]="Please set Tag"+(i+1);
                  questions.push(questionsContent);

              }

          }
          else if(oldPage=="page6" && flag[2]==1){

              survey.getAllQuestions().forEach(function(question) {
                    if(question.page==newPage && question.name!="nothing3"){
                        newPage.removeQuestion(question);
                    }
              });

              //newPage.questions.forEach(function(question) { newPage.removeQuestion(question) });
              relations=["is_super_class_of","is_disjoint_from"];

              relationNumber=survey.getQuestionByName('numberOfRelation').value;
              tagNumber=survey.getQuestionByName('numberOfTag').value;

              tags=[]
              for(var i = 0; i < tagNumber; i ++){
                  tagName="tag"+i;
                  tag=survey.getQuestionByName(tagName).value;
                  tags.push(tag);

              }

            for(var i = 0; i < relationNumber; i ++){

                var Tag1={};
                Tag1["type"]="dropdown";
                Tag1["name"]="tagInRelation1_"+i;
                Tag1["choices"]= tags;
                Tag1["title"]= "Tag1 for relation"+(i+1);
                questions.push(Tag1);

                var tagRelations={};
                tagRelations["type"]="dropdown";
                tagRelations["startWithNewLine"]=false;
                tagRelations["name"]="relation"+i;
                tagRelations["choices"]= relations;
                tagRelations["title"]= "Relation"+(i+1);
                questions.push(tagRelations);

                var Tag2={};
                Tag2["type"]="dropdown";
                Tag2["startWithNewLine"]=false;
                Tag2["name"]="tagInRelation2_"+i;
                Tag2["choices"]= tags;
                Tag2["title"]= "Tag2 for relation"+(i+1);
                questions.push(Tag2);

            }

          }
          else{
            return;
          }


      var json={};
      json["questions"]=questions;

      var addedSurvey = new Survey.Model(json);
      var allAddedQuestions = addedSurvey.getAllQuestions();
      var page = newPage;
      for(var i = 0; i < allAddedQuestions.length; i ++) {
      page.addQuestion(allAddedQuestions[i]);
      }
      //survey.clear(false, false);
    }
});



  /*survey.onComplete.add(function (result) {
         survey.clear(false, true);
         var addedSurvey = new Survey.Model(Question1);
         var allAddedQuestions = addedSurvey.getAllQuestions();
         var page = survey.pages[0];
         for(var i = 0; i < allAddedQuestions.length; i ++) {
           page.addQuestion(allAddedQuestions[i]);
         }
   var xhr = new XMLHttpRequest();

    xhr.open("POST", "https://e-reader.azurewebsites.net/e-experience.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


    xhr.onload = function() {
      if (this.status == 200) {
          alert(this.response);
        }
      else {
        alert('1111'+this.status);
      }
    }
    xhr.send(JSON.stringify(survey.data));
  });*/


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
