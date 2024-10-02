// const isVerified = true;


// console.log(`${isVerified===true ? "user is verified"  :"user isnt verified"}`)



function getTimeString(time){
    const hour = parseInt (time/3600);
    let remaininSeconds  = time % 3600;
    const minutes = parseInt(remaininSeconds/60);
    remaininSeconds = remaininSeconds%60;
    return`${hour} hour ${minutes} minutes ${remaininSeconds} seconds ago`
}

console.log(getTimeString(7380));