import { decryptJwt } from '../auth.helper';

module.exports = function () {
  return {
    authenticate: async function (req, h) {
      let token;
      console.log(req.headers.authorization);
      try {
        token = decryptJwt(
          req.headers.authorization,
          req.server.app.jwtAccessTokenSecret
        );
        // Check Browser-Ids
        // let tokenBrowserId = decode.browserId.match(/:(.+):/);
        // let requestInfoId = req.info.id.match(/:(.+):/);
        // if (tokenBrowserId[0] !== requestInfoId[0])
        //   return h.unauthenticated('Wrong Session', [token]);

        // if (!decode.scope.includes('user') && !decode.scope.includes('admin'))
        //   return h.response('Incorrect role').code(403).takeover();
      } catch (err) {
        return h.response('Could not verify JWT').code(409).takeover();
      }

      return h.authenticated({
        credentials: token,
      });
    },
  };
};
