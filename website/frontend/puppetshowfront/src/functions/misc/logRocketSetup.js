import LogRocket from "logrocket";
import logrocket_settings from "../../constants/logrocket_settings.json";
import logrocket_code from "../../constants/logrocket_code.json";
LogRocket.init(logrocket_code.logrocket_code, logrocket_settings);
// if (localStorage.getItem("user") !== null) {
//   LogRocket.identify(localStorage.getItem("user").uuid, {
//     username: localStorage.getItem("user").discord_username,
//     snowflake: localStorage.getItem("user").discord_snowflake,
//   });
// }
