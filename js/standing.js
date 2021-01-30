function getAllStandings() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStanding(data) {
    console.log(data)
    let standings = ""; 
    let standingElement =  document.getElementById("homeStandings");
    let clubImage;
    data.standings[0].table.forEach(function (standing) {  
        console.log(standing.crestUrl)          
        if (standing.team.crestUrl !== null) {            
             clubImage = standing.team.crestUrl.replace(/^http:\/\//i, 'https://');        
        }else{
            clubImage = "../icon/image-null.png"
        }
        standings += `
                <tr>
                    <td><img src="${clubImage}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                    <td><a href="./detail-club.html?id=${standing.team.id}">See Detail</a></td>
                </tr>
        `;
    });

     standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                    <table class="striped responsive-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Team Name</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>P</th>
                                <th>GF</th>
                                <th>GA</th>
                                <th>GD</th>
                            </tr>
                        </thead>
                        <tbody id="standings">
                            ${standings}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h5 class="ungu text-white">Last Updated : ${data.competition.lastUpdated}</h5>
                </div>
    `;
}