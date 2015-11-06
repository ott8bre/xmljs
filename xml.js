function xml(tag, arg1, arg2){
    if(arguments.length < 1 || !tag || typeof tag !== 'string') return;

    var attrs_str = '';
    var inner_str = ''

    function is_scalar(obj){return (/string|number|boolean/).test(typeof obj);}

    function concat(array){
        var str = '';
        for(var a in array){
            var v = array[a];
            if(v!==null && v!==undefined) {
                str += array[a];
            }
        }
        return str;
    }

    function flat(object){
        var str='';
        for(var a in object){
            str += ' '+a+'='+'"'+object[a]+'"';
        }
        return str;
    }

    if(arg1!==undefined){
        if(typeof arg1 === 'object'){
            if(arg1.constructor == Array){
                // arg1 array
                inner_str = concat(arg1);
            } else {
                // arg1 object

                attrs_str = flat(arg1);

                if(arg2!==undefined){
                    if(arg2.constructor == Array){
                        // arg2 array
                        inner_str = concat(arg2);
                    }else if(is_scalar (arg2)){
                        // arg2 string
                        inner_str = arg2;
                    }
                }
            }
        } else if(is_scalar (arg1)){
            // arg1 string
            inner_str = arg1;
        }
    }

    return "<" + tag + attrs_str + ">" + (inner_str) + "</" + tag + ">";
}
