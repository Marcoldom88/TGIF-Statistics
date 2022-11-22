fetch("../scripts/house.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (house) {
    let democrats = Array.from(house).filter(members => members.party ==='D');
    document.querySelector("#demoReps").innerHTML = democrats.length;

    let demoPercen = democrats.map((members => (members.votes_with_party_pct)))
      .reduce((a, b) => a + b, 0) / democrats.length;
    
    document.querySelector("#demoPercen").innerHTML = Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 })
      .format(demoPercen);
    
    let republicans = Array.from(house).filter(members => members.party ==='R');
    document.querySelector("#repuReps").innerHTML = republicans.length;

    let repuPercen = republicans.map((members => (members.votes_with_party_pct)))
      .filter(Boolean)
      .reduce((a, b) => a + b, 0) / republicans.length
    
    document.querySelector("#repuPercen").innerHTML = Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 })
      .format(repuPercen);
    
    let independents = Array.from(house).filter(members => members.party ==='ID');
    document.querySelector("#indeReps").innerHTML = independents.length;

    let indePercen = independents.map((members => (members.votes_with_party_pct)))
      .filter(Boolean)
      //.reduce((a,b) => a + b, 0)/independents.length
    
    document.querySelector("#indePercen").innerHTML = Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 })
      .format(indePercen);
    
    document.querySelector("#totalReps").innerHTML = democrats.length + republicans.length + independents.length;
    let totalPercen = (demoPercen + repuPercen) / 2;

    document.querySelector("#totalPercen").innerHTML = Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 })
      .format(totalPercen);
    
    let houseBottomAttendance = Array.from(house).sort((a, b) => b.missed_votes_pct - a.missed_votes_pct);
    houseBottomAttendance.length = 10;  
    buildHouseBottomAttendanceTable(houseBottomAttendance);

    let houseTopAttendance = Array.from(house).sort((a, b) => a.missed_votes_pct - b.missed_votes_pct);
    houseTopAttendance.length = 20;  
    buildHouseTopAttendanceTable(houseTopAttendance);
  });



function buildHouseBottomAttendanceTable(members) {
   let out = "";
    for (let member of members) {
      out += `
      <tr>
        <td><a href="${member.url}">${member.first_name} ${member.last_name}</a></td>
        <td>${member.missed_votes}</td>
        <td>${member.missed_votes_pct}</td>
      </tr
      `;
    }
  document.querySelector("#houseBottomAttendance").innerHTML = out;
};
function buildHouseTopAttendanceTable(members) {
   let out = "";
    for (let member of members) {
      out += `
      <tr>
        <td><a href="${member.url}">${member.first_name} ${member.last_name}</a></td>
        <td>${member.missed_votes}</td>
        <td>${member.missed_votes_pct}</td>
      </tr
      `;
    }
  document.querySelector("#houseTopAttendance").innerHTML = out;
};
