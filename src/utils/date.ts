import { format } from "date-fns";

const formatDateTime = (dateTimeString: string) => {
    // 24 hour system with IST timezone
    return format(new Date(dateTimeString), "dd MMM yyyy, HH:mm");
};

export { formatDateTime };