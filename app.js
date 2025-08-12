let jsonData = {};
let currentSection = 'nba';

// Load JSON and initialize
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        renderTable('nba');
    })
    .catch(err => console.error('Error loading JSON:', err));

function renderTable(section) {
    currentSection = section;

    // Section → Table ID
    const tableMap = {
        nba: '#nbaTable',
        college: '#collegeTable',
        nil: '#nilTable'
    };

    const tableSelector = tableMap[section];
    const table = document.querySelector(tableSelector);

    // Destroy previous DataTable instance if exists
    if ($.fn.DataTable.isDataTable(tableSelector)) {
        $(tableSelector).DataTable().destroy();
    }

    let theadHTML = '';
    let tbodyHTML = '';

    if (section === 'nba') {
        theadHTML = `
            <tr>
                <th>Name</th>
                <th>Team</th>
                <th>Age</th>
                <th>Years</th>
                <th>WAR</th>
                <th>PER</th>
                <th>VORP</th>
                <th>Salary</th>
                <th>Remaining</th>
            </tr>
        `;
        tbodyHTML = jsonData.nba.map(player => `
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
    } 
    else if (section === 'college') {
        theadHTML = `
            <tr>
                <th>Name</th>
                <th>School</th>
                <th>Age</th>
                <th>Years</th>
                <th>WAR</th>
                <th>PER</th>
                <th>VORP</th>
                <th>NIL Value</th>
            </tr>
        `;
        tbodyHTML = jsonData.college.map(player => `
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
    } 
    else if (section === 'nil') {
        theadHTML = `
            <tr>
                <th>Name</th>
                <th>Sport</th>
                <th>School</th>
                <th>Age</th>
                <th>Years</th>
                <th>NIL Value</th>
                <th>Sponsor</th>
            </tr>
        `;
        tbodyHTML = jsonData.nil.map(player => `
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

    // Update table head & body
    table.querySelector('thead').innerHTML = theadHTML;
    table.querySelector('tbody').innerHTML = tbodyHTML;

    // Init DataTables
    $(tableSelector).DataTable({
        paging: true,
        searching: true,
        responsive: true,
        order: []
    });

    // Toggle active section visually
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.querySelector(`#section-${section}`).classList.add('active');

    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
    document.querySelector(`#nav-${section}`).classList.add('active');
}

// Navigation events
document.getElementById('nav-nba').addEventListener('click', e => { e.preventDefault(); renderTable('nba'); });
document.getElementById('nav-college').addEventListener('click', e => { e.preventDefault(); renderTable('college'); });
document.getElementById('nav-nil').addEventListener('click', e => { e.preventDefault(); renderTable('nil'); });
