<?php
session_start(); // Iniciar la sesión

require_once 'conexion.php';

// Verificar si el usuario está logueado
if (!isset($_SESSION['usuario'])) {
    echo json_encode(['error' => 'No hay sesión activa']);
    exit;
}

$usuario = $_SESSION['usuario']; // Obtener el DNI del alumno desde la sesión

try {
    // Consultar las materias asociadas al DNI_alumno (usuario)
    $sql = "
        SELECT materia.nombre_materia 
        FROM materia
        INNER JOIN materia_alumno ON materia.id_materia = materia_alumno.id_materia
        WHERE materia_alumno.estado = 'Recursar' AND materia_alumno.DNI_alumno = :usuario
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':usuario', $usuario, PDO::PARAM_INT); // Vincular el DNI del alumno
    $stmt->execute();

    $materias = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retornar las materias como un JSON
    echo json_encode($materias);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al obtener las materias: ' . $e->getMessage()]);
}
?>
