( function(converter) {
  const dom = {
    sourceID : '#sourceTA',
    targetID : '#targetDiv'
  };
  const config = {
    converter: converter,
    source : document.querySelector(dom.sourceID),
    target : document.querySelector(dom.targetID),
    buttons : document.querySelectorAll('.toggle'),
    styleButton : document.querySelector('.toggle.styles'),
    textButton : document.querySelector('.toggle.text'),
    starterText :
`#Markdown FTW
Just type regular text to make a paragraph.
* And asterisks
* On each line
* To make bulleted lists

There is just **so** *much* you can **do**!

I can't believe it's THIS easy!!!!

Click this [link for a markdown cheatsheet](https://teamtreehouse.com/markdown)

Select ***all*** of the text here, ***delete it***, and write your OWN Markdown!`
  };
console.log(config.styleButton);
  // add event listeners to buttons
  // add toggle actions
  const buttonSetup = (input,target,starterMD) => {
    for (var button of config.buttons) {
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

    config.styleButton.addEventListener('click', function() {
      if (target.className === 'markdown-body') {
        target.className = '';
      } else {
        target.className = 'markdown-body';
      }
    });

    config.textButton.addEventListener('click', function() {
      if (this.getAttribute('data-action') === 'clear') {
        this.setAttribute('data-action', 'reset');
        input.value = '';
      } else {
        this.setAttribute('data-action', 'clear');
        input.value = starterMD;
      }
      run(input,target);
      input.focus();
    });
  }

  // function for invoking the markdown conversion
  const run = (source, target) => {
    const converter = new config.converter();
    let text = source.value;
    let html = converter.makeHtml(text);
    target.innerHTML = html;
  };

  // initialize!!!!
  // set up the button
  // convert initial markdown to HTML
  // setup event listener for any input into
  // the source text area
  config.source.textContent = config.starterText;
  run(config.source,config.target);
  config.source.focus();
  buttonSetup(config.source, config.target, config.starterText)
  config.source.addEventListener('input', () => run(config.source,config.target));

})(showdown.Converter);
