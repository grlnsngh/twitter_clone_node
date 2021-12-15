export const sendCustomResponse = (
  res,
  statusCode,
  success,
  data = {},
  message
) => {
  return res.status(statusCode).send({ success, data, message });
};
