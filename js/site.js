function displayMessage() {
    // get the text out of our <input> and assign it to a variable
    let msg = document.getElementById('message').value;

    // alert('Hello Guardian Cohort!')
    Swal.fire(
        {
            icon: 'success',
            backdrop: false,
            title: '<strong>APP NAME</strong>',
            text: msg, // <---- replace this text with that variable
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        }
    );
}