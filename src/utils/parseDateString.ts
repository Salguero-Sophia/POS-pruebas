export const parseDateString = (dateString: string): Date => {
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10) - 1; // Los meses en JavaScript son base 0
    const day = parseInt(dateString.substring(6, 8), 10);
  
    return new Date(year, month, day);
  };