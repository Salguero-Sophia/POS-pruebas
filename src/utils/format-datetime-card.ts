export const formatDatetimaCard = (datetime: Date) => {
    const date = new Date(datetime);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${year}`;
}