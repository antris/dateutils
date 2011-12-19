$.continuousCalendar={};$.continuousCalendar.version="1.1.1";$.continuousCalendar.released="2011-12-19";Date.DAYS_IN_MONTH=[31,28,31,30,31,30,31,31,30,31,30,31];Date.SECOND=1000;Date.MINUTE=60*Date.SECOND;Date.HOUR=60*Date.MINUTE;Date.DAY=24*Date.HOUR;Date.WEEK=7*Date.DAY;Date.MONDAY=1;Date.FRIDAY=5;Date.SUNDAY=0;Date.NOW=new Date();Date.getDaysInMonth=function(a,b){if(((0==(a%4))&&((0!=(a%100))||(0==(a%400))))&&b==1){return 29}else{return Date.DAYS_IN_MONTH[b]}};Date.getDayInYear=function(c,d,a){var e=0;for(var b=0;b<d;b++){e+=Date.getDaysInMonth(c,b)}e+=a;return e};Date.prototype.getDaysInMonth=function(){return Date.getDaysInMonth(this.getFullYear(),this.getMonth())};Date.prototype.getDayInYear=function(){return Date.getDayInYear(this.getFullYear(),this.getMonth(),this.getDate())};Date.prototype.plusDays=function(d){var b=this.clone();var a=this.getHours();b.setTime(this.getTime()+d*Date.DAY);var c=a-b.getHours();if(c!=0){if(c>12){c-=24}if(c<-12){c+=24}b.setTime(b.getTime()+(c*Date.HOUR))}return b};Date.prototype.plusYears=function(b){var a=this.clone();a.setFullYear(this.getFullYear()+b);return a()};Date.prototype.stripped=function(){return new Date(parseInt(this.getTime()/Date.DAY,10))};Date.prototype.compareTo=function(b){if(!b){return 1}var a=this.getTime();var c=b.getTime();if(a<c){return -1}else{if(a>c){return 1}else{return 0}}};Date.prototype.compareDateOnlyTo=function(a){if(!a){return 1}return this.stripped().compareTo(a.stripped())};Date.prototype.isToday=function(){return this.equalsOnlyDate(Date.NOW)};Date.prototype.getWeekInYear=function(b){if(b!="US"&&b!="ISO"){throw ("Week numbering system must be either US or ISO, was "+b)}var a=new Date(this.getFullYear(),0,1).getDay();if(b=="US"){return Math.ceil((this.getDayInYear()+a)/7)}var e=4;var d=this.getDay();if(d==0){d=7}if(a==0){a=7}if(this.getMonth()==11&&this.getDate()>=29&&(this.getDate()-d)>27){return 1}if(this.getMonth()==0&&this.getDate()<4&&d>e){return new Date(this.getFullYear()-1,11,31).getWeekInYear("ISO")}var c=Math.ceil((this.getDayInYear()+a-1)/7);if(a>e){c--}return c};Date.prototype.getFirstDateOfWeek=function(a){if(a<this.getDay()){return this.plusDays(a-this.getDay())}else{if(a>this.getDay()){return this.plusDays(a-this.getDay()-7)}else{return this.clone()}}};Date.prototype.hasMonthChangedOnPreviousWeek=function(a){var b=this.getFirstDateOfWeek(a);var c=b.plusDays(-7);return b.getMonth()!=c.getMonth()};Date.prototype.clone=function(){return new Date(this.getTime())};Date.prototype.isOddMonth=function(){return this.getMonth()%2!=0};Date.prototype.equalsOnlyDate=function(a){if(!a){return false}return this.getMonth()==a.getMonth()&&this.getDate()==a.getDate()&&this.getYear()==a.getYear()};Date.prototype.isBetweenDates=function(b,a){return this.compareTo(b)>=0&&this.compareTo(a)<=0};Date.prototype.firstDateOfMonth=function(){return new Date((this.getMonth()+1)+"/1/"+this.getFullYear())};Date.prototype.lastDateOfMonth=function(){return new Date((this.getMonth()+1)+"/"+this.getDaysInMonth()+"/"+this.getFullYear())};Date.prototype.distanceInDays=function(a){var c=parseInt(this.getTime()/Date.DAY,10);var b=parseInt(a.getTime()/Date.DAY,10);return(b-c)};Date.prototype.withWeekday=function(a){return this.plusDays(a-this.getDay())};Date.prototype.getOnlyDate=function(){return new Date(this.getFullYear(),this.getMonth(),this.getDate())};Date.parseFunctions={count:0};Date.parseRegexes=[];Date.formatFunctions={count:0};Date.prototype.dateFormat=function(b){if(Date.formatFunctions[b]==null){Date.createNewFormat(b)}var a=Date.formatFunctions[b];return this[a]()};Date.createNewFormat=function(format){var funcName="format"+Date.formatFunctions.count++;Date.formatFunctions[format]=funcName;var code="Date.prototype."+funcName+" = function(){return ";var special=false;var ch="";for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true}else{if(special){special=false;code+="'"+String.escape(ch)+"' + "}else{code+=Date.getFormatCode(ch)}}}eval(code.substring(0,code.length-3)+";}")};Date.getFormatCode=function(a){switch(a){case"d":return"String.leftPad(this.getDate(), 2, '0') + ";case"D":return"Date.dayNames[this.getDay()].substring(0, 3) + ";case"j":return"this.getDate() + ";case"l":return"Date.dayNames[this.getDay()] + ";case"S":return"this.getSuffix() + ";case"w":return"this.getDay() + ";case"z":return"this.getDayOfYear() + ";case"W":return"this.getWeekOfYear() + ";case"F":return"Date.monthNames[this.getMonth()] + ";case"m":return"String.leftPad(this.getMonth() + 1, 2, '0') + ";case"M":return"Date.monthNames[this.getMonth()].substring(0, 3) + ";case"n":return"(this.getMonth() + 1) + ";case"t":return"this.getDaysInMonth() + ";case"L":return"(this.isLeapYear() ? 1 : 0) + ";case"Y":return"this.getFullYear() + ";case"y":return"('' + this.getFullYear()).substring(2, 4) + ";case"a":return"(this.getHours() < 12 ? 'am' : 'pm') + ";case"A":return"(this.getHours() < 12 ? 'AM' : 'PM') + ";case"g":return"((this.getHours() %12) ? this.getHours() % 12 : 12) + ";case"G":return"this.getHours() + ";case"h":return"String.leftPad((this.getHours() %12) ? this.getHours() % 12 : 12, 2, '0') + ";case"H":return"String.leftPad(this.getHours(), 2, '0') + ";case"i":return"String.leftPad(this.getMinutes(), 2, '0') + ";case"s":return"String.leftPad(this.getSeconds(), 2, '0') + ";case"O":return"this.getGMTOffset() + ";case"T":return"this.getTimezone() + ";case"Z":return"(this.getTimezoneOffset() * -60) + ";default:return"'"+String.escape(a)+"' + "}};Date.parseDate=function(a,c){if(a=="today"){return Date.NOW}if(Date.parseFunctions[c]==null){Date.createParser(c)}var b=Date.parseFunctions[c];return Date[b](a)};Date.createParser=function(format){var funcName="parse"+Date.parseFunctions.count++;var regexNum=Date.parseRegexes.length;var currentGroup=1;Date.parseFunctions[format]=funcName;var code="Date."+funcName+" = function(input){\nvar y = -1, m = -1, d = -1, h = -1, i = -1, s = -1;\nvar d = Date.NOW;\ny = d.getFullYear();\nm = d.getMonth();\nd = d.getDate();\nvar results = input.match(Date.parseRegexes["+regexNum+"]);\nif (results && results.length > 0) {";var regex="";var special=false;var ch="";for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true}else{if(special){special=false;regex+=String.escape(ch)}else{obj=Date.formatCodeToRegex(ch,currentGroup);currentGroup+=obj.g;regex+=obj.s;if(obj.g&&obj.c){code+=obj.c}}}}code+="if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0)\n{return new Date(y, m, d, h, i, s);}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0)\n{return new Date(y, m, d, h, i);}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0)\n{return new Date(y, m, d, h);}\nelse if (y > 0 && m >= 0 && d > 0)\n{return new Date(y, m, d);}\nelse if (y > 0 && m >= 0)\n{return new Date(y, m);}\nelse if (y > 0)\n{return new Date(y);}\n}return null;}";Date.parseRegexes[regexNum]=new RegExp("^"+regex+"$");eval(code)};Date.formatCodeToRegex=function(b,a){switch(b){case"D":return{g:0,c:null,s:"(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)"};case"j":case"d":return{g:1,c:"d = parseInt(results["+a+"], 10);\n",s:"(\\d{1,2})"};case"l":return{g:0,c:null,s:"(?:"+Date.dayNames.join("|")+")"};case"S":return{g:0,c:null,s:"(?:st|nd|rd|th)"};case"w":return{g:0,c:null,s:"\\d"};case"z":return{g:0,c:null,s:"(?:\\d{1,3})"};case"W":return{g:0,c:null,s:"(?:\\d{2})"};case"F":return{g:1,c:"m = parseInt(Date.monthNumbers[results["+a+"].substring(0, 3)], 10);\n",s:"("+Date.monthNames.join("|")+")"};case"M":return{g:1,c:"m = parseInt(Date.monthNumbers[results["+a+"]], 10);\n",s:"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"};case"n":case"m":return{g:1,c:"m = parseInt(results["+a+"], 10) - 1;\n",s:"(\\d{1,2})"};case"t":return{g:0,c:null,s:"\\d{1,2}"};case"L":return{g:0,c:null,s:"(?:1|0)"};case"Y":return{g:1,c:"y = parseInt(results["+a+"], 10);\n",s:"(\\d{4})"};case"y":return{g:1,c:"var ty = parseInt(results["+a+"], 10);\ny = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",s:"(\\d{1,2})"};case"a":return{g:1,c:"if (results["+a+"] == 'am') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",s:"(am|pm)"};case"A":return{g:1,c:"if (results["+a+"] == 'AM') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",s:"(AM|PM)"};case"g":case"G":case"h":case"H":return{g:1,c:"h = parseInt(results["+a+"], 10);\n",s:"(\\d{1,2})"};case"i":return{g:1,c:"i = parseInt(results["+a+"], 10);\n",s:"(\\d{2})"};case"s":return{g:1,c:"s = parseInt(results["+a+"], 10);\n",s:"(\\d{2})"};case"O":return{g:0,c:null,s:"[+-]\\d{4}"};case"T":return{g:0,c:null,s:"[A-Z]{3}"};case"Z":return{g:0,c:null,s:"[+-]\\d{1,5}"};case".":return{g:0,c:null,s:"\\."};default:return{g:0,c:null,s:String.escape(b)}}};Date.prototype.getTimezone=function(){return this.toString().replace(/^.*? ([A-Z]{3}) [0-9]{4}.*$/,"$1").replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/,"$1$2$3")};Date.prototype.getGMTOffset=function(){return(this.getTimezoneOffset()>0?"-":"+")+String.leftPad(Math.floor(this.getTimezoneOffset()/60),2,"0")+String.leftPad(this.getTimezoneOffset()%60,2,"0")};Date.prototype.getDayOfYear=function(){var a=0;Date.daysInMonth[1]=this.isLeapYear()?29:28;for(var b=0;b<this.getMonth();++b){a+=Date.daysInMonth[b]}return a+this.getDate()-1};Date.prototype.getWeekOfYear=function(){var b=this.getDayOfYear()+(4-this.getDay());var a=new Date(this.getFullYear(),0,1);var c=(7-a.getDay()+4);document.write(c);return String.leftPad(((b-c)/7)+1,2,"0")};Date.prototype.isLeapYear=function(){var a=this.getFullYear();return((a&3)==0&&(a%100||(a%400==0&&a)))};Date.prototype.getFirstDayOfMonth=function(){var a=(this.getDay()-(this.getDate()-1))%7;return(a<0)?(a+7):a};Date.prototype.getLastDayOfMonth=function(){var a=(this.getDay()+(Date.daysInMonth[this.getMonth()]-this.getDate()))%7;return(a<0)?(a+7):a};Date.prototype.getDaysInMonth=function(){Date.daysInMonth[1]=this.isLeapYear()?29:28;return Date.daysInMonth[this.getMonth()]};Date.prototype.getSuffix=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th"}};Date.prototype.isWeekend=function(){return this.getDay()==6||this.getDay()==0};String.escape=function(a){return a.replace(/('|\\)/g,"\\$1")};String.leftPad=function(d,b,c){var a=new String(d);if(c==null){c=" "}while(a.length<b){a=c+a}return a};Date.daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];Date.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];Date.dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];Date.y2kYear=50;Date.monthNumbers={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};Date.patterns={ISO8601LongPattern:"Y-m-d H:i:s",ISO8601ShortPattern:"Y-m-d",ShortDatePattern:"n/j/Y",FiShortDatePattern:"j.n.Y",FiWeekdayDatePattern:"D j.n.Y",FiWeekdayDateTimePattern:"D j.n.Y k\\lo G:i",LongDatePattern:"l, F d, Y",FullDateTimePattern:"l, F d, Y g:i:s A",MonthDayPattern:"F d",ShortTimePattern:"g:i A",LongTimePattern:"g:i:s A",SortableDateTimePattern:"Y-m-d\\TH:i:s",UniversalSortableDateTimePattern:"Y-m-d H:i:sO",YearMonthPattern:"F, Y"};Date.parseTime=function parseTime(f){var c=b(f.replace(/:|,/i,"."));var e=[parseInt(c[0],10),parseInt(c[1],10)];return(a(e[0])&&d(e[1]))?e:null;function b(g){if(g.indexOf(".")!=-1){return g.split(".")}switch(g.length){case 4:return[g.slice(0,2),g.slice(2,4)];case 3:return[g.slice(0,1),g.slice(1,3)];case 2:return[g,0];default:return[-1,-1]}}function d(g){return !isNaN(g)&&g>=0&&g<=59}function a(g){return !isNaN(g)&&g>=0&&g<=23}};Date.hoursAndMinutes=function(a,b){return(Math.round((a+b/60)*100)/100).toString()};window.DATE_LOCALE_FI={init:function(){Date.monthNames=["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu"];Date.dayNames=["su","ma","ti","ke","to","pe","la"];Date.yearsLabel=function(a){return a+" "+(a=="1"?"vuosi":"vuotta")};Date.monthsLabel=function(a){return a+" "+(a=="1"?"kuukausi":"kuukautta")};Date.daysLabel=function(a){return a+" "+(a=="1"?"päivä":"päivää")};Date.hoursLabel=function(b,c){var a=Date.hoursAndMinutes(b,c).replace(".",",");return a+" "+(a=="1"?"tunti":"tuntia")}},shortDateFormat:"j.n.Y",weekDateFormat:"D j.n.Y",dateTimeFormat:"D j.n.Y k\\lo G:i",firstWeekday:Date.MONDAY};window.DATE_LOCALE_EN={init:function(){Date.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];Date.dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];Date.yearsLabel=function(a){return a+" "+(a=="1"?"Year":"Years")};Date.monthsLabel=function(a){return a+" "+(a=="1"?"Months":"Months")};Date.daysLabel=function(a){return a+" "+(a=="1"?"Day":"Days")};Date.hoursLabel=function(b,c){var a=Date.hoursAndMinutes(b,c);return a+" "+(a=="1"?"Hour":"Hours")}},shortDateFormat:"n/j/Y",weekDateFormat:"D n/j/Y",dateTimeFormat:"D n/j/Y G:i",firstWeekday:Date.SUNDAY};window.DATE_LOCALE_AU={init:function(){Date.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];Date.dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];Date.yearsLabel=function(a){return a+" "+(a=="1"?"Year":"Years")};Date.monthsLabel=function(a){return a+" "+(a=="1"?"Months":"Months")};Date.daysLabel=function(a){return a+" "+(a=="1"?"Day":"Days")};Date.hoursLabel=function(b,c){var a=Date.hoursAndMinutes(b,c);return a+" "+(a=="1"?"Hour":"Hours")}},shortDateFormat:"j/n/Y",weekDateFormat:"D j/n/Y",dateTimeFormat:"D j/n/Y G:i",firstWeekday:Date.SUNDAY};function DateRange(c,b){var a=false;if(!c||!b){throw ("two dates must be specified, date1="+c+", date2="+b)}this.start=c.compareTo(b)>0?b:c;this.end=c.compareTo(b)>0?c:b;this._days=0;this._hours=0;this._minutes=0;this._valid=true}DateRange.prototype={_setDaysHoursAndMinutes:function(){if(this._hasTimes){var a=parseInt((this.end.getTime()-this.start.getTime()));this._days=parseInt(a/Date.DAY);a=a-(this._days*Date.DAY);this._hours=parseInt(a/Date.HOUR);a=a-(this._hours*Date.HOUR);this._minutes=parseInt(a/Date.MINUTE)}},_dateWithTime:function(a,c){var b=a.clone();b.setHours(c[0]);b.setMinutes(c[1]);b.setMilliseconds(0);return b},hours:function(){return this._hours},minutes:function(){return this._minutes},hasDate:function(a){return a.isBetweenDates(this.start,this.end)},isValid:function(){return this._valid&&this.end.getTime()-this.start.getTime()>=0},days:function(){if(this._hasTimes){return this._days}else{return Math.round(this.start.distanceInDays(this.end)+1)}},shiftDays:function(a){return new DateRange(this.start.plusDays(a),this.end.plusDays(a))},expandTo:function(b){var a=this.start.clone();var c=this.end.clone();if(b.compareTo(this.start)<0){a=b}else{if(b.compareTo(this.end)>0){c=b}}return new DateRange(a,c)},expandDaysTo:function(a){return new DateRange(this.start,this.start.plusDays(a-1))},hasValidSize:function(a){return a<0||this.days()>=a},hasValidSizeAndEndsOnWorkWeek:function(a){return this.hasValidSize(a)&&this.hasEndsOnWeekend()},and:function(a){var c=this.start.compareTo(a.start)>0?this.start:a.start;var b=this.end.compareTo(a.end)>0?a.end:this.end;if(c.compareTo(b)<0){return new DateRange(c,b)}else{return DateRange.emptyRange()}},isInside:function(a){return this.start.compareTo(a.start)>=0&&this.end.compareTo(a.end)<=0},hasEndsOnWeekend:function(){return this.start.isWeekend()||this.end.isWeekend()},setTimes:function(d,c){var b=Date.parseTime(d);var a=Date.parseTime(c);if(b&&a){this._valid=true;this._hasTimes=true;this.start=this._dateWithTime(this.start,b);this.end=this._dateWithTime(this.end,a);this._setDaysHoursAndMinutes()}else{this._valid=false}return this._valid},clone:function(){return new DateRange(this.start,this.end)},toString:function(a){if(this._hasTimes){return Date.daysLabel(this.days())+" "+Date.hoursLabel(this.hours(),this.minutes())}else{return this.start.dateFormat(a.shortDateFormat)+" - "+this.end.dateFormat(a.shortDateFormat)}},printDefiningDuration:function(){var b=parseInt(this.days()/360,10);if(b>0){return Date.yearsLabel(b)}var a=parseInt(this.days()/30,10);if(a>0){return Date.monthsLabel(a)}return Date.daysLabel(this.days())},isPermittedRange:function(c,a,b){return this.hasValidSize(c)&&(!(a&&this.hasEndsOnWeekend()))&&this.isInside(b)},shiftInside:function(b){if(this.days()>b.days()){return DateRange.emptyRange()}var c=this.start.distanceInDays(b.start);var a=this.end.distanceInDays(b.end);if(c>0){return this.shiftDays(c)}if(a<0){return this.shiftDays(a)}return this}};DateRange=$.extend(DateRange,{emptyRange:function(){function a(){this.start=null;this.end=null;this.days=function(){return 0};this.shiftDays=$.noop;this.hasDate=function(){return false};this.clone=function(){return DateRange.emptyRange()}}return new a()},parse:function(c,b,a){return new DateRange(Date.parseDate(c,a),Date.parseDate(b,a))},rangeWithMinimumSize:function(g,f,b,e){if(c()){var a=g.expandDaysTo(f);if(b&&a.hasEndsOnWeekend()){var d=a.shiftDays(h(a.end.getDay())).shiftInside(e);while(!d.isPermittedRange(f,b,e)||d.end.compareTo(e.end)>0){if(!d.isPermittedRange(f,false,e)){return DateRange.emptyRange()}d=d.shiftDays(1)}a=d}if(!a.isPermittedRange(f,false,e)){return DateRange.emptyRange()}return a}return g;function c(){return f&&g.days()<=f}function h(i){return -((i+1)%7+1)}}});(function(a){a.fn.continuousCalendar=function(b){return this.each(function(){c.call(a(this),b)});function c(W){a(this).addClass("continuousCalendarContainer").append("&nbsp;");var O={weeksBefore:26,weeksAfter:26,firstDate:null,lastDate:null,startField:a("input.startDate",this),endField:a("input.endDate",this),isPopup:false,selectToday:false,locale:DATE_LOCALE_EN,disableWeekends:false,disabledDates:null,minimumRange:-1,selectWeek:false,fadeOutDuration:0,callback:a.noop};var am=a.extend(O,W);var F={CREATE_OR_RESIZE:"create",MOVE:"move",NONE:"none"};am.locale.init();var aw=p(am.startField);var ab=p(am.endField);if(am.selectToday){var P=Date.NOW;var g=B(P);aw=P;ab=P;l(g);ad(g)}var N=(aw||Date.NOW).getFirstDateOfWeek(am.locale.firstWeekday);var ae=this,ag=[],az=[],ao={},f=null,I,R,ax,h,C,G=F.NONE,E,e,U=true,D,m;ar();function ar(){m=a.extend(ai(am.isPopup),ap(Z()));ax=aw&&ab?new DateRange(aw,ab):DateRange.emptyRange();h=ax.clone();var aD=am.firstDate?Date.parseDate(am.firstDate,am.locale.shortDateFormat):N.plusDays(-(am.weeksBefore*7));var aC=am.lastDate?Date.parseDate(am.lastDate,am.locale.shortDateFormat):N.plusDays(am.weeksAfter*7+6);am.disabledDates=am.disabledDates?ak(am.disabledDates):{};am.fadeOutDuration=parseInt(am.fadeOutDuration,10);C=new DateRange(aD,aC);E=u();E.click(function(aE){aE.stopPropagation()});if(a(".startDateLabel",ae).isEmpty()){aq(ae,m)}m.initUI();m.showInitialSelection()}function aa(){if(e){return}var aC=a("<table>").addClass("calendarHeader").append(av());D=a("<table>").addClass("calendarBody").append(aA());e=a("<div>").addClass("calendarScrollContent").append(D);E.append(aC).append(e);ag=a("td.date",ae).get();m.initState();m.addRangeLengthLabel();o();R=a("th.month",aC);e.scroll(s);if(!am.isPopup){s();M()}m.initEvents()}function ak(aD){var aC={};a.each(aD.split(" "),function(aF,aE){aC[Date.parseDate(aE,am.locale.shortDateFormat)]=true});return aC}function ap(aE){var aC={showInitialSelection:w,initEvents:function(){L(ae,D);an();ae.data("calendarRange",ax);ay(ax)},addRangeLengthLabel:function(){if(a(".rangeLengthLabel",ae).isEmpty()){var aF=a('<div class="label"><span class="rangeLengthLabel"></span></div>');a(".continuousCalendar",ae).append(aF)}},addEndDateLabel:function(aF){aF.append('<span class="separator"> - </span>').append('<span class="endDateLabel"></span>')}};var aD={showInitialSelection:function(){if(am.startField.val()){k(Date.parseDate(am.startField.val(),am.locale.shortDateFormat).dateFormat(am.locale.weekDateFormat))}},initEvents:function(){al();var aF=aw&&aw.dateFormat("Ymd");if(ao[aF]){K(ao[aF]).addClass("selected")}ae.data("calendarRange",aw);ay(aw)},addRangeLengthLabel:a.noop,addEndDateLabel:a.noop};return aE?aC:aD}function ai(aC){var aE={initUI:function(){E.addClass("popup").hide();var aF=a('<a href="#" class="calendarIcon">'+Date.NOW.getDate()+"</a>").click(z);ae.prepend("<div></div>");ae.prepend(aF)},initState:a.noop,getContainer:function(aF){return a("<div>").addClass("popUpContainer").append(aF)},addCloseButton:function(aF){var aG=a('<th><a href="#"><span>close</span></a></th>');a("a",aG).click(z);aF.append(aG)},close:function(aF){z.call(aF)},addDateLabelBehaviour:function(aF){aF.addClass("clickable");aF.click(z)}};var aD={initUI:aa,initState:x,getContainer:function(aF){return aF},addCloseButton:a.noop,close:a.noop,addDateLabelBehaviour:a.noop};return aC?aE:aD}function o(){var aC=Date.NOW.dateFormat("Ymd");if(ao[aC]){K(ao[aC]).addClass("today").wrapInner("<div>")}}function u(){var aC=a(".continuousCalendar",ae);if(aC.exists()){return aC}else{var aD=a("<div>").addClass("continuousCalendar");ae.append(m.getContainer(aD));return aD}}function aq(aC,aE){var aD=a('<div class="label"><span class="startDateLabel"></span></div>');aE.addEndDateLabel(aD);aC.prepend(aD);aE.addDateLabelBehaviour(aD.children())}function L(aD,aC){a("span.rangeLengthLabel",aD).text(Date.daysLabel(ax.days()));aC.addClass(am.selectWeek?"weekRange":"freeRange");aC.mousedown(y).mouseover(ah).mouseup(v);aB(aC.get(0))}function M(){var aC=a(".selected, .today",e).get(0);if(aC){e.scrollTop(aC.offsetTop-(e.height()-aC.offsetHeight)/2)}}function s(){var aC=a(".calendarScrollContent",ae).get(0);var aF=a("table",aC).get(0);var aD=parseInt(aC.scrollTop/I);var aE=d(aF.rows[aD].cells[2]);R.text(aE.getFullYear())}function av(){var aD=a("<tr>").append(aC());aD.append(a('<th class="week">&nbsp;</th>'));a(Date.dayNames).each(function(aF){var aE=a("<th>").append(Date.dayNames[(aF+am.locale.firstWeekday)%7].substr(0,2)).addClass("weekDay");aD.append(aE)});m.addCloseButton(aD);return a("<thead>").append(aD);function aC(){return a("<th>").addClass("month").append(N.getFullYear())}}function x(){J();M()}function J(){I=parseInt(D.height()/a("tr",D).size())}function z(){aa();if(E.is(":visible")){E.fadeOut(am.fadeOutDuration);a(document).unbind("click.continuousCalendar")}else{E.show();if(U){J();s();U=false}M();a(document).bind("click.continuousCalendar",z)}return false}function aA(){var aD=C.start.getFirstDateOfWeek(am.locale.firstWeekday);var aC=true;var aE=[];while(aD.compareTo(C.end)<=0){S(aE,aD.clone(),aC);aC=false;aD=aD.plusDays(7)}return"<tbody>"+aE.join("")+"</tbody>"}function S(aG,aD,aC){aG.push("<tr>");aG.push(t(aD,aC));aG.push(Y(aD));for(var aF=0;aF<7;aF++){var aE=aD.plusDays(aF);aG.push(au(aE))}aG.push("</tr>")}function au(aC){var aD='<td class="'+A(aC)+'" date-cell-index="'+az.length+'">'+aC.getDate()+"</td>";ao[aC.dateFormat("Ymd")]=az.length;az.push(aC);return aD}function t(aD,aC){var aE='<th class="month '+ac(aD);if(aC||aD.getDate()<=7){aE+=' monthName">';aE+=Date.monthNames[aD.getMonth()]}else{aE+='">';if(aD.getDate()<=7*2&&aD.getMonth()==0){aE+=aD.getFullYear()}}return aE+"</th>"}function Y(aC){return'<th class="week '+ac(aC)+'">'+aC.getWeekInYear("ISO")+"</th>"}function A(aC){return a.trim(["date",ac(aC),n(aC),q(aC),af(aC)].sort().join(" "))}function ac(aC){return aC.isOddMonth()?"odd":""}function n(aC){var aD=am.disableWeekends&&aC.isWeekend();var aE=am.disabledDates[aC.getOnlyDate()];var aF=!C.hasDate(aC);return aF||aD||aE?"disabled":""}function q(aC){return aC.isToday()?"today":""}function af(aC){return aC.getDay()==0?"holiday":""}function al(){a(".date",ae).bind("click",function(){var aD=a(this);if(aD.hasClass("disabled")){return}a("td.selected",ae).removeClass("selected");aD.addClass("selected");var aC=d(aD.get(0));am.startField.val(aC.dateFormat(am.locale.shortDateFormat));k(aC.dateFormat(am.locale.weekDateFormat));m.close(this);ay(aC)})}function X(){ax=new DateRange(f,f)}function y(aG){var aF=aG.target;if(aH(aG)){ax=aE(aG);return}G=F.CREATE_OR_RESIZE;f=d(aF);if(f.equalsOnlyDate(ax.end)){f=ax.start;return}if(f.equalsOnlyDate(ax.start)){f=ax.end;return}if(ax.hasDate(f)){G=F.MOVE;return}if(aD(aF)){X()}function aD(aI){return H(aI)&&aj(aI)}function aH(aI){if(am.selectWeek){return aD(aI.target)||j(aI.target)}else{return j(aI.target)||T(aI.target)||aI.shiftKey}}function aE(aL){var aK=aL.target;if((am.selectWeek&&aD(aK))||j(aK)){G=F.NONE;var aI=d(a(aK).parent().children(".date").get(0));return aC(aI)}else{if(T(aK)){G=F.NONE;var aJ=d(a(aK).siblings(".date").get(0));return new DateRange(aJ.firstDateOfMonth(),aJ.lastDateOfMonth())}else{if(aL.shiftKey){if(ax.days()>0&&aD(aK)){G=F.NONE;ax=ax.expandTo(d(aK));return ax}}}}return ax}function aC(aJ){var aI=aJ;var aK=aJ.plusDays(6);if(am.disableWeekends){aI=aJ.withWeekday(Date.MONDAY);aK=aJ.withWeekday(Date.FRIDAY)}return new DateRange(aI,aK).and(C)}}function ah(aD){if(G==F.NONE){return}var aC=d(aD.target);({move:function(){var aE=f.distanceInDays(aC);var aF=ax.shiftDays(aE).and(C);if(r(aF)){f=aC;ax=aF}},create:function(){var aE=new DateRange(f,aC);if(aj(aD.target)&&r(aE)){ax=aE}}})[G]();an()}function r(aC){return aC.isPermittedRange(am.minimumRange,am.disableWeekends,C)}function v(){G=F.NONE;an();at()}function an(){ax=DateRange.rangeWithMinimumSize(ax,am.minimumRange,am.disableWeekends,C);V(ax);a("span.rangeLengthLabel",ae).text(Date.daysLabel(ax.days()))}function V(aC){a("td.selected",ae).removeClass("selected").removeClass("rangeStart").removeClass("rangeEnd");Q(aC);h=aC.clone()}function Q(aC){if(aC.days()==0){return}var aF=ao[aC.start.dateFormat("Ymd")];var aE=ao[aC.end.dateFormat("Ymd")];for(var aD=aF;aD<=aE;aD++){i(aD,aC.start,aC.end)}}function i(aF,aH,aC){var aE=az[aF];var aG=K(aF).get(0);var aD=[A(aE)];if(aE.equalsOnlyDate(aC)){aD.push("selected rangeEnd")}else{if(aE.equalsOnlyDate(aH)){aD.push("selected rangeStart")}else{if(aE.isBetweenDates(aH,aC)){aD.push("selected")}}}aG.className=aD.join(" ")}function at(){var aD=B(ax.start);var aC=B(ax.end);ae.data("calendarRange",ax);l(aD);ad(aC);w();if(am.selectWeek){m.close(a("td.selected",ae).first())}ay(ax)}function w(){if(ax.start&&ax.end){var aC=am.locale.weekDateFormat;a("span.startDateLabel",ae).text(ax.start.dateFormat(aC));a("span.endDateLabel",ae).text(ax.end.dateFormat(aC));a("span.separator",ae).show()}else{a("span.separator",ae).hide()}}function p(aC){return aC.length>0&&aC.val().length>0?Date.parseDate(aC.val(),am.locale.shortDateFormat):null}function aB(aC){if(a.browser.mozilla){a(aC).css("MozUserSelect","none")}else{if(a.browser.msie){a(aC).bind("selectstart",function(){return false})}else{a(aC).mousedown(function(){return false})}}}function ay(aC){am.callback.call(ae,aC);ae.trigger("calendarChange",aC)}function H(aC){return a(aC).hasClass("date")}function j(aC){return a(aC).hasClass("week")}function T(aC){return a(aC).hasClass("month")}function aj(aC){return !a(aC).hasClass("disabled")}function d(aC){return az[a(aC).attr("date-cell-index")]}function K(aC){return a(ag[aC])}function l(aC){am.startField.val(aC)}function ad(aC){am.endField.val(aC)}function B(aC){return aC.dateFormat(am.locale.shortDateFormat)}function k(aC){a("span.startDateLabel",ae).text(aC)}function Z(){return am.endField&&am.endField.length>0}}};a.fn.calendarRange=function(){return a(this).data("calendarRange")};a.fn.exists=function(){return this.length>0};a.fn.isEmpty=function(){return this.length==0}})(jQuery);