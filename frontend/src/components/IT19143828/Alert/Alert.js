import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import './custom.css';

alertify.defaults.notifier.position = 'top-center';
alertify.defaults.transition = 'fade';

export default function setAlert(Message) {
	alertify.success(Message);
}
export function setAlerDanger(Message) {
	alertify.error(Message);
}
export function setAlerWarning(Message) {
	alertify.warning(Message);
}
