function getClubById() {
    let cek = 0;
    return new Promise(function(resolve, reject) {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");
        let temp ={};
        if("caches" in window){
            caches.match(`${BASE_URL}teams/${idParam}`).then( response =>{
                console.log(`response:${response}`)
                if(response){
                    response.json().then(data=>{
                        console.log(`data cache: ${data}`)
                        ShowDetail(data);
                        cek=1;
                        return resolve(data);
                    })
                }
            })
        
    }
        fetchAPI(`${BASE_URL}teams/${idParam}`)
            .then(data=>{
                if(cek===0)ShowDetail(data);
                return resolve(data);
            })
            .catch(error=>{
                console.log(error);
            })
    })

}


function ShowDetail(data){
    console.log(`data show:${data}`)
    let content = document.getElementById("body-content");
    let profil = document.getElementById("profil");
    let posisi = "";
    let clubImage = data.crestUrl;
    if(clubImage === null){
        clubImage="../icon/image-null.png"
    }
    profil.innerHTML=`
    <div id="content-club">
        <div class="row">
            <div class="col s12 m4 center-align">
                <img class="responsive-img" src="${clubImage}" alt="logo_${data.name}"></img>
            </div>
            <div class="col s12 m8">
                <table>
                    <tbody>
                        <tr>
                            <td>Last Update</td>
                            <td>${data.lastUpdated}</td>
                        </tr>
                        <tr>
                            <td>Stadion</td>
                            <td>${data.venue}</td>
                        </tr>
                        <tr>
                            <td>Competition</td>
                            <td id="kompetisi"></td>
                        </tr>
                        <tr>
                            <td>founded</td>
                            <td>${data.founded}</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td><a href="${data.website}">${data.website}</a></td>
                        </tr>
                    </tbody>
                </table>    
            </div>
        </div>
        <div class="content-club">
            <h1>Squad</h1>
        </div>
    </div>
    `

    let kompetisi = document.getElementById("kompetisi");
    
    data.activeCompetitions.forEach(komp=>{
        kompetisi.innerHTML +=`
            <span>${komp.name}</span>
            <br>
        `

    })
    data.squad.forEach(player => {
        console.log("cetak pemain")
        if(posisi!==`${player.position}`&&`${player.position}`!=="null"){
            content.innerHTML += `
                <div class="role ungu">
                    <h4 class="text-role">${player.position}</h4>
                </div>
            `
            posisi = `${player.position}`
        }else if(`${player.position}`==="null"&&posisi!==`${player.role}`){
            content.innerHTML += `
                <div class="role ungu">
                    <h4 class="text-role">${player.role}</h4>
                </div>
            `
            posisi = `${player.role}`
        }
        content.innerHTML += `
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header"><i class="material-icons">keyboard_arrow_down</i>${player.name} (${player.shirtNumber})</div>
                <div class="collapsible-body">  
                    <table>
                        <tbody>
                            <tr>
                            <td>Kewargakenegaraan</td>
                            <td>${player.nationality}</td>
                            </tr>
                            <tr>
                            <td>Tanggal lahir</td>
                            <td>${player.dateOfBirth.substring(0,10)}</td>
                            </tr>
                            <tr>
                            <td>Posisis</td>
                            <td>${player.position}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </li>
        </ul>
        `
    });
    let collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible);
}

function ShowSavedClub(){
    getAll().then(clubs=> {
        document.getElementById("saved").innerHTML=""
        let savedClub = "";
        clubs.forEach(club=> {
            let clubImage = club.crestUrl;
            if(clubImage === null){
                clubImage="../icon/image-null.png"
            }
            savedClub += `
                <div class="col s12 m6" >
                    <div class="card">
                        <a href="./detail-club.html?id=${club.id}&saved=true">
                            <div class="card-image waves-effect waves-block waves-light align-center">
                                <img src="${clubImage}" height="200"/>
                            </div>
                        </a>
                        <div class="card-content">                       
                        <a href="./index.html?id=${club.id}"class="btn-floating halfway-fab waves-effect waves-light red sampah" data-id="${club.id}"><i class="material-icons">delete</i></a>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Last Update</td>
                                    <td>${club.lastUpdated}</td>
                                </tr>
                                <tr>
                                    <td>Stadion</td>
                                    <td>${club.venue}</td>
                                </tr>
                                <tr>
                                    <td>Website</td>
                                    <td><a href="${club.website}">${club.website}</a></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
                    `;
        });
        document.getElementById("saved").innerHTML = savedClub;
    });
}

function GetSavedClubById(){
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    getById(idParam).then(club=>{
        ShowDetail(club)
    });
}

function cekSaved(){
    let count = 0;
    let ganti = document.getElementById("cek-club")
    getAll().then(clubs=>{
        clubs.forEach(club=>{
            console.log("nambah")
            count=count+1;
        })
        if(count>0){
            console.log(count)
            console.log("ganti")
            ganti.classList.remove("show");
            ganti.classList.add("hide");
        }else{
            console.log(count)
            console.log("ganti")
            ganti.classList.remove("hide");
            ganti.classList.add("show");
            
        }
    })
}