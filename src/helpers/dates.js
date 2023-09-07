

const dateToISO = (date) => {
    console.log(typeof date);
    return date.toISOString();
}

const isSameDay = (date1, date2) => {
    return date1 > date2;
}


export {dateToISO, isSameDay};