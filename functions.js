
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
function myFunctionInit() {
    document.getElementById("demo").innerHTML = "Paragraph changed.";
    //alert("aksjdklasjdk")
    //$.getJSON('https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json', function(data) {
    $.getJSON('https://raw.githubusercontent.com/marrtins/datapr/master/getData.json', function(data) {//document.getElementById("demo2").innerHTML = data.groups.a.matches[5].name;

    var teams = data.teams;

    groupAMatches=parseMatches(data.groups.a.matches,teams);
    groupBMatches=parseMatches(data.groups.b.matches,teams);
    groupCMatches=parseMatches(data.groups.c.matches,teams);
    groupDMatches=parseMatches(data.groups.d.matches,teams);
    groupEMatches=parseMatches(data.groups.e.matches,teams);
    groupFMatches=parseMatches(data.groups.f.matches,teams);
    groupGMatches=parseMatches(data.groups.g.matches,teams);
    groupHMatches=parseMatches(data.groups.h.matches,teams);
    /*showMatches(groupAMatches,'groupAMatchesDiv');
    showMatches(groupBMatches,'groupBMatchesDiv');
    showMatches(groupCMatches,'groupCMatchesDiv');
    showMatches(groupDMatches,'groupDMatchesDiv');
    showMatches(groupEMatches,'groupEMatchesDiv');
    showMatches(groupFMatches,'groupFMatchesDiv');
    showMatches(groupGMatches,'groupGMatchesDiv');
    showMatches(groupHMatches,'groupHMatchesDiv');*/

    allMatches=groupAMatches.concat(groupBMatches,groupCMatches,groupDMatches,groupEMatches,groupFMatches,groupGMatches,groupHMatches)
    allMatches.sort(function matchSort(a,b){
        return b.id < a.id? 1 
            :b.id>a.id?-1
            : 0;
    });
  
  
});
}


  $.getJSON("https://raw.githubusercontent.com/marrtins/datapr/master/fulldata.json", function(predctionData){

    userData=parseUserData(predctionData,allMatches);

    pointsTable=setPointsTable(userData);

    var list = document.createElement('ul');
      document.getElementById("positionsTable").appendChild(list);
      for (var i = 0; i < pointsTable.length; i++) {
          var item = document.createElement('li');
          item.appendChild(document.createTextNode(pointsTable[i].username+" "+pointsTable[i].points));
          list.appendChild(item);
      }

      colorCells(allMatches,userData);

  });



function colorCells(allMatches,userData){
    
    
    for(var i =0;i<allMatches.length;i++){

    }
}


function setPointsTable(userData){
    userpointsList=[];
    for(var i =0;i<userData.length;i++){
        up=new Object();
        up.username=userData[i].username;
        up.points=userData[i].points;
        userpointsList.push(up);
    }
    userpointsList.sort(function matchSort(a,b){
        return b.points > a.points? 1 
            :b.id<a.id?-1
            : 0;
    });

    return userpointsList;


}

function parseUserData(data,allMatches){

var userList=[]

   for(var i = 0;i<data.length;i++){
        user = new Object();
        user.username = data[i].username;
        user.predictions = data[i].predictions;
        user.points = setUserPoints(user.predictions,allMatches);
        userList.push(user);
    }
    document.getElementById("demo2").innerHTML = "user"+i+"points "+userList[0].points+" "+userList[1].points;

    return userList;

}

// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}

// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('ticketModal');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function setUserPoints(predictions,allMatches){
    
    var points=0;
    for(var i = 0;i<allMatches.length;i++){        
        //item.appendChild(document.createTextNode(predictions[i].Home +" VS " + allMatches[i].away_team_name + " Prediction: " +predictions[i].result ));
        if(allMatches[i].winner!=null && predictions[i].result == allMatches[i].winner){
            points++;
        }
    }
    return points;
    
}

function parseMatches(groupMatches,teams){
    var matchList=[];
    for(var i = 0;i<groupMatches.length;i++){
        var match =new Object();
        match.id = groupMatches[i].name;
        match.home_team_id=groupMatches[i].home_team;
        match.home_team_name=teams[match.home_team_id-1].name;
        match.away_team_id=groupMatches[i].away_team;
        match.away_team_name=teams[match.away_team_id-1].name;
        match.finished = groupMatches[i].finished;
        match.date = groupMatches[i].date;
        if(match.finished){
            if(groupMatches[i].home_result > groupMatches[i].away_result ){
                match.winner=  "home";
            }else if(groupMatches[i].home_result < groupMatches[i].away_result ){
                match.winner="away";
            }else{
                match.winner="draw";
            }
        }else{
            match.winner=null;
        }
    matchList.push(match);
    }
    return matchList;  
}

function showMatches(groupMatches,groupDiv){
    var list = document.createElement('ul');
    document.getElementById(groupDiv).appendChild(list);
    for(var i = 0;i<groupMatches.length;i++){
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(groupMatches[i].home_team_name +" VS " + groupMatches[i].away_team_name + groupMatches[i].date));
        list.appendChild(item);
    }
}

function dateView(){

}
function groupView(){
    
}

