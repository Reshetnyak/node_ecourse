export const parseQuery = () => (req, res, next) => {
    req.parsedQuery = req.query;
    next();
}
