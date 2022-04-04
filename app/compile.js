//
// desc: demonstrates textarea line numbers using canvas paint 
// auth: nikola bozovic <nigerija@gmail>
//
var TextAreaLineNumbersWithCanvas = function () {
    var div = document.createElement('div');
    var cssTable = 'padding:0px 0px 0px 0px!important; margin:0px 0px 0px 0px!important; font-size:13px;line-height:0px; width:100%;';
    var cssTd1 = 'border:1px #345 solid; border-right:0px; vertical-align:top; width:1px;';
    var cssTd2 = 'border:1px #345 solid; border-left:0px; vertical-align:top;';
    var cssButton = 'width:120px; height:40px; border:1px solid #333 !important; border-bottom-color: #484!important; color:#ffe; background-color:#222;';
    var cssCanvas = 'border:0px; background-color:#1c1c20; margin-top:0px; padding-top:0px;';
    var cssTextArea = 'width:100%;'
        + 'height:450px;'
        + 'font-size:13px;'
        + 'font-family:monospace;'
        + 'line-height:15px;'
        + 'font-weight:500;'
        + 'margin: 0px 0px 0px 0px;'
        + 'padding: 0px 0px 0px 0px;'
        + 'resize: both;'
        + 'color:#ffa;'
        + 'border:0px;'
        + 'background-color:#222;'
        + 'white-space:nowrap; overflow:auto;'
        // supported only in opera 12.x
        + 'scrollbar-arrow-color: #ee8;'
        + 'scrollbar-base-color: #444;'
        + 'scrollbar-track-color: #666;'
        + 'scrollbar-face-color: #444;'
        + 'scrollbar-3dlight-color: #444;' /* outer light */
        + 'scrollbar-highlight-color: #666;' /* inner light */
        + 'scrollbar-darkshadow-color: #444;' /* outer dark */
        + 'scrollbar-shadow-color: #222;' /* inner dark */;
    // LAYOUT (table 2 panels)
    var table = document.createElement('table');
    table.setAttribute('cellspacing', '0');
    table.setAttribute('cellpadding', '0');
    table.setAttribute('style', cssTable);
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute('style', cssTd1);
    var td2 = document.createElement('td');
    td2.setAttribute('style', cssTd2);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
    // TEXTAREA
    var ta = this.evalnode = document.createElement('textarea');
    ta.setAttribute('cols', '80');
    ta.setAttribute('style', cssTextArea);
    ta.setAttribute('id', "devInput");
    //ta.value = this.S.get('eval') || '';  // get previous executed value ;)
    // TEXTAREA NUMBERS (Canvas)
    var canvas = document.createElement('canvas');
    canvas.width = 48; // must not set width & height in css !!!
    canvas.height = 500; // must not set width & height in css !!!
    canvas.setAttribute('style', cssCanvas);
    ta.canvasLines = canvas;
    td1.appendChild(canvas);
    td2.appendChild(ta);
    div.appendChild(table);
    // PAINT LINE NUMBERS
    ta.paintLineNumbers = function () {
        try {
            var canvas = this.canvasLines;
            if (canvas.height != this.clientHeight)
                canvas.height = this.clientHeight; // on resize
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = "#303030";
            ctx.fillRect(0, 0, 42, this.scrollHeight + 1);
            ctx.fillStyle = "#808080";
            ctx.font = "11px monospace"; // NOTICE: must match TextArea font-size(11px) and lineheight(15) !!!
            var startIndex = Math.floor(this.scrollTop / 15, 0);
            var endIndex = startIndex + Math.ceil(this.clientHeight / 15, 0);
            for (var i = startIndex; i < endIndex; i++) {
                var ph = 10 - this.scrollTop + (i * 15);
                var text = '' + (1 + i); // line number
                ctx.fillText(text, 40 - (text.length * 6), ph);
            }
        }
        catch (e) {
            alert(e);
        }
    };
    ta.onscroll = function (ev) { this.paintLineNumbers(); };
    ta.onmousedown = function (ev) { this.mouseisdown = true; };
    ta.onmouseup = function (ev) { this.mouseisdown = false; this.paintLineNumbers(); };
    ta.onmousemove = function (ev) { if (this.mouseisdown)
        this.paintLineNumbers(); };
    document.getElementById('devTab').appendChild(div);
    // make sure it's painted
    ta.paintLineNumbers();
    return ta;
};

var ta = TextAreaLineNumbersWithCanvas();
ta.value = TextAreaLineNumbersWithCanvas.toString();
document.getElementById('devInput').value = "# My First App;\necho hi;\necho this is a test;";
// Possible commands
var commands = [];


// Compiler function (run when you click 'test')\
function startCompile() {
    // Clear the Test page
    document.getElementById('testTabConsole').innerHTML = '';
    // Sets the variable for every line
    var compileLineCount = document.getElementById('devInput').value.split(';');
    for (var i = 1; i < compileLineCount.length - 1; i++) {
        window.currentLine = i;
            if (commands[compileLineCount[i].slice(1,compileLineCount[i].search(" "))] == undefined) { // checks if it is unset
                console.log(compileLineCount[i].slice(1,compileLineCount[i].search(" ")) + ' was Not Found');
                document.getElementById('notices').innerHTML += '<div class="alert alert-danger alert-dismissible fade show" role="alert"> The command ' + compileLineCount[i].slice(1,compileLineCount[i].search(" ")) + ' was not found <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
                document.getElementById('testTabConsole').innerHTML += 'The command ' + compileLineCount[i].slice(1,compileLineCount[i].search(" ")) + ' was not found'
            }
            else { // if it is a command
                console.log(compileLineCount[i].slice(1,compileLineCount[i].search(" ")) + ' was Found');

                // Commands
                commands["echo"] = "document.getElementById('testTabConsole').innerHTML += '" + document.getElementById('devInput').value.split(';')[i].slice(6,Infinity) + "<br>'";
                commands["#"] = "//do nothing, its a comment."

                eval(commands[compileLineCount[i].slice(1,compileLineCount[i].search(" "))]);
            }
    }
}

commands["echo"] = "// declared";
commands["#"] = "// declared";
