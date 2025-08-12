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

    const containerMap = {
        nba: '#nba-container',
        college: '#college-container',
        nil: '#nil-container'
    };

    const container = document.querySelector(containerMap[section]);
    container.innerHTML = ''; // Clear any old table

    let tableId = `${section}Table`;
    let tableHTML = '';

    if (section === 'nba') {
        tableHTML = `
            <table id="${tableId}" class="display">
                <thead>
                    <tr>
                        <th>Name</th><th>Team</th><th>Age</th><th>Years</th>
                        <th>WAR</th><th>PER</th><th>VORP</th>
                        <th>Salary</th><th>Remaining</th>
                    </tr>
                </thead>
                <tbody>
                    ${jsonData.nba.map(player => `
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
                    `).join('')}
                </tbody>
            </table>
        `;
    } 
    else if (section === 'college') {
        tableHTML = `
            <table id="${tableId}" class="display">
                <thead>
                    <tr>
                        <th>Name</th><th>School</th><th>Age</th><th>Years</th>
                        <th>WAR</th><th>PER</th><th>VORP</th>
                        <th>NIL</th>
                    </tr>
                </thead>
                <tbody>
                    ${jsonData.college.map(player => `
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
                    `).join('')}
                </tbody>
            </table>
        `;
    } 
    else if (section === 'nil') {
        tableHTML = `
            <table id="${tableId}" class="display">
                <thead>
                    <tr>
                        <th>Name</th><th>Sport</th><th>School</th>
                        <th>Age</th><th>Years</th><th>NIL</th><th>Sponsor</th>
                    </tr>
                </thead>
                <tbody>
                    ${jsonData.nil.map(player => `
                        <tr>
                            <td>${player.name}</td>
                            <td>${player.sport}</td>
                            <td>${player.school}</td>
                            <td>${player.age}</td>
                            <td>${player.years}</td>
                            <td>$${player.nil.toLocaleString()}</td>
                            <td>${player.sponsor}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // Inject table HTML
    container.innerHTML = tableHTML;

    // Init DataTables for the newly created table
    $(`#${tableId}`).DataTable({
        paging: true,
        searching: true,
        responsive: true,
        order: []
    });

    // Update active section visuals
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.querySelector(`#section-${section}`).classList.add('active');

    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
    document.querySelector(`#nav-${section}`).classList.add('active');
}

// Navigation
document.getElementById('nav-nba').addEventListener('click', e => { e.preventDefault(); renderTable('nba'); });
document.getElementById('nav-college').addEventListener('click', e => { e.preventDefault(); renderTable('college'); });
document.getElementById('nav-nil').addEventListener('click', e => { e.preventDefault(); renderTable('nil'); });
