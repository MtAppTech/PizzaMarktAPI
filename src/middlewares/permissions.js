"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | MtAppTEch
------------------------------------------------------- */
// Middleware: permissions

module.exports = {
    isLogin: async (req, res, next) => {
      if (req.user && req.user.isActive) {
        next();
      } else {
        res.errorStatusCode = 403;
        throw new Error("NoPermission: You must login.");
      }
    },
    isAdmin: async (req, res, next) => {
      if (req.user && req.user.isActive && req.user.isAdmin) {
        next();
      } else {
        res.errorStatusCode = 403;
        throw new Error("NoPermission: You must login and to be Admin.");
      }
    },
  };