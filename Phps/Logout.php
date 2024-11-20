<?php
session_start();

// Verificar si hay una sesión activa y, en caso afirmativo, destruirla
if (isset($_SESSION['usuario'])) {
    // Destruir todas las variables de sesión
    session_unset();
    
    // Destruir la sesión
    session_destroy();
    
    // Respuesta en JSON confirmando el cierre de sesión
    echo json_encode(['exito' => 'Sesión cerrada exitosamente']);
} else {

    echo json_encode(['error' => 'No hay sesión activa']);
}
?>