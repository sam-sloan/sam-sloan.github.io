// AJAX REQUEST TO SUBMIT TO FORMSPREE W ANIMATION
if (document.forms[0] && window.FormData) {

  // create messages for various responses
  var message = {
    loading: '<h1>' + 'loading' + '</h1>',
    success: '<h1 id="submission-message">' + 'Thank you!' + '</h1>',
    failure: 'If you do not have anything nice to say do not say anything!'
  };

  var form = document.forms[0];

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
            request.open('POST', 'https://formspree.io/samforderer@icloud.com', true);
            request.setRequestHeader('accept', 'application/json');
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

  var tl = new TimelineMax();

  tl.to([textFields, textArea, labels], 0.1, { autoAlpha: 0})
    .to('#submit', 0.1, {width:'50px',color:'#00AF8A',innerHTML:'!',x:10, ease:Elastic.easeOut})
    .to('#submit', 0.5, {bottom:'55vH'})
    .to('#form-section', 0.07, {backgroundColor:'#00AF8A',height:'30vH'})
    .to('#submit', 0.2, {width:'620px', ease:Strong.easeOut})
    .to('#submit', 0.2, {innerHTML:'We will be in touch!', color:'#ffffff'})

}

//animation for the spinning asterisk in the title logo
TweenMax.to('.asterisk', 1, {rotation:360,transformOrigin:'50% 50%',repeat:-1,repeatDelay:3});
