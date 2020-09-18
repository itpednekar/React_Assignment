function getHt() {
    return document.documentElement.clientHeight
}

function getImage(imageNmae) {
    return (`https://gsg-image-uploads.s3-accelerate.amazonaws.com/webcontent/img/coaches/profilePic/${imageNmae}`)
}

function returnRegx(type) {
    switch (type) {
        case 'email':
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
}

export { getHt, getImage, returnRegx }