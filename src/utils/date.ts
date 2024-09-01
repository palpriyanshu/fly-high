import { format } from 'date-fns-tz';
const formatDateTime = (dateTimeString: string) => {
    // 24 hour system with IST timezone
    const timeZone = 'Asia/Kolkata';
    return format(new Date(dateTimeString).toISOString(), 'dd MMM yyyy, HH:mm', { timeZone });
};

export { formatDateTime };