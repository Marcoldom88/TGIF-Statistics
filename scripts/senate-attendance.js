fetch("../scripts/senate.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (senate) {
    let democrats = Array.from(senate).filter(members => members.party ==='D');
    document.querySelector("#demoReps").innerHTML = democrats.length;

    let demoPercen = democrats.map((members => (members.votes_with_party_pct)))
      .reduce((a, b) => a + b, 0) / democrats.length;
    document.querySelector("#demoPercen").innerHTML = Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 })
      .format(demoPercen);
    
    let republicans = Array.from(senate).filter(members => members.party ==='R');
    document.querySelector("#repuReps").innerHTML = republicans.length;

    let repuPercen = republicans.map((members => (members.votes_with_party_pct)))
      .reduce((a,b) => a + b, 0)/republicans.length
    document.querySelector("#repuPercen").innerHTML = Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 })
      .format(repuPercen);
    
    let independents = Array.from(senate).filter(members => members.party ==='ID');
    document.querySelector("#indeReps").innerHTML = independents.length;

    let indePercen = independents.map((members => (members.votes_with_party_pct)))
      .reduce((a,b) => a + b, 0)/independents.length 
    document.querySelector("#indePercen").innerHTML = Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 })
      .format(indePercen);
    
    document.querySelector("#totalReps").innerHTML = democrats.length + republicans.length + independents.length;
    let totalPercen = (demoPercen + repuPercen + indePercen) / 3;

    document.querySelector("#totalPercen").innerHTML = Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 })
      .format(totalPercen);
    
    let senateBottomAttendance = Array.from(senate).sort((a, b) => b.missed_votes_pct - a.missed_votes_pct);
    senateBottomAttendance.length = 10;    
    buildsenateBottomAttendanceTable(senateBottomAttendance);

    let senateTopAttendance = Array.from(senate).sort((a, b) => a.missed_votes_pct - b.missed_votes_pct);
    senateTopAttendance.length = 10;    
    buildsenateTopAttendanceTable(senateTopAttendance);
  });



function buildsenateBottomAttendanceTable(members) {
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
  document.querySelector("#senateBottomAttendance").innerHTML = out;
};
function buildsenateTopAttendanceTable(members) {
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
  document.querySelector("#senateTopAttendance").innerHTML = out;
};

