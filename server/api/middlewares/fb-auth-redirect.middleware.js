import passport from 'passport';

import getClientURL from '../../helpers/client-url.helper';

export default passport.authenticate('facebook', {
  failureRedirect: `${getClientURL()}/login`,
});
