import CASAuthentication from 'cas-authentication';
const cas = new CASAuthentication({
    cas_url     : 'https://cas.lu.se/cas',
    service_url : 'http://localhost:3000',
		cas_version     : '2.0',
		renew           : false,
    is_dev_mode     : false,
    dev_mode_user   : '',
    dev_mode_info   : {},
    session_name    : 'cas_user',
    session_info    : 'cas_userinfo',
    destroy_session : false
});
export default cas;
