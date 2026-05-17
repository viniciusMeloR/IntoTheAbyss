const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Lyza - a Aniquiladora', 'Bondrewd - O Novato', 'Ozen - A imóvel', 'XXX', 'XXX', 'Riko'],
    datasets: [{
      label: 'Nivel de força dos apitos brancos',
      data: [6, 4, 5, 3, 2, 1],
      borderWidth: 1,
      backgroundColor: ['black', 'yellow', 'orange', 'blue', 'green', 'red'],
      borderWidth: 1

    },
    ]

  },
  options: {
    plugins: {
       title: {
                display: true,
                text: 'Nivel de força dos apitos brancos', // Texto do título
                font: {
                    size: 30 // Tamanho da fonte
                }
              },
      legend: {
        labels: {
          font: {
            size: 15,
            weight: 'bold'
          }
        }
      }
    }
  }
  

});





