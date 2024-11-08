export function bigIntMiddleware() {
  return (req, res, next) => {
    const originalJson = res.json;
    res.json = function (data) {
      const transformedData = JSON.parse(
        JSON.stringify(data, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      );
      return originalJson.call(this, transformedData);
    };
    next();
  };
}
