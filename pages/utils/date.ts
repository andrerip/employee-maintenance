
function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getUTCDate();
    return `${month} ${day}, ${year}`;
}


// return a string in a format like "2y - 1m - 3d"
function timePassed(dateString: string) {
    const today = new Date();
    const hireDate = new Date(dateString);
    const timeDiff = today.getTime() - hireDate.getTime();
    const yearDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    const monthDiff = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const dayDiff = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    return `${yearDiff}y - ${monthDiff}m - ${dayDiff}d`;
}

export { formatDate, timePassed };