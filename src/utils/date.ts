import {formatInTimeZone} from 'date-fns-tz';
const formatDateTime = (dateTimeString: string) => {
    // 24 hour system with IST timezone
    const timeZone = 'Asia/Kolkata';
    return formatInTimeZone(new Date(dateTimeString).toISOString(), timeZone, 'dd MMM yyyy, HH:mm');
};

export { formatDateTime };