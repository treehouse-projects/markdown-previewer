// define the source (input field) element
const source = document.getElementById('sourceTA');
// define the target (display)
const target = document.getElementById('targetDiv');
// set beginning markdown for page
const starterText = `
#Markdown FTW
Just type regular text to make a paragraph.
* And asterisks
* On each line
* To make bulleted lists

There is just **so** *much* you can **do**!

I can't believe it's THIS easy!!!!

Click this [link for a markdown cheatsheet](https://teamtreehouse.com/markdown)

Select ***all*** of the text here, ***delete it***, and write your OWN Markdown!
`;

// add event listeners to buttons
const buttonSetup = function(input,target,starterMD) {
  const buttons = document.querySelectorAll('.column button');
  for (var button of buttons) {
    button.textContent = button.getAttribute('data-start-text')
    button.addEventListener('click', function() {
      // toggle text
      if (this.textContent === this.getAttribute('data-start-text')) {
        this.textContent = this.getAttribute('data-toggle-text');
      } else {
        this.textContent = this.getAttribute('data-start-text');
      }
    });
  }

  const styleButton = document.querySelector('.target button');
  styleButton.addEventListener('click', function() {
    if (target.className === 'markdown-body') {
      target.className = '';
    } else {
      target.className = 'markdown-body';
    }
  });

  const textButton = document.querySelector('.source button');
  textButton.addEventListener('click', function() {
    if (this.getAttribute('data-action') === 'clear') {
      this.setAttribute('data-action', 'reset');
      input.value = '';
    } else {
      this.setAttribute('data-action', 'clear');
      input.value = starterMD;
      console.log('here');
    }
    run(input,target);
    input.focus();
  });
}

// function for invoking the markdown conversion
const run = function(source, target) {
  const converter = new showdown.Converter();
  let text = source.value;
  let html = converter.makeHtml(text);
  target.innerHTML = html;
};

// set up the button
// convert initial markdown to HTML
// setup event listener for any input into
// the source text area
const init = function(input,target,starterMD) {
  input.textContent = starterMD;
  run(input,target);
  input.focus();
  buttonSetup(input, target, starterMD)
  input.addEventListener('input', () => run(input,target));
};

// start it up!
init(source, target, starterText);
