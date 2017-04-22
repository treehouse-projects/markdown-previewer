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

// create and add button for toggling
// GH Markdown stylesheet off and on
const setupStyleButton = (target) => {
  let GHStyles = false;
  const targetClass = target.className;
  const starterText = `Display GitHub Markdown Styling`;
  const toggleText = `Display normal HTML styling`;
  const button = document.createElement("BUTTON");
  button.textContent = starterText;
  button.className = 'toggleGH';
  button.addEventListener('click', () => {
    if (! GHStyles) {
      target.className += ' markdown-body';
      GHStyles = true;
      button.textContent = toggleText;
    } else {
      target.className = targetClass;
      GHStyles = false;
      button.textContent = starterText;
    }
  });
  document.querySelector('body').appendChild(button);
};

// create and add button for toggling
// GH Markdown stylesheet off and on
const setupClearButton = (source, target, MD) => {
  let clearText = false;
  const targetClass = target.className;
  const starterText = `Delete Markdown`;
  const toggleText = `Revert to original Markdown`;
  const button = document.createElement("BUTTON");
  button.textContent = starterText;
  button.className = 'toggleText';
  button.addEventListener('click', () => {
    if (clearText) {
      source.textContent = MD;
      clearText = false;
      button.textContent = starterText;
    } else {
      source.textContent = '';
      clearText = true;
      button.textContent = toggleText;
    }
    source.focus();
    run(source,target);
  });
  document.querySelector('body').appendChild(button);
};

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
  setupStyleButton(target);
  setupClearButton(input, target, starterMD);
  input.textContent = starterMD;
  run(input,target);
  input.focus();
  input.addEventListener('input', () => run(input,target));
};

// start it up!
init(source, target, starterText);
