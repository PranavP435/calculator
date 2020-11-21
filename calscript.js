var deg = false;
var dup = '';
var trig_st = 0;
var trig = ['sin','cos','tan'];

function torad(deg){
    return (deg * Math.PI)/180
}

function clk(txt){
    txtbox = document.getElementById('result');
    if (trig.includes(txt)){
        if (deg){
            dup += `Math.${txt}(torad(`
        }
        else{
            dup += `Math.${txt}(`;
        }
        
        txtbox.value += `${txt}(`;
        trig_st += 1;
        return;
    }
    if (txt == 'c'){
        txtbox.value = '';
        dup = '';
        trig_st = false;
        return;
    }
    else if (txt == '**'){
        txtbox.value += '^';
        dup += txt;
        return;
    }
    else if(txt == '='){
        if (trig_st > 0){
            if (deg){
                for (i = 1;i <= trig_st;i++){
                    dup += ')';
                }
            }
            for (i = 1;i <= trig_st;i++){
                txtbox.value += ')';
                dup += ')';
            }
        }
        txtbox.value = eval(dup);
        dup = txtbox.value;
        trig_st = false;
        return;
    }

    txtbox.value += txt;
    dup += txt
}

function changeang(){
    ang = document.getElementsByClassName('degRad')[0];
    if (ang.innerHTML == 'Deg'){
        deg = true;
        ang.innerHTML = 'Rad';
    }
    else{
        deg = false;
        ang.innerHTML = 'Deg';
    }
}