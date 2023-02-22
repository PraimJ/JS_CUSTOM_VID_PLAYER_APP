/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
//THIS SELECTS ALL DATA-SKIP ATTRIBUTES IN THE PLAYER DIV
const ranges = player.querySelectorAll('.player__slider');
//THIS SELECTS ALL PLAYER__SLIDER CLASSES IN THE PLAYER DIV

// A space-separated list of the classes of the element. 
// Classes allows CSS and JavaScript to select and access 
// specific elements via the class selectors or functions 
// like the method Document.getElementsByClassName().

/* Build out functions */
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
//This explains all the different events of video,
//so if the state of the video is "paused" then you call the 
//event of tooglePlay() the vid while play, else now while its playing,
// you can pause it to cause the stated of paused

function updateButton() {
    let icon;
    if (this.paused) {
        icon = '►'
    } else {
        icon = '❚ ❚';
    }
    console.log(icon);
    toggle.textContent = icon;
}
//this refers to video, because updatebutton is only, being called 
//when the eventlistener on video is paused or played.
//below is a fancier way to code using , Conditional (ternary) operator
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

// {
//     const icon = this.paused ? '►' : '❚ ❚';
//     console.log(icon);
//     toggle.textContent = icon;
// }

function skip() {
    console.log(this.dataset.skip)
    video.currentTime += parseFloat(this.dataset.skip);
}
//this now refers to skipbuttons
//dataset checks the data inside a data- attribute such as skip
//currenttime is a prperty of video and is in units of seconds
//parsefloat converts a string into a number

function handleRangeUpdate() {
    video[this.name] = this.value;
}

//the 2 range names are properties of video.
//this refers to ranges so you can set the video.volume = volume.value

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
//progreesBar is the const that refers to the div of progess_filled
//where updated the style of progress__filled (flex.basis = percent)

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
//listens for when you click on the vid to activate togglePlay()
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
//time update is a video property

toggle.addEventListener('click', togglePlay);
//listens for when you click on the toggle button to activate togglePlay()

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
//loops through each range and listens for change or mousemove

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);