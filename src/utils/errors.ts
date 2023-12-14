const createNotFoundError: Object = (itemName: string): Error => {
    const error: any = new Error(`${itemName} not found`);
    error.code = 404;
    return error;
}