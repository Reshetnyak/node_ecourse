const parseQueryMiddleware = (req, res, next) => {
    req.parsedQuery = req.query;
    next();
};

export const parseQuery = app => {
    app.use(parseQueryMiddleware);
}
