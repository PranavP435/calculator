var deg = false;
var dup = '';
var trig_st = 0;
var trig = ['sin','cos','tan'];

/*Converts degrees to radians*/
function torad(deg){
    return (deg * Math.PI)/180
}

/*The call back function of all buttons in the calculator*/
function clk(txt){
    txtbox = document.getElementById('result');
    if (trig.includes(txt)){ /*If a trignometric function is used*/
        if (deg){
            dup += `Math.${txt}(torad(` /*convert into rad if degree mode is on. eval() only computes in rad*/
        }
        else{
            dup += `Math.${txt}(`;
        }
        
        txtbox.value += `${txt}(`;
        trig_st += 1;
        return;
    }
    if (txt == 'c'){ /* if the clear button is used*/
        txtbox.value = '';
        dup = '';
        trig_st = false;
        return;
    }
    else if (txt == '**'){/* the to the power of button is used*/
        txtbox.value += '^';
        dup += txt;
        return;
    }
    else if(txt == '='){/* to compute the value of the existitng expression if equals is used*/
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
        txtbox.value = eval(dup);/*No if statements above is triggered, a button from 0-9 or the 
                                   + - * / buttons is used*/
        dup = txtbox.value;
        trig_st = false;
        return;
    }

    txtbox.value += txt;
    dup += txt
}

/*Changes mode from Degress to Radians and vice versa*/
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