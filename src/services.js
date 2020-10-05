function getHt() {
    return document.documentElement.clientHeight
}



function returnRegx(type) {
    switch (type) {
        case 'email':
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
}

function fakeLogin(em, pass, success, err ) {
    setTimeout(() => {
        if(em === 'itp@gmail.com' && pass === 'Ishwari@123')
        success({ auth : 'someauth'})
        else
        err('Invalid credentials! Give a try again :)')
    }, 500);
}


export { getHt, returnRegx, fakeLogin }