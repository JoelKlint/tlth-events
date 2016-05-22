import CASAuthentication from 'cas-authentication';
const NODE_ENV = process.env.NODE_ENV;
const cas = new CASAuthentication({
    cas_url     : 'https://cas.lu.se/cas',
    service_url : 'http://localhost:3000',
		cas_version     : '2.0',
		renew           : false,
    is_dev_mode     : NODE_ENV === 'test' ? true : false,
    dev_mode_user   : 'testuser',
    dev_mode_info   : {},
    session_name    : 'cas_user',
    session_info    : 'cas_userinfo',
    destroy_session : false
});
export default cas;
