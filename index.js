/* jshint esversion:6 */

var http = require("http");
var fs = require("fs");

// var classes = {
//     art: { grade: "A", taking:false, homework:false}
// }

var grades = [
    {class: "art", grade: " A", "homework": false, taking:false},
    {class: "biology", grade: " B", "homework": true ,taking: true},
    {class: "algebra", grade: " C", "homework": false, taking: true},
    {class: "physics", grade: "", "homework": false, taking: false},
    {class: "english", grade: "", "homework": false, taking: false}
];


var server = http.createServer((req, res) => {
    if (req.url === "/index.html" || req.url === "/"){
        fs.readFile("index.html", (err, data) => {
            res.write(data);
            res.end();
        });
    } else if(req.url === "/grades" && req.method === "GET") {
            var grade = [];
            for(var object of grades){
                if(object.taking){
                    grade.push(object);
                }
            }
            res.write(JSON.stringify(grade));
            res.end();

    }else if(req.url === "/schedule" && req.method === "GET") {
        var schedule = [];
        for(var obj of grades){
            if(obj.taking) { 
                schedule.push(obj);
            }
        } 
            res.write(JSON.stringify(schedule));
            res.end();

    }else if(req.url === "/classList" && req.method === "GET") {
        var list = [];
        for(var obj of grades){
            if(!obj.taking){
                list.push(obj);
            }
        } 
            res.write(JSON.stringify(list));
            res.end();        

    // }else if(req.url === "/schedule" && req.method === "POST") {
    //         res.write(grades.class);
    //         res.end();

    }else if(req.url === "/homework" && req.method === "GET") {
        var homework = [];
        for(var obj3 of grades){
            if(obj3.taking) { 
                homework.push(obj3);
            }
                
        }    res.write(JSON.stringify(homework));
            res.end();
    }else if(req.url === "/homework" && req.method === "POST") {
          
            var queryData = "";

            req.on('data', function(data) {
                queryData += data;
                if(queryData.length > 1e6) {
                    queryData = "";
                    res.writeHead(413, {'Content-Type': 'text/plain'}).end();
                    req.connection.destroy();

                }
            });

            req.on('end', function() {
                for(var obj of grades) {
                     if(obj.class === queryData) {
                        obj.homework = true;
                     }
                }
               
                res.end();


            });
    }else if(req.url === "/schedule" && req.method === "POST") {
          
            var queryData2 = "";

            req.on('data', function(data) {
                queryData2 += data;
                if(queryData2.length > 1e6) {
                    queryData = "";
                    res.writeHead(413, {'Content-Type': 'text/plain'}).end();
                    req.connection.destroy();

                }
            });

            req.on('end', function() {
                for(var obj of grades) {
                     if(obj.class === queryData2) {
                        obj.taking = true;
                     }
                }
               
                res.end();


            });    
    }else {
        res.write("This is Erty's Server!");
        res.end();
    }
});

server.listen(8000, () => {
    console.log("Server started on port 8000");
});

