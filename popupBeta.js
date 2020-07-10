let DogeCamConfiguration = {
    draw_type: 'no-filter',
    draw_style: null,
    draw_param: null,
    draw_string: null,
};

var canvas = document.getElementById("preview-canvas")
var img = new Image()
img.src = 'img/doge_preview.jpg';
img.onload = function(){
    draw_canvas()
}

/*
    Read previous storage state here
*/

storage_read()


/*

------------------------------------FORM STATE FUNCTIONS BEGIN-------------------------------------------

*/

/*
    The starting function for the Visibility state control. Cascades down to every unit that needs visiblity control.
    From Filter-Options(dropdown) ->Filter-Styles(dropdowns) ->Filter-Params(sliders)

    @value: the  #video-ops element value
*/
function toggle_filter_types(value){
    if(value==="2d-filter"){
        //  document.getElementById("options-2d").style.display = "block"
        $(".options-2d").slideDown()

        toggle_all_sliders()
    }
    else{
        //  document.getElementById("options-2d").style.display = "none"
        $(".options-2d").slideUp()
    }
}

/*
    Toggles current slider's visibility & attaches onchange listener.
    @element:   The .filter-style element node
    @value  :   The value for the slider element if any
*/
function toggle_current_slider(element, value){
    var child_slider = (element.parentNode).getElementsByClassName("filter-param")[0]
    //  console.log(child_slider)
    if(element.value==="no-filter"){
        //  child_slider.style.display="none";
        child_slider.value = 50
        $(child_slider).slideUp()
    }
    else{
        //  child_slider.style.display="block";
        $(child_slider).slideDown()
        get_popup_state()
    }
    child_slider.onchange = function(){
        get_popup_state()
    }
}

/*
    Iterates through all style dropdowns and their sliders, toggling visibility and attaching onchange listeners.
*/
function toggle_all_sliders(){
    var list_selects = document.getElementsByName("filter-style")
    var elementsArray = [...list_selects];

    elementsArray.forEach(element => {
        element.onchange = function(){
            toggle_current_slider(element)
            get_popup_state()
        }
        toggle_current_slider(element)
    });
}


document.getElementById("video-ops").addEventListener( "change", function(){
    clear_style_state()
    toggle_filter_types(this.value)
    get_popup_state()
})

/*
    Function to clear selected styles when the user switches to a different Type.
*/
function clear_style_state(){
    var list_selects = document.getElementsByName("filter-style")
    var elementsArray = [...list_selects];

    elementsArray.forEach(element => {
        element.value="no-filter"
    })
    toggle_all_sliders()
}

function get_popup_state(){
    var draw_type = document.getElementById("video-ops").value
    //  console.log("Video Filter Value: ", draw_type)

    if(draw_type==="2d-filter"){
        read_2dFilter_state()
    }
    else{
        DogeCamConfiguration.draw_type = draw_type
        DogeCamConfiguration.draw_style = null
        DogeCamConfiguration.draw_param = null
    }
    DogeCamConfiguration.draw_string = make_draw_string(DogeCamConfiguration.draw_style, DogeCamConfiguration.draw_param)
    console.log(DogeCamConfiguration)
    draw_canvas()
}


// Reads and sets AnimatorConfig if 2D-Filter selected.
function read_2dFilter_state(){
    var list_selects = document.getElementsByName("filter-style")
    var elementsArray = [...list_selects];
    var styles = []
    var params = []

    elementsArray.forEach(element => {
        var cur_style = element.value
        var cur_param = null
        if(cur_style!="no-filter"){
            var child_slider = (element.parentNode).getElementsByClassName("filter-param")[0]
            cur_param = child_slider.value
            styles.push(cur_style)
            params.push(cur_param)
        }
    });
    //  Incase user keeps all 2D-Filters as no-filters too...
    if(styles.length==0){
        DogeCamConfiguration.draw_type = 'no-filter'
        DogeCamConfiguration.draw_style = null
        DogeCamConfiguration.draw_param = null
    }
    else{
        DogeCamConfiguration.draw_type = '2d-filter'
        DogeCamConfiguration.draw_style = styles
        DogeCamConfiguration.draw_param = params
    }
}

/*
    Object to Mock config being read from Chrome...
*/
let TestConfig = {
    draw_param: ["72", "69"],
    draw_style: ["grayscale", "sepia"],
    draw_type: "2d-filter"
}

/*
    Function to read last saved Config, if any, and set the form accordingly.
*/
function set_popup(){
    var options = document.getElementById("video-ops")
    
    //  Config ALWAYS has to have a draw_type!
    options.value = DogeCamConfiguration.draw_type
    set_2dFilter_state(DogeCamConfiguration.draw_style, DogeCamConfiguration.draw_param)

    //  Call the cascade visibility toggler!
    toggle_filter_types(options.value)
}

function set_2dFilter_state(draw_style, draw_param){   
    //  Not a 2d-filter config.
    if(draw_style==null)
        return

    //  count of style and params go 1:1, and can't exceed the style dropdowns on the popup.
    for(var i=0; i<draw_style.length; i++){
        document.getElementsByClassName("filter-style")[i].value = draw_style[i]
        document.getElementsByClassName("filter-param")[i].value = draw_param[i]
    }
}


function draw_canvas(){
    //  clear previous buffer.
    console.log("drawing")
    canvas.getContext('2d').fillRect(0,0, canvas.width, canvas.height)

    let ratio  = Math.min(canvas.width / img.width, canvas.height / img.height);
    let x = (canvas.width - img.width * ratio) / 2;
    let y = (canvas.height - img.height * ratio) / 2;
    
    /*
    //  Draw Pre-Filter incase no-filters selected.
    //  THIS IS A MOCK. Need the filter string function for actual filter creation...
    if(DogeCamConfiguration.draw_param){
        canvas.getContext('2d').filter = "grayscale(" + DogeCamConfiguration.draw_param[0] +"%)"
    }
    else{
        canvas.getContext('2d').filter = "none"
    }
    */

    canvas.getContext('2d').filter = DogeCamConfiguration.draw_string
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio);
}

/*

------------------------------------FORM STATE FUNCTIONS END-------------------------------------------

*/

/*
    Util function that builds and returns the Canvas Filter string.
*/
function make_draw_string(draw_style, draw_param){

    var string = ""
    
    if(draw_style==null){
        return "none"
    }

    var opt = null
    var param = null

    for(var i=0; i<draw_style.length; i++){
        if(draw_style[i]==="blur"){
            opt = "px"
        }
        else{
            opt = "%"
        }
        
        //  Logic for brightness/contrast, param = val * 2, as 100 means normal, making 50 the central/normal value.
        if(draw_style[i]==="brightness" || draw_style[i]==="contrast"){
            param = draw_param[i]*2
        }
        else{
            param = draw_param[i]
        }
        console.log(string)
        string = string + " " + draw_style[i] + "(" + param + opt +")"
    }
    return string
}



function storage_write(){
    chrome.storage.sync.set({'DogeCamConfiguration': DogeCamConfiguration},function() {
            console.log('Settings saved');
            console.log("Wrote to Store:", DogeCamConfiguration)
        });
}

function storage_read(){
    chrome.storage.sync.get(['DogeCamConfiguration'], function(item) {
        //  console.log('Settings retrieved', item);
        DogeCamConfiguration = item.DogeCamConfiguration
        console.log("Updated Config From Store:", DogeCamConfiguration)
        set_popup()
    }); 
}


document.getElementById('read-btn').addEventListener('click', () => {
    console.log("Read button")
    storage_read()
});

document.getElementById('save-btn').addEventListener('click', () => {
    get_popup_state()
    storage_write()
});