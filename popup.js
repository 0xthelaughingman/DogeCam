let AnimatorConfiguration = {
    type: 'no-filter',
    param: 0,
    preParentDiv: null,
    preSliderDiv: null,
};

/**
 * Hide and show slider
 */
document.querySelectorAll('input[type=radio]').forEach(element => {
    element.addEventListener('focus', event => {
        let srcElement = event.srcElement
        let parentDiv = srcElement.tagName === 'LABEL' ? 
            srcElement.parentNode : srcElement.parentNode.parentNode;
        let sliderDiv = parentDiv.querySelector('div');

        if(AnimatorConfiguration.preParentDiv && AnimatorConfiguration.preSliderDiv) {
            AnimatorConfiguration.preParentDiv.classList.remove('active');
            AnimatorConfiguration.preSliderDiv.classList.remove('visible');
            AnimatorConfiguration.preSliderDiv.classList.add('hidden');
        }

        if(parentDiv.className === 'default-input') {
            AnimatorConfiguration.preParentDiv = null;
            AnimatorConfiguration.preSliderDiv = null;
            return;
        }

        parentDiv.classList.add('active');
        sliderDiv.classList.add('visible');
        sliderDiv.classList.remove('hidden');
        AnimatorConfiguration.preParentDiv = parentDiv;
        AnimatorConfiguration.preSliderDiv = sliderDiv;
    })
});

/**
 * Change the value of text field based on slider
 */
document.querySelectorAll('input[type=range]').forEach(element => {
    element.addEventListener('input', event => {
        let srcElement = event.srcElement
        let parentElement = srcElement.parentNode.parentNode;
        let grandParentElement = parentElement.parentNode;
        
        let textInput = parentElement.querySelector('input[type=text]');
        textInput.value = srcElement.value;
    });
});

/**
 * Save the user preference
 */
document.querySelector('.save-btn>button').addEventListener('click', event => {
    document.querySelectorAll('input[name=type]').forEach(element => {
        if(element.checked) {
            if(element.value === 'no-filter') {
                AnimatorConfiguration.type = 'no-filter';
                AnimatorConfiguration.param = 0;
            }else {
                let parentElement = element.parentNode.parentNode;
                let textInput = parentElement.querySelector('input[type=text]');
                AnimatorConfiguration.type = element.value;
                AnimatorConfiguration.param = textInput.value;
            } 
            storage_read();
            storage_write(
                AnimatorConfiguration.type,
                AnimatorConfiguration.param
            );
        } 
    });
});


function storage_write(draw_type, draw_param){
    chrome.storage.sync.set({'draw_type': draw_type, 'draw_param': draw_param}, function() {
        console.log('Settings saved');
    });
}

function storage_read(){
    chrome.storage.sync.get(['draw_type', 'draw_param'], function(items) {
        console.log('Settings retrieved', items);
    });
  
}
