import { toast } from 'react-toastify';


function showSuccess(msg) {
    toast.success(msg);
}
function showInfo(msg) {
    toast.info(msg)
}
function showWarning(msg) {
    toast.warning(msg);
}

function handleError(err) {
    console.log("Hnadle error is >>", err);
    debugger;
    let errMsg = "Something went wrong !!!";
    if (err && err.response.data) {
        errMsg = err.response.data.msg;
    }

    toast.error(errMsg);
}

export const notify={
    showSuccess,
    showInfo,
    showWarning,
    handleError
}