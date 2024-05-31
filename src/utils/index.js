

function postPublishedDay(publishDate) {
    const publishDatetime = new Date(publishDate);
    const currentDatetime = new Date();
    const timeDifference = currentDatetime - publishDatetime;
    const hours = Math.round(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursText = hours === 1 ? 'hour' : 'hours';
    const daysText = days === 1 ? 'day' : 'days';
    if (hours < 24) {
        return `${hours} ${hoursText} ago`
    } else {
        const formattedDate = publishDatetime.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',

        });

        return formattedDate
    }
}

export { postPublishedDay }