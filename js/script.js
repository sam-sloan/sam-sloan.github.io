// AJAX REQUEST TO SUBMIT TO FORMSPREE W ANIMATION
if (document.forms[0] && window.FormData) {

  // get the form and stick it in that variable
  var form = document.forms[0];

  // get the submit button for form.
  var button = document.getElementById('submit');

  // create AJAX request
  var request = new XMLHttpRequest();
  // the boolean at the end means this is an asyncronous request
  request.open('POST', 'https://formspree.io/samforderer@icloud.com', true);
  request.setRequestHeader('accept', 'application/json');

  // Listen for the form being submitted
  form.addEventListener('submit', function(e){
      e.preventDefault();
      button.value = '';

      // create form data object that matches keys with values into pairs
      var formData = new FormData(form);

      // send the form data
      request.send(formData);

      // watches for changes to the request.readyState
      request.onreadystatechange = function() {

        if (request.readyState === 4) {

          if (request.status == 200 && request.status < 300) {

            // animates the div that contains form
            formCollapse();

          } else {
            form.insertAdjacentHTML('beforeend', message.failure);
          }
        }
      }
  });
}

// ANIMATIONS

function formCollapse() {

  // establish variables for various DOM elements to animate
  var textFields = document.getElementsByTagName('input');
  var textArea = document.getElementsByTagName('textarea');
  var labels = document.getElementsByTagName('label');
  var submissionMessage = document.getElementById('form-section');

  var formHeight = submissionMessage.offsetHeight / 2;
  var buttonHeight = document.querySelector('#submit').offsetHeight / 2;

  // This is the position of the center of the form div for the button to animate to.
  var formPos = formHeight + (formHeight / 2) - buttonHeight - 100;

  var tl = new TimelineMax({repeat:5});

  tl.to([textFields, textArea, labels], 0.1, { autoAlpha: 0})
    .to('#submit', 0.1, {width:'50px',color:'#00AF8A',innerHTML:'!'})
    .to('#submit', 0.5, {bottom:formPos})
    .to(submissionMessage, 0.07, {backgroundColor:'rgba(23,190,155,0.5)',height:formHeight})
    .to('#submit', 0.1, {width:'100%', ease: Strong.easeOut})
    .to('#submit', 0.2, {innerHTML:'We will be in touch!', color:'#ffffff'})
    .to(submissionMessage, 1, {backgroundColor:'rgba(0,0,0,0)'}, '+=5')
}

//animation for the spinning asterisk in the title logo
TweenMax.to('.asterisk', 1, {rotation:360,transformOrigin:'50% 50%',repeat:-1,repeatDelay:3});

// ANIMATIONS

var myButton = document.querySelector('#buttonr');

myButton.addEventListener('click', function(){
  window.scrollTo( 0, 0 );
});
