/*NALFAJRI 23 oct 2014, mengakomodir keperluan PMS*/
function ShowCustomPopUp(url) {
    $.colorbox({ href: url, iframe: true, innerWidth: '95%', innerHeight: '95%' });
}

function ShowCustomPopUpHW(url,H,W) {
    $.colorbox({ href: url, iframe: true, innerWidth: W+'%', innerHeight: H+'%' });
}