const fechaObjetivo = new Date("2023-09-14T00:00:00"); // Reemplaza con tu fecha objetivo

function actualizarNumero(elementId, valor) {
    const elemento = document.getElementById(elementId);
    animateNumberFlip(elemento, valor);
}

function animateNumberFlip(element, value) {
    element.classList.add("flipping");
    setTimeout(() => {
        element.textContent = value;
        element.classList.remove("flipping");
    }, 500);
}

function actualizarCuentaRegresiva() {
    const ahora = new Date();
    const diferenciaTiempo = fechaObjetivo - ahora;

    const meses = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24 * 30));
    const dias = Math.floor((diferenciaTiempo % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenciaTiempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenciaTiempo % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenciaTiempo % (1000 * 60)) / 1000);

    // Calcula las horas laborables
    const horaInicioLaboral = 9;
    const horaFinLaboral = 14;
    const horasLaboralesPorDia = horaFinLaboral - horaInicioLaboral;
    const totalDiasLaborables = contarDiasLaborables(ahora, fechaObjetivo);
    const totalHorasLaborables = totalDiasLaborables * horasLaboralesPorDia;

    let horasClaseFaltantes = totalHorasLaborables - 15;
    if (ahora.getHours() >= horaInicioLaboral && ahora.getHours() <= horaFinLaboral) {
        horasClaseFaltantes -= (horaFinLaboral - ahora.getHours());
    }

    actualizarNumero("months", meses);
    setTimeout(() => actualizarNumero("days", dias), 100);
    setTimeout(() => actualizarNumero("hours", horas), 200);
    setTimeout(() => actualizarNumero("minutes", minutos), 300);
    setTimeout(() => actualizarNumero("seconds", segundos), 400);
    setTimeout(() => actualizarNumero("workHours", horasClaseFaltantes), 500);
}

function contarDiasLaborables(fechaInicio, fechaFin) {
    const milisegundosPorDia = 24 * 60 * 60 * 1000;
    let contador = 0;

    while (fechaInicio <= fechaFin) {
        if (fechaInicio.getDay() !== 0 && fechaInicio.getDay() !== 6) {
            contador++;
        }
        fechaInicio = new Date(fechaInicio.getTime() + milisegundosPorDia);
    }

    return contador;
}

actualizarCuentaRegresiva();
setInterval(actualizarCuentaRegresiva, 1000);
