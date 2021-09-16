var birthDate = document.querySelector("#birth-date");
var check = document.querySelector("#btn");
var outputText = document.querySelector("#result");
var outputnext = document.querySelector("#resultnext");
var yasimg = document.querySelector("#yasimg");
var oopsimg = document.querySelector("#oopsimg");


hide(yasimg);
hide(oopsimg);


function show(input, typ) {
    input.style.display = typ;
}

function hide(input) {
    input.style.display = "none";
}

function reversestr(s) {
    var rev = s.split('').reverse().join('');
    return rev;
}

function ispalindrome(s) {
    var rev = reversestr(s);
    return s === rev;
}

function convertDate(date) {
    var dates = { day: '', month: '', year: '' };
    if (date.day < 10) {
        dates.day = "0" + date.day;
    } else {
        dates.day = date.day.toString();
    }
    if (date.month < 10) {
        dates.month = "0" + date.month;
    } else {
        dates.month = date.month.toString();
    }

    dates.year = date.year.toString();

    return dates;

}

function getDatesInFormat(date) {
    var dates = convertDate(date);
    var ddmmyyyy = dates.day + dates.month + dates.year;
    var mmddyyyy = dates.month + dates.day + dates.year;
    var yyyymmdd = dates.year + dates.month + dates.day;
    var ddmmyy = dates.day + dates.month + dates.year.slice(-2);
    var mmddyy = dates.month + dates.day + dates.year.slice(-2);
    var yymmdd = dates.year.slice(-2) + dates.month + dates.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];

}

function checkPalindromes(date) {
    var listP = getDatesInFormat(date);

    var isP = false;
    for (var i = 0; i < listP.length; i++) {
        if (ispalindrome(listP[i])) {
            isP = true;
            break;
        }
    }
    return isP;
}

function checkleap(year) {
    if (year % 400 == 0) {
        return true;
    }
    if (year % 100 == 0) {
        return true;
    }
    if (year % 4 == 0) {
        return true;
    }
    return false;

}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInM = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (checkleap(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInM[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }

    date.day = day;
    date.month = month;
    date.year = year;

}



function getNextPalinDate(date) {
    var ctr = 0;
    getNextDate(date);
    console.log(date);
    while (1) {
        ctr++;
        var ispa = checkPalindromes(date);

        if (ispa) {
            break;
        }
        getNextDate(date);
    }
    return [ctr, date];
}




function getprevDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
    var daysInM = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 3) {
        if (checkleap(year)) {
            if (day === 0) {
                day = 29;
                month--;
            }
        } else {
            if (day === 0) {
                day = 28;
                month--;
            }
        }
    } else {
        if (day === 0) {
            day = daysInM[month - 2];
            month--;
        }
    }

    if (month === 0) {
        day = daysInM[month - 1]
        month = 12;
        year--;
    }
    date.day = day;
    date.month = month;
    date.year = year;
}

function getPrePalinDate(date) {
    var c = 0;
    getprevDate(date);
    while (1) {
        c++;
        var isPalind = checkPalindromes(date, c);
        if (isPalind) {
            break;
        }
        getprevDate(date);
    }
    return [c, date];
}

function comp(date) {
    var a = getNextPalinDate(date);
    var b = getPrePalinDate(date);
    if (a[0] <= b[0]) {
        return a;
    } else {
        return b;
    }
}
check.addEventListener("click", function check() {
    var strbday = birthDate.value;
    if (strbday != "") {
        var listDates = strbday.split('-');
        var date = {
            day: Number(listDates[2]),
            month: Number(listDates[1]),
            year: Number(listDates[0]),
        }
        console.log(date);
        var isPal = checkPalindromes(date);
        if (isPal) {
            outputText.innerText = "Your Birthday is Palindrome"
            show(yasimg, "block");
            hide(oopsimg);
        } else {
            var [c, nex] = comp(date);

            outputText.innerText = "Oops! Your Birthday is not a Palindrome date! " + "\n" + "You missed  it by " + c + " days. " + "\n" + "Nearest date was " + nex.day + "-" + nex.month + "-" + nex.year;
            show(oopsimg, "block");
            hide(yasimg);
        }

    }
})