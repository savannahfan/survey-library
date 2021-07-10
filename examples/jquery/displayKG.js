
    var researcher_result={"numberOfQuestion":"8","question0":"I am question1","questiontype0":"rating","question1":"I am question2","questiontype1":"rating","question2":"I am question3","questiontype2":"rating","question3":"I am question4","questiontype3":"rating","question4":"I am question5","questiontype4":"rating","question5":"I am question6","questiontype5":"rating","question6":"I am question7","questiontype6":"rating","question7":"I am question8","questiontype7":"rating","numberOfTag":"4","tag0":"emotion","tag1":"sad","tag2":"excited","tag3":"happy","questionTag0":["sad"],"questionTag1":["excited","happy"],"questionTag2":["excited"],"questionTag3":["happy"],"questionTag4":["sad"],"questionTag5":["excited","happy"],"questionTag6":["sad"],"questionTag7":["excited"],"numberOfRelation":"6","tagInRelation1_0":"emotion","relation0":"is_super_class_of","tagInRelation2_0":"sad","tagInRelation1_1":"emotion","relation1":"is_super_class_of","tagInRelation2_1":"excited","tagInRelation1_2":"emotion","relation2":"is_super_class_of","tagInRelation2_2":"happy","tagInRelation1_3":"sad","relation3":"is_disjoint_from","tagInRelation2_3":"excited","tagInRelation1_4":"sad","relation4":"is_disjoint_from","tagInRelation2_4":"happy","tagInRelation1_5":"excited","relation5":"has_positive_association_with","tagInRelation2_5":"excited"}

    var researcher_result = JSON.parse(Cookies.get("researcher_result"));

    var myData=[]
    var superClasses=[];
    for(var i=0; i<researcher_result["numberOfRelation"]; i++){
        if(researcher_result["relation"+i]=="is_super_class_of"){
            var superClass=researcher_result["tagInRelation1_"+i];
            if(! superClasses.includes(superClass)){
                superClasses.push(superClass);

                dataDict={};
                dataDict["name"]=superClass;
                dataDict["des"]=superClass;
                dataDict["symbolSize"]=70;
                dataDict["category"]=0;
                myData.push(dataDict);

          }
        }
    }

    //get all tags
    var tags={};
    for(var i=0; i<researcher_result["numberOfTag"]; i++){
          var tag=researcher_result["tag"+i];
          if(!superClasses.includes(tag)){
              dataDict={};
              dataDict["name"]=tag;
              dataDict["des"]=tag;
              dataDict["symbolSize"]=50;
              dataDict["category"]=1;
              myData.push(dataDict);
              }
      }


      var myLinks=[]
      for(var i=0; i<researcher_result["numberOfRelation"]; i++){
            linkDict={};
            linkDict["source"]=researcher_result["tagInRelation1_"+i];
            linkDict["target"]=researcher_result["tagInRelation2_"+i];
            linkDict["name"]=researcher_result["relation"+i];
            linkDict["des"]=researcher_result["relation"+i];
            myLinks.push(linkDict);

      }



    var myChart = echarts.init(document.getElementById('main'));
    var categories = [];
    for (var i = 0; i < 2; i++) {
        categories[i] = {
            name: 'layer' + (i+1)
        };
    }
    option = {
        // 图的标题
        title: {
            text: 'KG demo'
        },
        // 提示框的配置
        tooltip: {
            formatter: function (x) {
                return x.data.des;
            }
        },
        // 工具箱
        toolbox: {
            // 显示工具箱
            show: true,
            feature: {
                mark: {
                    show: true
                },
                // 还原
                restore: {
                    show: true
                },
                // 保存为图片
                saveAsImage: {
                    show: true
                }
            }
        },
        legend: [{
            // selectedMode: 'single',
            data: categories.map(function (a) {
                return a.name;
            })
        }],
        series: [{
            type: 'graph', // 类型:关系图
            layout: 'force', //图的布局，类型为力导图
            symbolSize: 40, // 调整节点的大小
            roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [2, 10],
            edgeLabel: {
                normal: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            force: {
                repulsion: 2500,
                edgeLength: [100, 500]
            },
            draggable: true,
            lineStyle: {
                normal: {
                    width: 2,
                    color: '#4b565b',
                }
            },
            edgeLabel: {
                normal: {
                    show: true,
                    formatter: function (x) {
                        return x.data.name;
                    }
                }
            },
            label: {
                normal: {
                    show: true,
                    textStyle: {}
                }
            },

            // 数据
            data: myData,
            links: myLinks,
            categories: categories,
        }]
    };
    myChart.setOption(option);
