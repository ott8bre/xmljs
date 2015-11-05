   /* OLD */
    function xml_old(tag, obj_attrs){
        
        // IF TAG IS MISSING OR NOT A STRING RETURN (undefined)
        if(!tag || !tag instanceof String) return;
        
        var str='';
        for(var a in obj_attrs){
            str += ' '+a+'= '+'"'+obj_attrs[a]+'"'
        }
        
        return function(arr_str){ 
            if(arr_str instanceof Object){
                var inner_str='';
                for(var a in arr_str){
                    inner_str += '\n\t'+arr_str[a];
                }           
            }else{
                var inner_str=arr_str;               
            }
            
            return "<"+tag+str+">"+(inner_str||'')+"</"+tag+">"; 
        } 
    }
   /* OLD */

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
                    inner_str = concat(arg1)
                } else {
                    // arg1 object
                    
                    attrs_str = flat(arg1);
                    
                    if(arg2!==undefined){
                        if(arg2.constructor == Array){
                            // arg2 array
                            inner_str = concat(arg2)
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

    var table = function(attrs){ return xml('table',attrs); }
    var thead = function(attrs){ return xml('thead',attrs); }
    var tbody = function(attrs){ return xml('tbody',attrs); }
    var tr = function(attrs){ return xml('tr',attrs); }
    var td = function(attrs){ return xml('td',attrs); }

    var createTableX = function(obj){
        
        var td_right = td({class:"td_intest_corpo", width:"2%", nowrap:"nowrap", align:"right"});
        var tr_plain = tr();
        
        return table({width:"100%",border:"0",cellspacing:"1",cellpadding:"2",class:"sort-table",id:"table-1"})([
            thead()([
                tr_plain([
                    td({class:"td_intest_corpo", width:"1%", nowrap:"nowrap"})("N."),
                    td({class:"td_intest_corpo", width:"",   nowrap:"nowrap"})("Collaboratore"),
                    td({class:"td_intest_corpo", width:"2%", nowrap:"nowrap", align:"left", title:"Livello alla data invio contratto"})("Livello a D.I.C"),
                    td_right("SuperWatt"),
                    td_right("Compenso"),
                    td_right("P. Carriera"),
                    td_right("P. Qualità"),
                    td_right("P. Impresa"),
                    td_right("P. Consulenza"),
                ])
            ]),
            xml('tbody')(),
        ]);
    }