export default async (req, _, next) => {
  if (req.body.mobile) {
    req.body.mobile = req.body.mobile.replace(/[\s\-\(\)]/g, "");
  }

  next();
};
