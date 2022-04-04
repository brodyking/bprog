// Open Tab Function
function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tabcontent");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}

// Nav Tab Links
    function changeTabLinkActive(tabName) {
        document.getElementById("devTabLink").classList.remove('active');
        document.getElementById("testTabLink").classList.remove('active');
        document.getElementById("optionsTabLink").classList.remove('active');
        document.getElementById(tabName).setAttribute('class','nav-link active');
    }
    // Dev Tab
        document.getElementById("devTabLink").onclick = function() {
            openTab('devTab')
            changeTabLinkActive("devTabLink");
        };
    // Test Tab
        document.getElementById("testTabLink").onclick = function() {
            openTab('testTab')
            changeTabLinkActive("testTabLink");
        };
        // Link on Test Tab
        document.getElementById("testTabStartButton").onclick = function() {
            startCompile();
        };
    // Options Tab
        document.getElementById("optionsTabLink").onclick = function() {
            openTab('optionsTab')
            changeTabLinkActive("optionsTabLink");
        };
        // Link on Options Tab
            document.getElementById("devTabTestButton").onclick = function() {
                openTab('testTab');
                startCompile();
                changeTabLinkActive("testTabLink");
            };
            
    // Start First Page
    openTab('devTab');
    changeTabLinkActive("devTabLink");