let AnimatorConfiguration = {
    draw_type: 'no-filter',
    draw_style: null,
    draw_param: 0
};

var canvas = document.getElementById("preview-canvas")
var img = new Image()
img.src = 'img/doge_preview2.jpg';
img.onload = function(){
    canvas.getContext('2d').drawImage(img, 0, 0);
}

/*
    Read previous storage state here
*/



toggle_filter_types(document.getElementById("video-ops").value)

//  @value: the  #video-ops element value
function toggle_filter_types(value){
    if(value==="2d-filter"){
        document.getElementById("options-2d").style.display = "block"
        toggle_all_sliders()
    }
    else{
        document.getElementById("options-2d").style.display = "none"
    }
}

//  @element:   The .filter-style element node
//  @value  :   The value for the slider element if any
function toggle_current_slider(element, value){
    var child_slider = (element.parentNode).getElementsByClassName("filter-param")[0]
    //  console.log(child_slider)
    if(element.value==="no-filter"){
        child_slider.style.display="none";
    }
    else{
        child_slider.style.display="block";
        get_popup_state()
    }
    child_slider.onchange = function(){
        get_popup_state()
    }
}


document.getElementById("video-ops").addEventListener( "change", function(){
    clear_style_state()
    toggle_filter_types(this.value)
    get_popup_state()
})

function toggle_all_sliders(){
    var list_selects = document.getElementsByName("filter-style")
    var elementsArray = [...list_selects];

    elementsArray.forEach(element => {
        element.onchange = function(){
            toggle_current_slider(element)
        }
        toggle_current_slider(element)

    });
    
}

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
    console.log("Video Filter Value: ", draw_type)

    if(draw_type==="2d-filter"){
        read_2dFilter_state()
    }
    else{
        AnimatorConfiguration.draw_type = draw_type
        AnimatorConfiguration.draw_style = null
        AnimatorConfiguration.draw_param = null
    }
    console.log(AnimatorConfiguration)
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
        AnimatorConfiguration.draw_type = 'no-filter'
        AnimatorConfiguration.draw_style = null
        AnimatorConfiguration.draw_param = null
    }
    else{
        AnimatorConfiguration.draw_type = '2d-filter'
        AnimatorConfiguration.draw_style = styles
        AnimatorConfiguration.draw_param = params
    }
}

function storage_write(draw_type, draw_style, draw_param){
    chrome.storage.sync.set({'draw_type': draw_type, 'draw_style': draw_style, 'draw_param': draw_param}, function() {
        console.log('Settings saved');
    });
}

function storage_read(){
    chrome.storage.sync.get(['draw_type','draw_style', 'draw_param'], function(items) {
        console.log('Settings retrieved', items);
    }); 
}




document.getElementById('save-btn').addEventListener('click', () => {
    get_popup_state()
    console.log("SAVED", AnimatorConfiguration)
});