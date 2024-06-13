// Collapsible
var coll = document.getElementsByClassName("chat-btn");
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}
function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    let time = hours + ":" + minutes;
    return time;
}

//voice bot
function readOutLoud(message) {
    const speech = message
    speech.text = message
    speech.volume = 1
    speech.rate = 1.1
    speech.pitch = 1
    responsiveVoice.speak(speech, 'UK English Female');
}

function welcomeMessage(){
  let welcome = "Hi I am your hospital guide  and I am here to assist you";
  readOutLoud(welcome)
}

// Gets the first message
function firstBotMessage() {
    let welcomeMsg = "Hello, You are at the Entrance";
    let firstMessage = "Where do you want to go? ";
    let secondMessage =`Press 1 for Out patients ward 2 for Operation theater 3 for ICU 4 Emergency ward`;
    readOutLoud(welcomeMsg);
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage +'\n'+secondMessage+'</span></p>';
    readOutLoud(firstMessage);
    readOutLoud(secondMessage);
    let time = getTime();
    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();
  function fun(){
  var graph = new WeightedGraph();
  graph.addVertex("Entrance");
  graph.addVertex("OP ward");
  graph.addVertex("Operation Theater");
  graph.addVertex("Emergency ward");
  graph.addVertex("ICU");
  graph.addVertex("Out patients ward");
  graph.addVertex("j1");
  graph.addVertex("j2");
  graph.addVertex("j3");

  graph.addEdge("Entrance", "j1", 20);
  graph.addEdge("j1", "Out patients ward", 10);
  graph.addEdge("Out patients ward", "Operation Theater", 20);
  graph.addEdge("Operation Theater", "ICU", 15);
  graph.addEdge("ICU","j2", 5);
  graph.addEdge("j2", "j3", 10);
  graph.addEdge("j3", "Emergency ward", 6);
  graph.addEdge("Entrance", "Emergency ward", 50);
  return graph;
  }

// Retrieves the response

function getHardResponse(userText) {
    graph = fun();
    let starting = "Entrance";
    let [path,g] = graph.Dijkstra(starting,userText);
    let botResponse=" ";
    if(userText>=1 && userText <=4){
        var key=["go straight","turn left","turn right"];
        if(path[1]=="Emergency ward")
          botResponse = "From "+starting+" "+key[2]+" "+g[path[0]]+" feet to "+path[1];
        else
          botResponse = "From "+ starting+" "+ key[0]+" "+ g[path[0]] +" feet "; 
        for(let i=1;i<path.length-1;i++){
          if(path[i+1]=="Emergency ward" || path[i+1]== "Out patients ward" )
            botResponse = botResponse + " "+" then " +key[2]+" "+ g[path[i]] +" feet to " +path[i+1];
          if(path[i+1]=="ICU" || path[i+1]=="Operation Theater")
          botResponse = botResponse + " "+" then " +key[0]+" "+ g[path[i]] +" feet to " +path[i+1];
        }
        let botVideo = `<video id="botText" width="100%" height=300px autoplay muted> <source src="../maps/v`+userText+`.mp4" type="video/mp4" /></video>`
          document.getElementById("mapRedirect").innerHTML=botVideo;
    }
    else if(userText==5){
      window.open("welcome.html");
    }
    else{
       botResponse = "Enter valid choice";

    }
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    document.getElementById("chatbox").innerHTML= botHtml;
    console.log("Response "+botResponse);
    // $("#chatbox").append(botHtml);
    readOutLoud(botResponse.toString());
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

function getResponse() {
    let userText = $("#textInput").val();
    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)
    
}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    //Uncomment this if you want the bot to respond to this buttonSendText event
    setTimeout(() => {
        getHardResponse(sampleText);
    }, 1000)
}


function sendButton() {
    getResponse();
}

$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});

class Node {
    constructor(val, priority) {
      this.val = val;
      this.priority = priority;
    }
  }
  
  class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
      let newNode = new Node(val, priority);
      this.values.push(newNode);
      this.bubbleUp();
    }
    bubbleUp() {
      let idx = this.values.length - 1;
      const element = this.values[idx];
      while (idx > 0) {
        let parentIdx = Math.floor((idx - 1) / 2);
        let parent = this.values[parentIdx];
        if (element.priority >= parent.priority) break;
        this.values[parentIdx] = element;
        this.values[idx] = parent;
        idx = parentIdx;
      }
    }
    dequeue() {
      const min = this.values[0];
      const end = this.values.pop();
      if (this.values.length > 0) {
        this.values[0] = end;
        this.sinkDown();
      }
      return min;
    }
    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
          let leftChildIdx = 2 * idx + 1;
          let rightChildIdx = 2 * idx + 2;
          let leftChild, rightChild;
          let swap = null;
    
          if (leftChildIdx < length) {
            leftChild = this.values[leftChildIdx];
            if (leftChild.priority < element.priority) {
              swap = leftChildIdx;
            }
          }
          if (rightChildIdx < length) {
            rightChild = this.values[rightChildIdx];
            if (
              (swap === null && rightChild.priority < element.priority) ||
              (swap !== null && rightChild.priority < leftChild.priority)
            ) {
              swap = rightChildIdx;
            }
          }
          if (swap === null) break;
          this.values[idx] = this.values[swap];
          this.values[swap] = element;
          idx = swap;
        }
      }
    }
    
    //Dijkstra's algorithm only works on a weighted graph.
    
    class WeightedGraph {
      constructor() {
        this.adjacencyList = {};
      }
      addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
      }
      addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
      }
      Dijkstra(start, finish) {
      
      var end = {1:"Entrance",2:"Out patients ward",3:"Operation Theater",4:"ICU",5:"Emergency ward"};
        finish = end[(parseInt(finish)+1).toString()];
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = []; 
        let g=[];
        let smallest;
        for (let vertex in this.adjacencyList) {
          if (vertex === start) {
            distances[vertex] = 0;
            nodes.enqueue(vertex, 0);
          } else {
            distances[vertex] = Infinity;
            nodes.enqueue(vertex, Infinity);
          }
          previous[vertex] = null;
        }
        // as long as there is something to visit
        while (nodes.values.length) {
          smallest = nodes.dequeue().val;
          if (smallest === finish) {
            //WE ARE DONE
            //BUILD UP PATH TO RETURN AT END
            while (previous[smallest]) {
              path.push(smallest);
              var neigh = smallest;
              smallest = previous[smallest];
         for (var n in this.adjacencyList[smallest]){
                  var nextNode = this.adjacencyList[smallest][n];
                  if(nextNode.node == neigh){
                      g[smallest]=nextNode.weight;
                      break;}
            }

            }
            break;
          }
          if (smallest || distances[smallest] !== Infinity) {
            for (let neighbor in this.adjacencyList[smallest]) {
                let nextNode = this.adjacencyList[smallest][neighbor];
                let candidate = distances[smallest] + nextNode.weight;
                let nextNeighbor = nextNode.node;
                if (candidate < distances[nextNeighbor]) {
                  distances[nextNeighbor] = candidate;
                  previous[nextNeighbor] = smallest;
                  nodes.enqueue(nextNeighbor, candidate);
                }
              }
            }
          }
          console.log(g);
          console.log(path.concat(smallest).reverse());
          return [path.concat(smallest).reverse(),g];
  }
}
