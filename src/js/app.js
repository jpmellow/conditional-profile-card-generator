import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  let socialMedia = "";
  if (variables.socialMediaPosition === "position-left") {
    socialMedia = `<ul class="position-left">
      <li><a href="${variables.twitter}"><i class="fab fa-twitter"></i></a></li>
      <li><a href="${variables.github}"><i class="fab fa-github"></i></a></li>
      <li><a href="${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>
      <li><a href="${variables.instagram}"><i class="fab fa-instagram"></i></a></li>
    </ul>`;
  } else {
    socialMedia = `<ul class="position-right">
      <li><a href="${variables.twitter}"><i class="fab fa-twitter"></i></a></li>
      <li><a href="${variables.github}"><i class="fab fa-github"></i></a></li>
      <li><a href="${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>
      <li><a href="${variables.instagram}"><i class="fab fa-instagram"></i></a></li>
    </ul>`;
  }

  const name = variables.name ? variables.name : "";
  const lastName = variables.lastName ? variables.lastName : "";
  const role = variables.role ? variables.role : "";
  const country = variables.country ? variables.country : "";
  const city = variables.city ? variables.city : "";

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
    ${cover}
    <img src="${variables.avatarURL}" class="photo" />
    <h1>${name} ${lastName}</h1>
    <h2>${role}</h2>
    <h3>${city}, ${country}</h3>
    ${socialMedia}
  </div>`;
}

window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-left",

    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,

    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null,
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
