$(document).ready(function() {
    $('#calculate').click(function() {
        // Obtener valores y convertirlos a números
        const input1 = parseFloat($('#input1').val());
        const input2 = parseFloat($('#input2').val());

        $('#error').text('');
        $('#result').text('');

        // Validar que los inputs no estén vacíos o NaN
        if (isNaN(input1) || isNaN(input2)) {
            $('#error').text('Please enter valid numeric values.');
            return;
        }

        // Calcular y mostrar la suma
        const sum = input1 + input2;
        $('#result').text(`The sum is: ${sum}`);
    });
});
