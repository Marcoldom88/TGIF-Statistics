//state's checkboxes
let checkboxes = document.querySelectorAll("input:checked");

//select state
let select = document.getElementById("filterstates");

const parties = {
  D: 'Democrat',
  R: 'Republican',
  ID: 'Independent'
}
// create  multicheckbox 

const states = {
  "AL": "Alabama",
  "AK": "Alaska",
  "AS": "American Samoa",
  "AZ": "Arizona",
  "AR": "Arkansas",
  "CA": "California",
  "CO": "Colorado",
  "CT": "Connecticut",
  "DE": "Delaware",
  "DC": "District Of Columbia",
  "FM": "Federated States Of Micronesia",
  "FL": "Florida",
  "GA": "Georgia",
  "GU": "Guam",
  "HI": "Hawaii",
  "ID": "Idaho",
  "IL": "Illinois",
  "IN": "Indiana",
  "IA": "Iowa",
  "KS": "Kansas",
  "KY": "Kentucky",
  "LA": "Louisiana",
  "ME": "Maine",
  "MH": "Marshall Islands",
  "MD": "Maryland",
  "MA": "Massachusetts",
  "MI": "Michigan",
  "MN": "Minnesota",
  "MS": "Mississippi",
  "MO": "Missouri",
  "MT": "Montana",
  "NE": "Nebraska",
  "NV": "Nevada",
  "NH": "New Hampshire",
  "NJ": "New Jersey",
  "NM": "New Mexico",
  "NY": "New York",
  "NC": "North Carolina",
  "ND": "North Dakota",
  "MP": "Northern Mariana Islands",
  "OH": "Ohio",
  "OK": "Oklahoma",
  "OR": "Oregon",
  "PW": "Palau",
  "PA": "Pennsylvania",
  "PR": "Puerto Rico",
  "RI": "Rhode Island",
  "SC": "South Carolina",
  "SD": "South Dakota",
  "TN": "Tennessee",
  "TX": "Texas",
  "UT": "Utah",
  "VT": "Vermont",
  "VI": "Virgin Islands",
  "VA": "Virginia",
  "WA": "Washington",
  "WV": "West Virginia",
  "WI": "Wisconsin",
  "WY": "Wyoming"
};



//FETCH for data
fetch("../scripts/house.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (house) {
    buildTable(house)
    checkboxes.forEach(function (checkbox) { //CHECKBOX PARTY FILTER
      checkbox.addEventListener('change', function () {
        let enabledSettings = Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.                              
        .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.                              
        .map(i => i.value); // Use Array.map to extract only the checkbox values from the array of objects.
        function makeFilterArray(members, enabledSettings) {
          let filterarr = [];
          members.forEach(members => {
            if (enabledSettings.length !== 0) {
              if (enabledSettings.includes(members.party)) {
              filterarr.push(members);
              } return buildTable(filterarr)
            }
          })
        }
        return makeFilterArray(house, enabledSettings);
      }); 
    });
    select.addEventListener("click", function (e) { // SELECT STATE FILTER
      let stateSelected = e.target.value; // get option value from clicked option
      function filterByState(members, stateSelected) {
        let filterarr = [];
        members.forEach(members => {
            if (stateSelected.length !== 0) {
              if (stateSelected.includes(members.state)) {
              filterarr.push(members);
              } return buildTable(filterarr)
            } else {
              return buildTable(house);
            }
          })
        }; 
      return filterByState (house, stateSelected)
    });
  }
);
// function for building house's table
function buildTable(members) {
   let out = "";
    for (let member of members) {
      out += `
      <tr>
        <td><a href="${member.url}">${member.first_name} ${member.last_name}</a></td>
        <td>${member.party}</td>
        <td>${member.state}</td>
        <td>${member.seniority}</td>
        <td>${member.votes_with_party_pct}</td>
      </tr
      `;
    }
    document.querySelector("#data-output").innerHTML = out;
};


//function for creating the select list for states
function buildDropdown(states) {
  const keyStates = Object.keys(states); //dentro del objeto solo nos quedamos con las claves que son las abreviaciones
  var selectmenu = document.getElementById('filterstates'); //nos traemos del html el elemento con id filterstates
  keyStates.forEach((key, index) => { //para cada key dentro de keyStates
    let stateOptions = document.createElement('option'); //creamos elementos option
    stateOptions.value = `${key}`;//el valor sera la key
    stateOptions.text =`${key}`;//el texto sera la key tambien
    selectmenu.appendChild(stateOptions);//añadimos elementos hijo de tipo option al select
  });
};
buildDropdown(states);
 
