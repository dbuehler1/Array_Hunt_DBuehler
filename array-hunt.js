$(document).ready(function () {
    var chineseFood = ["bao", "chow-mein", "dumplings", "egg-rolls",
        "fortune-cookies", "fried-rice", "gyoza", "lo-mein", "mapo-tofu",
        "ramen", "shumai", "wonton-soup"];
    var dinosaurs = ["ankylosaurus", "brachiosaurus", "dilophosaurus",
        "pachycelphalosaurus", "pterodactyl", "stegosaurus",
        "styracosaurus", "triceratops", "tyrannosaurus-rex",
        "velociraptor"];
    var solarSystem = ["earth", "jupiter", "luna", "mars", "mercury",
        "neptune", "saturn", "sol", "uranus", "venus"];

    $("#imageSet").change(showAllImages);
    $("#huntButton").click(arrayHunt);

    showAllImages();

    function showAllImages()
    {
        // What image set was selected? This is the directory name
        var directoryName = $("#imageSet").val();
        // Based on the selection, use the correct array
        var arrayOfImagesNames = getSelectedArray();

        // Empty out any children from the div
        var imageDiv = $("#originalArray").empty();

        // Make two rows of images, half in each row
        var half = arrayOfImagesNames.length / 2;
        // How many images are in the current row?
        var count = 0;
        // The current <div class="row">
        var row;

        for (var fileName of arrayOfImagesNames) {
            // Time to make a new row?
            if (count === 0 || count >= half) {
                row = $("<div>").addClass("row");
                imageDiv.append(row);
                count = 0;
            }
            // append a <figure> with the image and its caption
            row.append(createImage(directoryName, fileName));
            count++;
        }

    }

    function createImage(directory, fileName)
    {
        // Create a div with a Bootstrap class
        var col = $("<div>").addClass("col");
        // Create a figure (can have a caption)
        var figure = $("<figure>").addClass("figure");
        col.append(figure);

        // Create the image itself
        var img = $("<img>");
        img.attr("src", `${directory}/${fileName}.png`);
        img.attr("alt", fileName);

        // Add the image to the figure
        figure.append(img);

        // Create a caption
        var caption = $(`<figcaption>${fileName}</figcaption>`)
            .addClass("figure-caption text-center");
        figure.append(caption);

        return col;
    }

    function getSelectedArray()
    {
        // Which image set was selected?
        var selection = $("#imageSet").val();

        // Return the array that corresponds to
        // the selected string
        if (selection === "chinese")
            return chineseFood;
        else if (selection === "solar")
            return solarSystem;
        else if (selection === "dinos")
            return dinosaurs;
    }

    function arrayHunt()
    {
        var myArray = getSelectedArray();

        /*
        Find the first and last string in the array.
        Output them to td#firstLast
         */
        $("td#firstLast").text(myArray[0] + " " +
            myArray[myArray.length - 1]);

        /*
        Find the first string that contains an 'n'.
        Output it to td#firstEnn
         */
        for(var i = 0; i < myArray.length; i++){
            if(myArray[i].includes('n') == true){
                $("td#firstEnn").text(myArray[i]);
                break;
            }
        }

        /*
        Find all of the strings with less than 6 characters.
        Output them to td#lessThanSix
         */
        var lessSix = "";
        for(var i = 0; i < myArray.length; i++){
            if(myArray[i].length < 6){
                lessSix = lessSix + " " + myArray[i];
            }
        }
        $("td#lessThanSix").text(lessSix);

        /*
        Find the longest string in the array.
        Output it to td#longName
         */
        var max = "";
        for(var i = 0; i < myArray.length; i++){
            if(myArray[i].length > max.length){
                max = myArray[i];
            }
        }
        $("td#longName").text(max);
        /*
        Find all of the strings that do not contain the letter 's'.
        Output them to td#noEss
         */
        var noS = "";
        for(var i = 0; i < myArray.length; i++){
            if(myArray[i].includes('s') == false){
                noS = noS + " " + myArray[i];
            }
        }
        $("td#noEss").text(noS);
        /*
        Output all of the strings, but with all of their vowels
        in uppercase, to td#upperVowels
         */
        var upper = "";
        var vowels= "";
        for(var i = 0; i < myArray.length; i++){
            vowels = "";
            for(var x = 0; x < myArray[i].length; x++){
                if (myArray[i].charAt(x) == 'a' || myArray[i].charAt(x) == 'e' || myArray[i].charAt(x) == 'i'
                || myArray[i].charAt(x) == 'o' || myArray[i].charAt(x) == 'u'){
                    vowels = vowels + myArray[i].charAt(x).toUpperCase();
                }
                else{
                    vowels = vowels + myArray[i].charAt(x);
                }

            }
            upper = upper + ", " + vowels;
        }

        $("td#upperVowels").text(upper);
        /*
        Output all of the strings in reverse order and separated by
        ' - ' to td#reverseDash
         */
        myArray.reverse();
        var Reverse = myArray[0];
        for(var i = 1; i < myArray.length; i++){
            Reverse = Reverse + " - " + myArray[i];
        }
        $("td#reverseDash").text(Reverse);
    }

});