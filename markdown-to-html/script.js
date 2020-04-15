
// 
// Copyright (c) Carlos Tojal 2020
// markdown-to-html
//

var instructions = {
    headings: "<h%level>%s</h%level>",
    unordered_lists: {
        open: "<ul>",
        close: "</ul>"
    },
    ordered_lists: {
        open: "<ol>",
        close: "</ol>"
    },
    list_items: "<li>%s</li>"
}

var instructions1 = {
    headings: "#",
    lists: ["*", "-", "+"]
}

function md_to_html(s) {
    var html = "";

    console.log(s);

    var last_line_in_list = null;

    // go through each input line
    for(var i = 0; i < s.split("\n").length; i++) {
        var line = s.split("\n")[i];
        var instruction = line.split(' ')[0];
        var text = line.replace(instruction, "");
        var append = "";


        // headings
        if(instruction.split("")[0] == "#") {
            var lastchar = "#";
            var repeated_chars = 0;
            for(var j = 0; j < instruction.split("").length && instruction.split("")[j] == lastchar; j++) {
                lastchar = instruction.split("")[j];
                repeated_chars++;
            }

            append += instructions.headings.replace("%level", repeated_chars).replace("%level", repeated_chars).replace("%s", text);

            if(repeated_chars == 1 || repeated_chars == 2)
                append += "<hr>";
        // lists
        } else if(instructions1.lists.includes(instruction.split("")[0]) || (parseInt(instruction.split("")[0]) >= 1 && parseInt(instruction.split("")[0]) <= 9 && instruction.split("")[1] == ".")) {
            var is_unordered_list = instructions1.lists.includes(instruction.split("")[0]);
            if(last_line_in_list == null) { // is the first list item, so open the list
                if(is_unordered_list)
                    append += instructions.unordered_lists.open;
                else
                    append += instructions.ordered_lists.open;
            }
            if(last_line_in_list == i - 1 || last_line_in_list == null) { // the list created previously is being continued
                last_line_in_list = i;
                append += instructions.list_items.replace("%s", text);
            }
        } else if(line == "") {
            append += "<br>";
        } else {
            append += line + " ";
        }

        console.log("i: " + i + "\nlast_line_in_list: " + last_line_in_list);

        if(last_line_in_list < i) {
            if(is_unordered_list)
                html += instructions.unordered_lists.close;
            else
                html += instructions.ordered_lists.close;
            last_line_in_list = null;
        }

        html += append;
    }

    localStorage.setItem("md", s);

    console.log(html);

    return html;
}
