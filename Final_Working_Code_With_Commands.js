const exec = require('child_process').exec;
var http=require('http')
var url=require('url')
var server=http.createServer((function(request,response)
{

//User inputs collection

console.log("Reading parameter values");

console.log("Query prints");
var q = url.parse(request.url, true);

//var qdata = q.query;
var param1 = q.query.param1;
var param2 = q.query.param2;
console.log("Finally Param1 : " + param1);
console.log("Finally Param2 : " + param2);

//End of user input collection

function os_func() {
    this.execCommand = function(cmd, callback) {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                //Print the error to browser incase of command issues
                response.writeHead(200,
                    {"Content-Type" : "text/html"});
                    response.end(stderr);

                    return;
            }
            callback(stdout);
            response.writeHead(200,
                {"Content-Type" : "text/html"});
                response.end(stdout);
        });
    }
}
var os = new os_func();

os.execCommand('/Users/chalamareddyambati/Library/Python/2.7/bin/ansible-playbook ansible-ping.yml -i localhost', function (returnvalue) {
    // Here you can get the return value
    //console.log(returnvalue);
    
});
}));
server.listen(7000, () =>
console.log('Service is running on port 7000'));
