export default function authHeader() {
    const localUser:any = localStorage.getItem('user');
    const user = JSON.parse(localUser);

    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
}