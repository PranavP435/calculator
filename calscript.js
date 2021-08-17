var deg = false;
var dup = '';
var trig_st = 0;
var trig = ['sin','cos','tan'];
var calcdone = false;
var prevans = "";

/*Converts degrees to radians*/
function torad(deg){
    return (deg * Math.PI)/180
}

/*The call back function of all buttons in the calculator*/
function clk(txt){
    try{
        txtbox = document.getElementById('result');
        angbtn = document.getElementsByClassName('degRad')[0];
        if (trig.includes(txt)){ /*If a trignometric function is used*/
            angbtn.style.color = 'black';
            angbtn.disabled = true;
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
            angbtn.disabled = false;
            return;
        }
        else if (txt == '**'){/* the to the power of button is used*/
            txtbox.value += '^';
            dup += txt;
            return;
        }
        else if (txt == 'ans'){
            if (prevans && (!(dup) || ["+","-","*","/"].includes(dup[dup.length-1]))){
                txtbox.value += "Ans";
                dup += prevans;
                return;
            }
            else {
                txtbox.value += "* Ans";
                dup += `* ${prevans}`;
                return;
            }
                
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
            angbtn.disabled = false;
            txtbox.value = eval(dup);
            dup = txtbox.value;
            prevans = txtbox.value;
            document.getElementsByClassName('answer')[0].disabled = false;
            trig_st = false;
            calcdone = true;
            return;
        }
        /*No if statements above is triggered, a button from 0-9 or the 
        + - * / buttons is used*/
        if (calcdone && !(["+","-","*","/"].includes(txt))){
            txtbox.value = txt;
            dup = txt;
            calcdone = false;
            return;
        }
        txtbox.value += txt;
        dup += txt
        calcdone=false;
    }
    catch (e){
        console.log(e);
        calcdone = true;
        txtbox = document.getElementById('result');
        txtbox.value = "Error";
    }
}

/*Changes mode from Degress to Radians and vice versa*/
function changeang(){
    ang = document.getElementsByClassName('degRad')[0];
    if (ang.innerHTML == '<strong>Rad</strong> | Deg'){
        deg = true;
        ang.innerHTML = 'Rad | <strong>Deg</strong>';
    }
    else{
        deg = false;
        ang.innerHTML = '<strong>Rad</strong> | Deg';
    }
}
