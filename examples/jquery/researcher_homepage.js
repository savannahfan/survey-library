var researcherId =Cookies.get("researcherId");

if (researcherId==null){
    alert("please login");
    window.location.href="./login.html";
}


function init() {

  var json = {
    showProgressBar: "both",
    title: "Researcher Interface",
    logo: "../edinburgh.png",
    logoPosition: "left",
    description:"The Researcher Interface is realized to help researchers to design their own questionnaire automatically. \n\n The workflow is as follows: set the number of questions -> define questions and corresponding question types ->  set the number of tags -> set tags -> annotete the questions with tags -> set the number of relations -> assign relations to the corresponding tags. \n\n The labels depend on the research questions. And the relations should be based on the proposed hypotheses.",

    questions: [
            {
              name: "Researcher ID",
              type: "text",
              title: "Researcher ID",
              visible:false
            },
            {
            type: "text",
            name: "numberOfQuestion",
            title: "Please set the number of question",
            isRequired: true,
            popupdescription: "If you do not use any of the listed operating system, please select 'others' and type your operating system name.",
            validators: [
                        {
                            type: "numeric",
                            minValue: 1,
                            maxValue: 100
                        }
                      ]
            }


    ]
  };

  Survey.StylesManager.applyTheme("default");


  window.survey = new Survey.Model(json);
  var flag=[0,0,0,0]
  survey.onComplete.add(function (result) {

        var researcherQues=survey.getQuestionByName("Researcher ID");
        researcherQues.value=researcherId;


        var questions=[];
        if (survey.currentPage.name=="page1" && flag[0]==0){


        var nothing={};
        nothing["type"]="html";
        nothing["name"]="nothing1";
        nothing["html"]="<span>Please set the questions <strong>in the order of importance</strong> with the corresponding question type.</span><br/><span><strong>N.B. Reversed question means the question is expressed in an opposite way, e.g. I didn’t put much energy into the study.</strong></span>";

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
          questionType["name"]="questionType"+i;
          questionType["title"]="Please select the question type for Q"+(i+1);
          questionType["choices"]= [
              "rating",
              "comment",
              "text",
              "boolean"
          ]
          questions.push(questionType);


          var questionRev={};
          questionRev["type"]="boolean";
          questionRev["startWithNewLine"]=false;
          questionRev["name"]="questionRev"+i;
          questionRev["title"]="Is the question expression reversed?";

          questions.push(questionRev);


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
        nothing["html"]="<span>Please write down all the tags, including the super class.</span><br/><span>E.g. Emotion can be the super class of happiness.</span>";

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
            questionsTag["type"]="tagbox";
            questionsTag["startWithNewLine"]=false;
            questionsTag["name"]="questionTag"+i;
            questionsTag["choices"]= tags;
            questionsTag["title"]= "Please select tag to the Q"+(i+1)+". N.B. You should select the most specific tags.";
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



          relations=["is_super_class_of","is_disjoint_from (has_negative_association_with)","has_positive_association_with"];

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
          nothing["html"]="Please set the relations between tags";

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
        else if (survey.currentPage.name=="page7"){


              console.log(JSON.stringify(survey.data));
              var researcher_result=JSON.stringify(survey.data);
              Cookies.set('researcher_result', researcher_result);

              var nothing={};
              nothing["type"]="html";
              nothing["name"]="nothing4";
              nothing["html"]="<span>You can check the knowledge graph by dragging or zooming in.</span><br/><span>The survey can be preview:<a href='./preview.html'  target='_blank'>link</a></span>";

              questions.push(nothing);


              var kg={};
              kg["type"]="html";
              kg["name"]="kg";
              kg["html"]='<iframe width="900" height="600" src="./displayKG.html" align="middle">';

              questions.push(kg);





        }
        else{//complete the whole survey

            var xhr = new XMLHttpRequest();

            xhr.open("POST", "http://surveykg.inf.ed.ac.uk/surveykg/researcher.php", true);
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
           //xhr.send(survey.data);



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
          if (newPage=="page7"){
            flag[3]=1;
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
                questionType["name"]="questionType"+i;
                questionType["title"]="Please select the question type for Q"+(i+1);
                questionType["choices"]= [
                    "rating",
                    "comment",
                    "text",
                    "boolean"
                ]
                questions.push(questionType);


                var questionRev={};
                questionRev["type"]="boolean";
                questionRev["startWithNewLine"]=false;
                questionRev["name"]="questionRev"+i;
                questionRev["title"]="Is the question expression reversed?";

                questions.push(questionRev);

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
              relations=["is_super_class_of","is_disjoint_from (has_negative_association_with)","has_positive_association_with"];

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
          else if(oldPage=="page7" && flag[3]==1){
              researcher_result=JSON.stringify(survey.data);
              Cookies.set('researcher_result', researcher_result);

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
