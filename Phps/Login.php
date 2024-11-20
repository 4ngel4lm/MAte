<?php
session_start(); // Iniciar la sesión para gestionar el inicio de sesión

include 'conexion.php';

header('Content-Type: application/json');

$usuario = $_POST['usuario'] ?? '';
$contrasena = $_POST['contrasena'] ?? '';

if (empty($usuario) || empty($contrasena)) {
    echo json_encode(['error' => 'Campos incompletos']);
    exit;
}

try {
    // Preparar la consulta para verificar si el usuario existe
    $stmt = $pdo->prepare("SELECT * FROM usuario WHERE DNI_usuario = :usuario");
    $stmt->bindParam(':usuario', $usuario);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Comparar la contraseña directamente sin usar password_verify
        if ($user['clave'] === $contrasena) {
            // Regenerar ID de sesión para evitar fijación de sesión
            session_regenerate_id(true); 

            $_SESSION['usuario'] = $user['DNI_usuario']; // Guardar el DNI del usuario en la sesión
            echo json_encode(['exito' => 'Usuario autenticado', 'id' => $user['DNI_usuario']]);
        } else {
            echo json_encode(['error' => 'Usuario o contraseña incorrectos']);
        }
    } else {
        echo json_encode(['error' => 'Usuario no encontrado']);
    }

} catch (Exception $e) {
    // Solo en desarrollo, agregar más información del error
    echo json_encode(['error' => 'Error en el servidor: ' . $e->getMessage()]);
}
