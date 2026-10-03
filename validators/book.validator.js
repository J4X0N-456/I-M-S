const { body, validationResult, param } = require("express-validator");



const createBookValidation = [
  body("bookName")
    .notEmpty()
    .withMessage((value, { req }) => req.t("bookNameRequired"))
    .isLength({ min: 5, max: 100 })
    .withMessage((value, { req }) => req.t("bookNameLengthValidation")),

  body("price")
    .notEmpty()
    .withMessage((value, { req }) => req.t("priceRequired"))
    .isFloat({ min: 1, max: 1000 })
    .withMessage((value, { req }) => req.t("priceRangeValidation")),

  body("countInStock")
    .notEmpty()
    .withMessage((value, { req }) => req.t("stockCountRequired"))
    .isInt({ min: 1, max: 255 })
    .withMessage((value, { req }) => req.t("stockCountRangeValidation")),

  body("image")
    .notEmpty()
    .withMessage((value, { req }) => req.t("imageRequired"))
    .isURL()
    .withMessage((value, { req }) => req.t("imageUrlValidation"))
];


  const updateBookValidation =  [
      body("bookName")
        .optional()
        .isLength({ min: 5, max: 100 })
        .withMessage((value, { req }) => req.t("bookNameLengthValidation")),
      body("price")
      .optional()
      .isFloat({ min: 1, max: 1000 }).withMessage((value, { req }) => req.t("priceRangeValidation")),
      body("countInStock")
        .optional()
        .isInt({ min: 1, max: 255 })
        .withMessage((value, { req }) => req.t("stockCountRangeValidation")),
      body("image")
        .optional()
        .isURL()
        .withMessage((value, { req }) => req.t("imageUrlValidation"))
    ];

    const idValidation = [param("id").isMongoId().withMessage((value, { req }) => req.t("bookIDValidation"))]



    const handleValidationErrors = (req, res, next) => {
          const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
    }

    module.exports ={
      createBookValidation,
      updateBookValidation,
      idValidation,
      handleValidationErrors
    }