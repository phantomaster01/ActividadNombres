const nombres = [
    "Juan", "María", "Carlos", "Ana", "Luis", "Sofía", "José", 
    "Lucía", "Miguel", "Elena", "Pedro", "Carmen", "Andrés", 
    "Laura", "Javier", "Isabel", "Diego", "Paula", "Manuel", "Marta"
];

function generarNombre() {
    const indiceAleatorio = Math.floor(Math.random() * nombres.length);
    const nombreAleatorio = nombres[indiceAleatorio];
    document.getElementById("nombre").textContent = nombreAleatorio;
}
