let jsonData = {};
let currentSection = 'nba';
let dataTable; // Reference to DataTables instance

// Fetch JSON data and initialize
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        renderTable(currentSection);
    })
    .catch(err => console.error('Error loading JSON:', err));

function renderTable(section) {
    currentSection = section;
    const tableBody = document.querySelector('#statsTable tbody');

    // Destroy DataTable if already initialized
    if (dataTable) {
        dataTable.destroy();
    }

    // Build table rows based on section
    let rowsHTML = '';

    if (section === 'nba') {
        rowsHTML = jsonData.nba.map(player => `
            <tr>
                <td>${player.name}</td>
                <td>${player.team}</td>
                <td>${player.age}</td>
                <td>${player.years}</td>
                <td>${player.war}</td>
                <td>${player.per}</td>
                <td>${player.vorp}</td>
                <td>$${player.salary.toLocaleString()}</td>
                <td>$${player.remaining.toLocaleString()}</td>
            </tr>
        `).join('');
    } else if (section === 'college') {
        rowsHTML = jsonData.college.map(player => `
            <tr>
                <td>${player.name}</td>
                <td>${player.school}</td>
                <td>${player.age}</td>
                <td>${player.years}</td>
                <td>${player.war}</td>
                <td>${player.per}</td>
                <td>${player.vorp}</td>
                <td>$${player.nil.toLocaleString()}</td>
            </tr>
        `).join('');
    } else if (section === 'nil') {
        rowsHTML = jsonData.nil.map(player => `
            <tr>
                <td>${player.name}</td>
                <td>${player.sport}</td>
                <td>${player.school}</td>
                <td>${player.age}</td>
                <td>${player.years}</td>
                <td>$${player.nil.toLocaleString()}</td>
                <td>${player.sponsor}</td>
            </tr>
        `).join('');
    }

    // Replace table body
    tableBody.innerHTML = rowsHTML;

    // Reinitialize DataTables
    dataTable = new DataTable('#statsTable', {
        responsive: true,
        pageLength: 10,
        order: [], // No default sort
    });
}

// Navigation button listeners
document.getElementById('nav-nba').addEventListener('click', () => renderTable('nba'));
document.getElementById('nav-college').addEventListener('click', () => renderTable('college'));
document.getElementById('nav-nil').addEventListener('click', () => renderTable('nil'));