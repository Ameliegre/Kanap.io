const orderId = new URL(window.location.href).searchParams.get("orderId");

const confirmation = document.getElementById("orderId")
confirmation.innerText = orderId