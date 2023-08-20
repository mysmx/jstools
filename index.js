let m80date = {
    str2date : function(str) {  //10.11.2022      
        var d = str.split('.');        
        return  new Date(d[2]+'/'+d[1]+'/'+d[0]);        
    },  
    makeDate: function(date) {
        date = date.split('-');
        return date[2]+'.'+date[1]+'.'+date[0];
      },
    makeDateSQL: function(date) {
        date = date.split('.');
        return date[2]+'-'+date[1]+'-'+date[0];
    },
    makeDateRus: function(date_str) {
          var date = new Date(this.makeDateSQL(date_str));
          var months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
          var days = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
          date_str = date_str.split('.');
          return parseInt(date_str[0])+' '+months[date.getMonth()]+' '+date_str[2]+', '+days[date.getDay()];
    },
    calcDate : function(dateFrom,dateTo,type) { //calcDate(new Date(),new Date(),'years')
        var months = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear())),
            lastDayFrom = new Date(dateFrom.getFullYear(), dateFrom.getMonth() + 1, 0, 23, 59, 59),
            lastDayTo = new Date(dateTo.getFullYear(), dateTo.getMonth() + 1, 0, 23, 59, 59),
            dayFrom = dateFrom.getDate(),
            dayTo = dateTo.getDate();
        
        if(dayFrom>lastDayTo.getDate()) {            
            dayFrom = lastDayTo.getDate();
        }
        if(dayTo>lastDayFrom.getDate()) {            
            dayTo = lastDayFrom.getDate();
        }                
        if( dayFrom > dayTo){         
            months--;
        }
        if(type=='years')  months = Math.floor(months/12);
        return months;
    },
    getAge: function(dateStr) {
        if(!dateStr) return '';        
        var birthdateParts = dateStr.split('.');
        var birthdate = new Date(Date.UTC(birthdateParts[2], birthdateParts[1] - 1, birthdateParts[0], 0, 0, 0));

        var now = new Date();
        var ageInDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0));

        var age = ageInDate.getFullYear() - birthdate.getFullYear();
        if (ageInDate.getMonth() < birthdate.getMonth()) {
            age--;
        } else if (ageInDate.getMonth() === birthdate.getMonth() && ageInDate.getDate() < birthdate.getDate()) {
            age--;
        }
        if(age) return age;        
    }      
},
m80text = {
    ucFirst : function(s){
        s = s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
        return s;
    },
    pad : function(n) {
        if (n < 10) return "0" + n;
        else return n;
    },
    scrollTo: function(id) {
        let currenttop = 0,
            obj = document.getElementById(id);
        if (obj.offsetParent){
            do{
            currenttop += obj.offsetTop;
            }while ((obj = obj.offsetParent));
            window.scrollTo({
                top: currenttop,
                left: 0,
                behavior: 'smooth'
            });
        }
    },
    strLower: function(str) {
        return str.toLowerCase().trim();
    },
},
m80var = {
    in_arr : function(arr, elem) { 
        if(!Array.isArray(arr)) return false;
        if (arr.indexOf(elem) != -1 ) return true;
        else return false;
    },
    isset: function(variable) {
        if (typeof variable !== "undefined" && variable) {
        return true;
        } else return false;
    },
    getUrlParameter: function(sParam) {  //getUrlParameter('petsnickname')
        let sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    }
}
String.prototype.replaceAll = function(search, replacement) { ///v.replaceAll(".","-");
    var target = this;
    return target.split(search).join(replacement);
};