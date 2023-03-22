const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
	<title>Reporte de citas</title>
	<!-- Importar Bootstrap CSS -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<style>
		/* Estilos adicionales aquí */
	</style>
</head>
<body>
	<div class="container">
		<h1>Reporte de citas</h1>
		<table class="table">
			<thead>
				<tr>
					<th>ID de cita</th>
					<th>ID de horario</th>
					<th>Tomado por</th>
					<th>Asistido</th>
					<th>Rechazado</th>
					<th>Rechazado por</th>
					<th>Rechazado correo</th>
					<th>Rechazado razón</th>
					<th>Teléfono</th>
					<th>Fecha de registro</th>
				</tr>
			</thead>
			<tbody>
				<!-- Iterar sobre las citas devueltas por la consulta y mostrarlas aquí -->
			</tbody>
		</table>
	</div>
	<!-- Importar Bootstrap JS -->
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNSbNIV" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
	<script>
		// Lógica adicional aquí
	</script>
</body>
</html>
`;

module.exports = {
  htmlTemplate,
};
