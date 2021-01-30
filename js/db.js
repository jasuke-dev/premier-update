let dbPromised = idb.open("premierclubs", 1, upgradeDb=> {
    let clubsObjectStore = upgradeDb.createObjectStore("clubs", {
      keyPath: "id"
    });
    clubsObjectStore.createIndex("name", "name", { unique: false });
  });

function saveForLater(club) {
dbPromised
    .then(db=> {
    let tx = db.transaction("clubs", "readwrite");
    let store = tx.objectStore("clubs");   
    store.add(club);
    return tx.complete;
    })
    .then(()=> {
        M.toast({html: 'Berhasil disimpan', classes: 'rounded ungu'})
    })
    .catch(()=> {
        M.toast({html: 'Sudah ada', classes: 'rounded ungu'})
    })
}

function getAll() {
    return new Promise((resolve, reject)=> {
      dbPromised
        .then(db=> {
          let tx = db.transaction("clubs", "readonly");
          let store = tx.objectStore("clubs");
          return store.getAll();
        })
        .then(articles=> {
          resolve(articles);
        });
        
    });
  }

function getById(id) {
return new Promise((resolve, reject) =>{
    dbPromised
    .then(db=> {
        let tx = db.transaction("clubs", "readonly");
        let store = tx.objectStore("clubs");
        return store.get(parseInt(id));
    })
    .then(club=>{
        resolve(club);
    });
});
}

function deleteById(id){
    dbPromised
    .then(db=> {
        let tx = db.transaction('clubs', 'readwrite');
        let store = tx.objectStore('clubs');
        store.delete(parseInt(id));
        return tx.complete;
      }).then(function() {
        console.log('Item deleted');
      });
}